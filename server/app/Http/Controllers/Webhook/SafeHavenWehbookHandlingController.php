<?php

namespace App\Http\Controllers\Webhook;

use App\Constants\Finance\PaymentConstants;
use App\Constants\General\ApiConstants;
use App\Helpers\ApiHelper;
use App\Http\Controllers\Controller;
use App\Services\Finance\Account\Bank\BankAccountService;
use App\Services\Finance\Payment\DynamicPayment\DynamicAccountPaymentService;
use App\Services\General\Webhook\WebhookService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class SafeHavenWehbookHandlingController extends Controller
{
    public $webhook_service;

    public function __construct()
    {
        $this->webhook_service = new WebhookService;
    }

    public function handleWebhook(Request $request)
    {
        // Log the start of the function
        Log::info("Safe Haven webhook request received", $request->all());

        // Check for JSON decoding errors
        if (json_last_error() !== JSON_ERROR_NONE) {
            Log::error("Invalid JSON: " . json_last_error_msg());
            return response()->json([
                'status' => 400,
                'success' => false,
                'message' => 'Invalid JSON',
                'data' => []
            ], 400);
        }

        // Handle the charge webhook
        return $this->saveWebhook($request);
    }

    public function saveWebhook(Request $request)
    {
        try {
            $user = $this->getUser($request);
            $payload = $request->all();
            $webhook = $this->webhook_service->create([
                "source" => PaymentConstants::GATEWAY_SAFE_HAVEN,
                "event" => $payload["type"] ?? null,
                "headers" => $request->header(),
                "content" => $payload,
                "url" => env("APP_URL") . "/safe-haven/webhook/verifications",
                "delay" => "10",
                "user_id" => $user["user"]?->id,
                "sender_name" => $user["name"] ?? null
            ]);

            $this->webhook_service->dispatch($webhook);
            return ApiHelper::validResponse("Hook Received");
        } catch (ValidationException $e) {
            return ApiHelper::problemResponse($e->getMessage(), ApiConstants::BAD_REQ_ERR_CODE);
        } catch (Exception $th) {
            return ApiHelper::problemResponse("Something went wrong while trying to process your request", ApiConstants::SERVER_ERR_CODE);
        }
    }

    public function getUser(Request $request)
    {
        $payload = $request->all();
        $type = $payload["type"] ?? null;

        if (in_array($type, ["virtualAccount.transfer"])) {
            $dynamic_account = DynamicAccountPaymentService::getById($payload["data"]["creditAccountNumber"], "account_number");
            return [
                "user" => $dynamic_account?->user,
                "name" => $dynamic_account?->user?->full_name
            ];
        }
    }
}
