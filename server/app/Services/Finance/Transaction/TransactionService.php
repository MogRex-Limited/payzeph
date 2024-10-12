<?php

namespace App\Services\Finance\Transaction;

use App\Constants\Finance\TransactionConstants;
use App\Constants\General\StatusConstants;
use App\Exceptions\General\ModelNotFoundException;
use App\Models\Transaction;
use App\Models\User;
use App\Notifications\Finance\NewTransactionNotification;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class TransactionService
{
    public $send_notification = true;

    public static function getById($key, $column = "id"): Transaction
    {
        $transaction = Transaction::where($column, $key)->first();
        if (empty($transaction)) {
            throw new ModelNotFoundException("Transaction not found");
        }
        return $transaction;
    }

    function notify(bool $value)
    {
        $this->send_notification = $value;
        return $this;
    }

    public static function generateReference()
    {
        $code = 'TRX-' . date("YmdHis") . generateRandomDigits(5);
        $check = Transaction::where('reference', $code)->withTrashed()->count();
        if ($check > 0) {
            return self::generateReference();
        }

        return $code;
    }

    public function create(array $data): Transaction
    {
        return DB::transaction(function () use ($data) {
            $validator = Validator::make($data, [
                'user_id' => 'required|numeric',
                "wallet_id" => "bail|required|exists:wallets,id",
                "currency_id" => "bail|required|exists:currencies,id",
                "reference" => "bail|nullable|string|unique:transactions,reference",
                "amount" => "bail|required|numeric|gt:0",
                "fee" => "bail|required|numeric|gt:-1",
                "profit" => "bail|nullable|numeric|gt:-1",
                'type' => 'required|string|' . Rule::in(array_keys(TransactionConstants::TYPE_OPTIONS)),
                "description" => "bail|nullable|string",
                "activity" => "bail|nullable|string",
                "category" => "bail|nullable|string",
                "action" => "bail|nullable|string",
                "batch_no" => "bail|nullable|string",
                "sender_name" => "bail|nullable|string",
                "status" => "bail|nullable|string|" . Rule::in([
                    StatusConstants::COMPLETED,
                    StatusConstants::PENDING,
                    StatusConstants::PROCESSING,
                    StatusConstants::REFUNDED,
                    StatusConstants::FAILED,
                    StatusConstants::ROLLBACK,
                    StatusConstants::DECLINED
                ]),
                "prev_balance" => "bail|nullable|numeric|gt:-1",
                "current_balance" => "bail|nullable|numeric|gt:-1",
                "metadata" => "bail|nullable|string",
                "recipient_transaction_id" => "bail|nullable|exists:transactions,id",
                "sender_transaction_id" => "bail|nullable|exists:transactions,id",
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            $data = $validator->validated();

            $data["reference"] ??= self::generateReference();
            $data["status"] ??= StatusConstants::COMPLETED;

            if ($data["status"] == StatusConstants::COMPLETED) {
                $data["completed_at"] = now();
            }

            $transaction = Transaction::create($data);

            if ($this->send_notification) {
                Notification::send($transaction->user, new NewTransactionNotification($transaction));
            }

            return $transaction;
        });
    }

    public function markAsComplete(Transaction $transaction): Transaction
    {
        $transaction->update([
            "status" => StatusConstants::COMPLETED,
            "completed_at" => now(),
        ]);

        if ($this->send_notification) {
            Notification::send($transaction->user, new NewTransactionNotification($transaction));
        }

        return $transaction->refresh();
    }

    function list(User $user, array $query)
    {
        $builder = Transaction::where([
            "user_id" => $user->id,
        ]);

        if (!empty($key = $query[""] ?? null)) {
        }

        return $builder;
    }

    public static function getByReference($reference): Transaction
    {
        $transaction = Transaction::where("reference", $reference)->first();

        if (empty($transaction)) {
            throw new ModelNotFoundException(
                "Transaction not found",
            );
        }
        return $transaction;
    }

    public static function generateBatchNo($length = 10)
    {
        $key = "BN_" . generateRandomDigits($length);
        $check = Transaction::where("batch_no", $key)->count();
        if ($check > 0) {
            return self::generateBatchNo();
        }
        return $key;
    }

    public static function oldWalletBalance($wallet)
    {
        return [
            "balance" => $wallet->balance,
            "credit" => $wallet->credit,
            "debit" => $wallet->credit,
            "locked_balance" => $wallet->locked_balance,
        ];
    }

    public static function newWalletBalance($wallet)
    {
        return [
            "balance" => $wallet->balance,
            "credit" => $wallet->credit,
            "debit" => $wallet->credit,
            "locked_balance" => $wallet->locked_balance,
        ];
    }
}
