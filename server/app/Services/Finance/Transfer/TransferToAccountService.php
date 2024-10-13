<?php

namespace App\Services\Finance\Transfer;

use App\Constants\Finance\TransactionActivityConstants;
use App\Constants\Finance\TransactionConstants;
use App\Constants\General\StatusConstants;
use App\Models\Wallet;
use App\Services\Finance\Transaction\TransactionService;
use App\Services\Finance\Wallet\WalletService;

class TransferToAccountService
{
    public $amount, $narration;

    public function setAmount($amount)
    {
        $this->amount = $amount;
        return $this;
    }

    public function setNarration($narration)
    {
        $this->narration = $narration;
        return $this;
    }

    public function process(Wallet $sender_wallet, Wallet $receiver_wallet)
    {

        $amount = $this->amount;
        $narration = $this->narration ?? null;

        $fees = 0;
        $debit_amount = $amount + $fees;

        $batch_no = TransactionService::generateBatchNo(10);

        (new WalletService)
            ->setWallet($sender_wallet)
            ->setUser($sender_wallet->user)
            ->setCurrency($sender_wallet->currency_id)
            ->withTransaction([
                "description" =>  "Transfer to {$receiver_wallet->user->full_name}",
                "status" => StatusConstants::COMPLETED,
                "action" => TransactionConstants::MONEY_SENT,
                "activity" => TransactionActivityConstants::FUNDS_RECEIVED_VIRTUAL_ACCOUNT,
                "category" => TransactionConstants::INTERNAL_TRANSFER_USER_TO_USER,
                "narration" => $narration,
                "batch_no" => $batch_no,
            ])
            ->debit($debit_amount);

        (new WalletService)
            ->setWallet($receiver_wallet)
            ->setUser($receiver_wallet->user)
            ->setCurrency($receiver_wallet->currency_id)
            ->withTransaction([
                "fees" => $fees,
                "description" => "Transfer from {$sender_wallet->user->full_name}",
                "status" => StatusConstants::COMPLETED,
                "action" => TransactionConstants::MONEY_SENT,
                "activity" => TransactionActivityConstants::FUNDS_RECEIVED_VIRTUAL_ACCOUNT,
                "category" => TransactionConstants::INTERNAL_TRANSFER_USER_TO_USER,
                "narration" => $narration,
                "batch_no" => $batch_no,
            ])
            ->credit($debit_amount);

        $feedback = [
            "fees" => $fees,
            "amount" => $amount,
            "batch_no" => $batch_no,
            "users" => [
                "sender" => $sender_wallet->user,
                "receiver" => $receiver_wallet->user,
            ],
            "names" => [
                "sender" => $sender_wallet->user->full_name,
                "receiver" => $receiver_wallet->user->full_name,
            ],
            "wallets" => [
                "sender" => $sender_wallet,
                "receiver" => $receiver_wallet,
            ]
        ];

        return $feedback;
    }
}
