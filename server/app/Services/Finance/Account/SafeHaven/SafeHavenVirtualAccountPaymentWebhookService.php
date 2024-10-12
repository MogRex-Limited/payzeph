<?php

namespace App\Services\Finance\Account\SafeHaven;

use App\Constants\Finance\TransactionActivityConstants;
use App\Constants\Finance\TransactionConstants;
use App\Constants\General\StatusConstants;
use App\Exceptions\General\InvalidRequestException;
use App\Models\DynamicAccount;
use App\Models\Transaction;
use App\Services\Finance\Payment\DynamicPayment\DynamicAccountPaymentService;
use App\Services\Finance\Transaction\TransactionService;
use App\Services\Finance\Wallet\WalletService;
use App\Services\Notification\FirebaseNotificationService;

class SafeHavenVirtualAccountPaymentWebhookService
{
    public array $payload;
    public $event;
    public $user;
    public DynamicAccount $dynamic_account;
    public $model;

    public function setPayload(array $value)
    {
        $this->payload = $value;
        return $this;
    }

    public function handle()
    {
        $this->parsePayload();
        $this->actionHandler();
    }

    public function parsePayload()
    {
        $payload = $this->payload;
        if (empty($payload)) {
            throw new InvalidRequestException("Charge data not set!");
        }

        $this->dynamic_account = $this->setDynamicAccount($payload);
        $this->user = $this->setUser();
    }

    public function setDynamicAccount($payload)
    {
        $dynamic_account = DynamicAccountPaymentService::getById($payload["data"]["externalReference"], "reference");
        return $this->dynamic_account = $dynamic_account;
    }

    public function setUser()
    {
        return $this->user = $this->dynamic_account->user;
    }

    private function actionHandler()
    {
        $this->verifyTransactionStatus($this->payload);
        return $this->handleSuccess($this->payload);
    }

    private function verifyTransactionStatus($payload)
    {
        $transaction = Transaction::where("reference", $payload["data"]["sessionId"] ?? null)->first();

        if (!empty($transaction) && ($transaction->status == StatusConstants::COMPLETED)) {
            throw new InvalidRequestException("You cannot process a completed transaction");
        }
    }

    private function handleSuccess($payload)
    {
        $this->processUserTransaction($payload);
    }

    public function processUserTransaction($payload)
    {
        $wallet = $this->dynamic_account->wallet;

        $amount = floatval($payload["data"]["amount"]);
        $fees = 0 ?? $this->parseFee($amount);

        (new WalletService)
            ->setWallet($wallet)
            ->setUser($wallet->user)
            ->setCurrency($wallet->currency_id)
            ->withTransaction([
                "fees" => $fees,
                "description" => "Funds received from " . $payload["data"]["debitAccountName"],
                "reference" => $payload["data"]["sessionId"],
                "status" => StatusConstants::COMPLETED,
                "action" => TransactionConstants::BANK_DEPOSIT,
                "activity" => TransactionActivityConstants::FUNDS_RECEIVED_VIRTUAL_ACCOUNT,
                "category" => TransactionConstants::BANK_TRANSFER_DEPOSIT,
                "batch_no" => TransactionService::generateBatchNo(10),
                "metadata" => json_encode($payload["data"]),
                "sender_name" => $payload["data"]["debitAccountName"],
            ])
            ->credit($amount);

        (new FirebaseNotificationService)
            ->setTitle("Receipt of fund")
            ->setBody("You have just received a payment of " . format_money($amount) . " from " . $payload["data"]["debitAccountName"])
            ->setType("Funding")
            ->setMetadata([
                "type" => "Funding",
            ])
            ->byUserToken($this->user->fcm_token)
            ->initiate();


        if ($fees > 0) {
            $fee_wallet = !empty($wallet_id) ? WalletService::getById($wallet_id) : null;
            // (new SystemTransactionService($transaction->currency_id))
            //     ->setDescription("Dynamic Account Fees")
            //     ->setBatchNo($transaction->batch_no)
            //     ->setModelTypeAndId($fee_wallet->user)
            //     ->recorDynamicVirtualAccountFee($fees, $fee_wallet);
        }
    }

    public function parseFee($amount)
    {
        $final_fee = (globalSetting()->dynamic_account_fees / 100) * $amount;

        if (!empty(globalSetting()->dynamic_account_fees_cap) && (globalSetting()->dynamic_account_fees_cap < $final_fee)) {
            $final_fee = globalSetting()->dynamic_account_fees_cap;
        }

        return $final_fee;
    }
}
