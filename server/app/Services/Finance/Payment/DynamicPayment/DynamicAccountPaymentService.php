<?php

namespace App\Services\Finance\Payment\DynamicPayment;

use App\Constants\Account\User\UserConstants;
use App\Constants\Finance\PaymentConstants;
use App\Exceptions\General\InvalidRequestException;
use App\Exceptions\General\ModelNotFoundException;
use App\Helpers\MethodsHelper;
use App\Models\DynamicAccount;
use App\Models\Wallet;
use App\Services\Finance\Account\SafeHaven\CreateSafeHavenDynamicVirtualAccountService;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class DynamicAccountPaymentService
{
    public $type;
    public $parish;
    public $group;
    public $channel;
    public $wallet;
    public $web_payer_wallet;
    public $user;
    public $web_payer;
    public $amount;
    public $currency;
    public $duration;
    public $duration_value;
    public $provider;
    public $account_type;
    public $account_name;
    public $use_prefix;

    public function setUser($user)
    {
        $this->user = $user;
        return $this;
    }

    public function setWebPayer($web_payer)
    {
        $this->web_payer = $web_payer;
        return $this;
    }

    public function setType(string $type)
    {
        $this->type = $type;
        return $this;
    }

    public function setAccountName($account_name)
    {
        $this->account_name = $account_name;
        return $this;
    }

    public function setDuration($duration)
    {
        $this->duration = $duration;
        return $this;
    }

    public function setDurationValue($duration_value)
    {
        $this->duration_value = $duration_value;
        return $this;
    }

    public function setAmount(float $value)
    {
        $this->amount = $value;
        return $this;
    }

    public function setWallet(Wallet $value)
    {
        $this->wallet = $value;
        return $this;
    }

    public function setProvider(string $value)
    {
        $this->provider = $value;
        return $this;
    }

    public function setAccountType(string $value)
    {
        $this->account_type = $value;
        return $this;
    }

    public function setUsePrefix($value)
    {
        $this->use_prefix = $value;
        return $this;
    }

    public function byProvider()
    {
        if (!in_array($this->provider, [PaymentConstants::GATEWAY_SAFE_HAVEN])) {
            throw new InvalidRequestException("The selected provider is inactive");
        }

        if ($this->provider == PaymentConstants::GATEWAY_SAFE_HAVEN) {
            $account = self::withSafeHaven();
        }

        return $account;
    }

    public function withSafeHaven()
    {
        $account = $this->checkIfExpired($this->provider);

        if (!empty($account)) {
            return $account;
        }

        $service = new CreateSafeHavenDynamicVirtualAccountService;

        if (isset($this->user)) {
            $service->setUser($this->user);
        }

        $service->setAmount(50)
            ->setUsePrefix($this->use_prefix)
            ->setReference(self::generateReferenceNo(10))
            ->setAccountName($this->account_name ?? $this->generateAccountName($this->user))
            ->setDuration($this->duration ?? 43200); //12 hrs

        $initialization =  $service->generate();

        $account = $this->save([
            "user_id" => $this->user?->id ?? null,
            "wallet_id" => $this->wallet?->id ?? null,
            "account_id" => $initialization["data"]["account_id"],
            "account_number" => $initialization["data"]["account_number"],
            "account_name" => $initialization["data"]["account_name"],
            "amount" => $initialization["data"]["amount"],
            "provider" => $this->provider,
            "type" => $this->account_type ?? UserConstants::USER,
            "currency" => $initialization["data"]["currency"],
            "reference" => $initialization["data"]["reference"],
            "expires_at" => $initialization["data"]["expires_at"],
        ]);

        return $account;
    }

    public function generateAccountName($user)
    {
        $names = $user->first_name;
        // $names = $user->first_name . " " . $user->last_name;
        return $names;
    }

    public function validate(array $data)
    {
        $validator = Validator::make($data, [
            "user_id" => "nullable|exists:users,id",
            "wallet_id" => "nullable|exists:wallets,id",
            "account_id" => "required|string",
            "account_number" => "required|numeric",
            "account_name" => "required|string",
            "amount" => "nullable|numeric",
            "provider" => "required|string",
            "type" => "nullable|string",
            "currency" => "nullable|string",
            "expires_at" => "required|string",
            "reference" => "required|unique:dynamic_accounts,reference"
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }

    public function save(array $data): DynamicAccount
    {
        $data = $this->validate($data);
        $account = DynamicAccount::create($data);
        return $account;
    }

    public function checkIfExpired($provider)
    {
        if ($this->type == UserConstants::USER) {
            $query = DynamicAccount::where("user_id", $this->user->id);
            if (isset($this->wallet?->id)) {
                $query = $query->where("wallet_id", $this->wallet->id);
            }
            $check = $query->status()->current()->provider($provider)->first();
        }
        return $check ?? null;
    }

    public static function generateReferenceNo($length = 8)
    {
        $key = "DRF_" . MethodsHelper::getRandomToken($length, true);
        $check = DynamicAccount::where("reference", $key)->count();
        if ($check > 0) {
            return self::generateReferenceNo();
        }
        return $key;
    }

    public static function getById($key, $column = "id"): DynamicAccount
    {
        $bankAccount = DynamicAccount::where($column, $key)->first();

        if (empty($bankAccount)) {
            throw new ModelNotFoundException(
                "Dynamic Account not found",
            );
        }
        return $bankAccount;
    }
}
