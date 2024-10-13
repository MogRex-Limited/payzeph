<?php

namespace App\Services\Finance\Transfer;

use App\Constants\General\StatusConstants;
use App\Exceptions\General\InvalidRequestException;
use App\Models\Wallet;
use App\Services\Finance\Wallet\WalletService;
use App\Services\User\UserService;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class BaseTransferService
{
    public $user_service;
    public $sender_wallet;
    public $receiver_wallet;
    public $wallet_service;

    public function __construct()
    {
        $this->user_service = new UserService;
        $this->wallet_service = new WalletService;
    }

    public function validate(array $data, $id = null)
    {
        $validator = Validator::make($data, [
            "sender_id" => "required|exists:wallets,id",
            "receiver_id" => "required|exists:users,zeph_id|" . Rule::notIn([$data["sender_id"] ?? null]),
            "currency_id" => "required|exists:currencies,id",
            "amount" => "required|numeric|min:5",
            "pin" => [
                'nullable',
                "string",
            ],
            "narration" => "nullable|string",
        ], [
            'receiver_id.not_in' => 'The receiver Id must not be same with the sender Id'
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }

    public function checkAuthorization(array $data)
    {
        $this->sender_wallet = $sender_wallet = $this->wallet_service->getById($data["sender_id"]);

        // if ($sender_wallet->user_id != auth()->id()) {
        //     throw new InvalidRequestException("Unauthorized. Login to continue");
        // }

        // $secret = decrypt($this->sender_wallet->user->google2fa_secret);

        // $valid = app('pragmarx.google2fa')->verifyKey($secret, $data["pin"]);

        // if (!$valid) {
        //     throw new InvalidRequestException("Invalid Google Authenticator code");
        // }

        if ($sender_wallet->status != StatusConstants::ACTIVE) {
            throw new InvalidRequestException("Cannot make transaction from this wallet");
        }

        $this->receiver_wallet = $receiver_wallet = Wallet::where([
            "currency_id" => $data["currency_id"],
            "status" => StatusConstants::ACTIVE
        ])->whereRelation("user", "zeph_id", $data["receiver_id"])
        ->first();

        if (empty($receiver_wallet)) {
            throw new InvalidRequestException("The recipient has not enabled this wallet");
        }
 
        if ($receiver_wallet->user_id == $sender_wallet->user_id) {
            throw new InvalidRequestException("Invalid transaction request");
        }
    }
}
