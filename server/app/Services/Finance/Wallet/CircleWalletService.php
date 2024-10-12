<?php

namespace App\Services\Finance\Wallet;

use App\Constants\General\ApiConstants;
use App\Constants\General\StatusConstants;
use App\Exceptions\General\ProviderException;
use App\Models\User;
use App\Models\WalletSet;
use App\Services\General\Guzzle\GuzzleService;
use App\Services\Provider\Circle\CircleService;
use App\Services\System\ExceptionService;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Uuid;

class CircleWalletService
{
    public $user;
    public $client;
    public array $blockchains;
    public $circle_service;
    public $wallet_set_service;

    public function __construct()
    {
        $this->user = auth()->user();
        $this->circle_service = new CircleService;
        $this->client = new GuzzleService($this->circle_service->headers);
        $this->wallet_set_service = new WalletSetService;
    }


    function setUser(User $user)
    {
        $this->user = $user;
        return $this;
    }


    function setBlockchains(array $blockchains)
    {
        $this->blockchains = $blockchains;
        return $this;
    }

    public function fetchWallelSet()
    {
        try {
            $wallet_set = WalletSet::where([
                "user_id" => $this->user->id,
                "status" => StatusConstants::ACTIVE
            ])->first();

            if (empty($wallet_set)) {
                $wallet_set = $this->createWalletSet();
            }

            return $wallet_set->refresh();
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function createCircleSet($indempotency_key = null, $name = null)
    {
        try {
            $full_url = $this->circle_service->base_url . "/developer/walletSets";
            $entity_cipher = $this->circle_service->createEntitySecretCipher();

            $indempotency_key ??= Uuid::uuid4();
            $name ??= "WalletSet " . generateRandomDigits(4);

            $response = $this->client->post($full_url, [
                "idempotencyKey" => $indempotency_key,
                "name" => $name,
                "entitySecretCiphertext" =>  $entity_cipher
            ]);

            if (!in_array(($response["status"] ?? null), [ApiConstants::GOOD_REQ_CODE])) {
                throw new ProviderException(json_encode($response["data"]["message"] ?? $response["message"]), $response["status"]);
            }

            if (empty($response["data"]["data"]["walletSet"] ?? null)) {
                throw new ProviderException(json_encode($response["data"]["message"] ?? $response["message"]), $response["status"]);
            }

            return $response["data"]["data"];
        } catch (ProviderException $e) {
            ExceptionService::broadcastOnAllChannels($e);
            throw $e;
        }
    }

    public function createWalletSet()
    {
        DB::beginTransaction();
        try {
            $indempotency_key = Uuid::uuid4();
            $name = "WalletSet " . generateRandomDigits(4);
            $data = $this->createCircleSet($indempotency_key);

            $wallet_set = $this->wallet_set_service->create([
                "user_id" => $this->user->id ?? auth()->id(),
                "ext_wallet_set_id" => $data["walletSet"]["id"],
                "custody_type" => $data["walletSet"]["custodyType"],
                "idempotency_key" => $indempotency_key,
                "name" => $name,
                "provider" => "Circle"
            ]);

            DB::commit();
            return $wallet_set;
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function createCircleWallet($wallet_set_id)
    {
        try {
            $full_url = $this->circle_service->base_url . "/developer/wallets";
            $entity_cipher = $this->circle_service->createEntitySecretCipher();

            $response = $this->client->post($full_url, [
                "blockchains" => 'SCA',
                "blockchains" => $this->blockchains,
                "count" => 2,
                "walletSetId" =>  $wallet_set_id,
                "entitySecretCiphertext" =>  $entity_cipher
            ]);

            if (!in_array(($response["status"] ?? null), [ApiConstants::GOOD_REQ_CODE])) {
                throw new ProviderException(json_encode($response["data"]["message"] ?? $response["message"]), $response["status"]);
            }

            if (empty($response["data"]["data"]["walletSet"] ?? null)) {
                throw new ProviderException(json_encode($response["data"]["message"] ?? $response["message"]), $response["status"]);
            }

            return $response["data"]["data"];
        } catch (ProviderException $e) {
            ExceptionService::broadcastOnAllChannels($e);
            throw $e;
        }
    }
}
