<?php

namespace App\Services\Finance\Account\SafeHaven;

use App\Constants\General\ApiConstants;
use App\Exceptions\Finance\Payment\SafeHavenException;
use App\Services\Finance\Provider\SafeHaven\SafeHavenService;
use App\Services\General\Guzzle\GuzzleService;
use App\Services\System\ExceptionService;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class CreateSafeHavenDynamicVirtualAccountService
{
    public $duration;
    public $account_name;
    public $payment_control;
    public $amount;
    public $user;
    protected $model;
    public $body_data;
    public $headers;
    public $reference;
    public $use_prefix;
    public $safe_haven_service;

    public function __construct()
    {
        $this->safe_haven_service = new SafeHavenService;
        $this->headers = $this->safe_haven_service->headers;
    }
    public function setUser($user)
    {
        $this->user = $user;
        return $this;
    }

    public function setClient()
    {
        $service = new GuzzleService($this->headers);
        return $service;
    }

    public function setCoperate($model)
    {
        $this->model = $model;
        return $this;
    }

    public function setAccountName($account_name)
    {
        $this->account_name = $account_name;
        return $this;
    }

    public function setAmount($amount)
    {
        $this->amount = $amount;
        return $this;
    }

    public function setDuration($duration)
    {
        $this->duration = $duration;
        return $this;
    }

    public function setPaymentControl($payment_control)
    {
        $this->payment_control = $payment_control;
        return $this;
    }

    public function setUsePrefix($value)
    {
        $this->use_prefix = $value ?? false;
        return $this;
    }

    public function setPaymentAmount($amount)
    {
        $this->amount = $amount;
        return $this;
    }

    public function setReference($reference)
    {
        $this->reference = $reference;
        return $this;
    }

    public function validate(array $data)
    {
        $validator = Validator::make($data, [
            "accountName" => "required|string",
            "validFor" => "required|numeric",
            "callbackUrl" => "required|string",
            "amountControl" => "required|string",
            "amount" => "required|numeric",
            "externalReference" => "required|string",
            "settlementAccount" => "required|array",
            "otherPrefix" => "nullable|string",
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $data = $validator->validated();

        if (config("app.env") == "local") {
            unset($data["otherPrefix"]);
        }

        $this->body_data = $data;
        return $this;
    }

    public function generate()
    {
        try {
            $this->validate([
                "externalReference" => $this->reference ?? $this->user?->puid,
                "validFor" => (int) $this->duration,
                "callbackUrl" => env("APP_URL") . "/safe-haven/webhook/verifications",
                "amountControl" => $this->payment_control ?? "OverPayment",
                "amount" => $this->amount,
                "accountName" => $this->account_name,
                "otherPrefix" => $this->use_prefix ? $this->account_name : null,
                "settlementAccount" => [
                    "bankCode" => env("SAFE_HAVEN_BANK_CODE"),
                    "accountNumber" => env("SAFE_HAVEN_DEBIT_ACCOUNT"),
                ]
            ]);

            $full_url = env("SAFE_HAVEN_BASE_URL") . "/virtual-accounts";

            $response = $this->setClient()->post($full_url, $this->body_data);

            logger("Safe Haven Dynamic VA", [
                "url" => $full_url,
                "payload" => $this->body_data,
                "response" => $response,
            ]);

            if (!in_array($response["status"], [ApiConstants::GOOD_REQ_CODE, 201])) {
                throw new SafeHavenException($response["message"] ?? null);
            }

            if (!in_array($response["data"]["statusCode"], [ApiConstants::GOOD_REQ_CODE, 201])) {
                throw new SafeHavenException($response["data"]["message"] ?? $response["message"] ?? null);
            }

            $initializeData = [
                "success" => $response["status"],
                "message" => $response["message"],
                "data" => [
                    "account_id" => $response["data"]["data"]["_id"],
                    "account_number" => $response["data"]["data"]["accountNumber"],
                    "account_name" => $response["data"]["data"]["accountName"],
                    "currency" => $response["data"]["data"]["currencyCode"],
                    "expires_at" => now()->addSeconds($this->duration)->format("Y-m-d H:i:s"),
                    "reference" => $response["data"]["data"]["externalReference"],
                    "amount" => $response["data"]["data"]["amount"],
                ],
            ];

            return $initializeData;
        } catch (ValidationException $th) {
            throw $th;
        } catch (Exception $th) {
            ExceptionService::logAndBroadcast($th);
            throw new SafeHavenException($th->getMessage());
        }
    }
}
