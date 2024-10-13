<?php

namespace App\Services\Finance\Transfer;

use App\Services\Finance\Transfer\TransferToAccountService;
use Illuminate\Support\Facades\DB;

class FundTransferService extends BaseTransferService
{
    public function process(array $data, $id = null)
    {
        DB::beginTransaction();
        try {
            $data = $this->validate($data, $id);
            $this->checkAuthorization($data);

            $response = (new TransferToAccountService)
                ->setAmount($data["amount"])
                ->setNarration($data["narration"] ?? null)
                ->process(
                    $this->sender_wallet,
                    $this->receiver_wallet
                );

            //Todo: Handle fees;
            $data = [
                "batch_no" => $response["batch_no"],
                "fees" => $response["fees"],
                "amount" => $response["amount"],
                "sender" => [
                    "account_id" => $this->sender_wallet->user_id,
                    "name" => $response["names"]["sender"] ?? null
                ],
                "receiver" => [
                    "account_id" => $this->receiver_wallet->user_id,
                    "name" => $response["names"]["receiver"] ?? null
                ],
                "narration" => $data["narration"] ?? null,
            ];

            DB::commit();
            return $data;
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
