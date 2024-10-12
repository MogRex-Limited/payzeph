<?php

namespace App\Services\Finance\Wallet;

use App\Constants\Finance\PaymentConstants;
use App\Services\General\Webhook\WebhookService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class FundWalletService
{
    public $webhook_service;

    public function __construct()
    {
        $this->webhook_service = new WebhookService;
    }

    public static function validate(array $data): array
    {
        $validator = Validator::make($data, [
            "reference" => "required|string",
            "account_number" => "required|numeric",
            "amount" => "required|numeric",
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $data =  $validator->validated();
        return $data;
    }

    public function parsePayload(array $data)
    {
        $session = generateRandomDigits(20);
        $array = [
            "type" => "virtualAccount.transfer",
            "data" => [
                "_id" => "670abd1557b2df0024db6661",
                "client" => "66600b2df474ff0024bedcab",
                "virtualAccount" => "670ab84b57b2df0024d97774",
                "externalReference" => $data["reference"],
                "sessionId" => $session,
                "nameEnquiryReference" => "100033241012175702000935947795",
                "paymentReference" => $session,
                "isReversed" => false,
                "reversalReference" => null,
                "provider" => "NIBSS",
                "providerChannel" => "NIP",
                "providerChannelCode" => "3",
                "destinationInstitutionCode" => "090286",
                "creditAccountName" => "CPay Checkout",
                "creditAccountNumber" => $data["account_number"],
                "creditBankVerificationNumber" => null,
                "creditKYCLevel" => "3",
                "debitAccountName" => $data["user_name"] ?? auth()->user()->full_name,
                "debitAccountNumber" => "8077778839",
                "debitBankVerificationNumber" => null,
                "debitKYCLevel" => "2",
                "transactionLocation" => null,
                "narration" => "Transfer",
                "amount" => $data["amount"],
                "fees" => 50,
                "vat" => 0,
                "stampDuty" => 50,
                "responseCode" => "00",
                "responseMessage" => "Approved or completed successfully",
                "status" => "Completed",
                "isDeleted" => false,
                "createdAt" => "2024-10-12T18:16:53.614Z",
                "declinedAt" => "2024-10-12T18:16:53.614Z",
                "updatedAt" => "2024-10-12T18:18:16.907Z",
                "__v" => 0,
            ]
        ];

        return $array;
    }

    public function fund(array $data)
    {
        DB::beginTransaction();
        try {
            $user = auth()->user();
            $data = self::validate($data);
            $payload = $this->parsePayload($data);

            $webhook = $this->webhook_service->create([
                "source" => PaymentConstants::GATEWAY_SAFE_HAVEN,
                "event" => $payload["type"] ?? null,
                "headers" => [
                    "Accept" => "applicaton/json"
                ],
                "content" => $payload,
                "url" => env("APP_URL") . "/safe-haven/webhook/verifications",
                "delay" => "10",
                "user_id" => $user?->id,
                "sender_name" => $user->full_name ?? null
            ]);

            $this->webhook_service->dispatch($webhook);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
