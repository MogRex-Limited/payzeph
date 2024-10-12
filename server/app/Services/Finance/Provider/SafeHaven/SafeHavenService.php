<?php

namespace App\Services\Finance\Provider\SafeHaven;

use App\Constants\General\ApiConstants;
use App\Exceptions\Finance\Payment\SafeHavenException;
use App\Exceptions\General\ProviderException;
use App\Services\General\Guzzle\GuzzleService;
use App\Services\System\ExceptionService;
use Exception;

class SafeHavenService
{
    public $base_url;
    public array $headers;
    public $client;
    public $customer_data;
    public $access_token_data;

    public function __construct()
    {
        $this->base_url = env("SAFE_HAVEN_BASE_URL");
        $this->generateAccessToken();
        $this->setHeaders([
            'Authorization' => "Bearer " . $this->access_token_data["access_token"] ?? null,
            "ClientID" => $this->access_token_data["ibs_client_id"] ?? null,
        ]);
    }

    public function setHeaders(?array $headers = [])
    {
        $this->headers = $headers = array_merge([
            'Content-Type' => 'application/json',
            'Accept' => 'application/json'
        ], $headers);

        return $headers;
    }

    public function setClient($headers = null)
    {
        $this->client = new GuzzleService($this->headers ?? $headers ?? $this->setHeaders());
        return $this->client;
    }

    public function generateAccessToken()
    {
        try {
            $full_url = $this->base_url . "/oauth2/token";

            $response = $this->setClient()->post($full_url, [
                "grant_type" => "client_credentials",
                "client_id" => config("services.safehaven.client_id"),
                "client_assertion" => config("services.safehaven.client_assertion"),
                "client_assertion_type" => "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
            ]);

            if (!in_array($response["status"], [ApiConstants::GOOD_REQ_CODE, 201])) {
                throw new SafeHavenException($response["message"] ?? null);
            }

            $this->access_token_data = $response["data"] ?? null;
            return $response["data"]["data"] ?? null;
        } catch (Exception $e) {
            ExceptionService::logAndBroadcast($e);
        }
    }

    public function getAccounts($sub_accounts = "false")
    {
        try {
            $full_url = $this->base_url . "/accounts";

            $response = $this->setClient()->getWithQuery($full_url, [
                "isSubAccount" => $sub_accounts
            ]);

            if (!in_array(($response["status"] ?? null), [ApiConstants::GOOD_REQ_CODE])) {
                throw new ProviderException(($response["data"]["message"] ?? $response["message"]), $response["status"]);
            }

            if (!in_array($response["data"]["statusCode"] ?? null, [ApiConstants::GOOD_REQ_CODE])) {
                throw new ProviderException(($response["data"]["message"] ?? $response["message"]), $response["status"]);
            }

            return $response["data"]["data"];
        } catch (ProviderException $e) {
            ExceptionService::broadcastOnAllChannels($e);
        }
    }

    public function getAccount($id, $type = "static")
    {
        try {
            $full_url = ($type == "static") ? $this->base_url . "/accounts/{$id}" : $this->base_url . "/virtual-accounts/{$id}";
            $response = $this->setClient()->getWithQuery($full_url);

            if (!in_array(($response["status"] ?? null), [ApiConstants::GOOD_REQ_CODE])) {
                throw new ProviderException(($response["data"]["message"] ?? $response["message"]), $response["status"]);
            }

            if (!in_array($response["data"]["statusCode"] ?? null, [ApiConstants::GOOD_REQ_CODE])) {
                throw new ProviderException(($response["data"]["message"] ?? $response["message"]), $response["status"]);
            }

            return $response["data"]["data"];
        } catch (ProviderException $e) {
            ExceptionService::broadcastOnAllChannels($e);
        }
    }

    public function getBalance()
    {
        try {
            $data = $this->getAccounts();
            return $data[0]["accountBalance"];
        } catch (\Throwable $th) {
            return null;
        }
    }

    public function verifyAcount($bank_code, $account_number, $account_name = null)
    {
        try {
            $full_url = $this->base_url . "/transfers/name-enquiry";

            $response = $this->setClient()->post($full_url, [
                "bankCode" => $bank_code,
                "accountNumber" => $account_number,
            ]);

            if (!in_array(($response["status"] ?? null), [ApiConstants::GOOD_REQ_CODE, 201])) {
                throw new ProviderException(($response["data"]["message"] ?? $response["message"] ?? ""), $response["status"]);
            }

            if (!in_array(($response["data"]["statusCode"] ?? null), [ApiConstants::GOOD_REQ_CODE, 201])) {
                throw new ProviderException(($response["data"]["message"] ?? $response["message"] ?? ""), $response["status"]);
            }

            if (!empty($account_name)) {
                if (($response["data"]["data"]["accountName"] ?? null) !== $account_name) {
                    throw new SafeHavenException("Invalid account name provided", ApiConstants::BAD_REQ_ERR_CODE);
                }
            }

            if (($response["data"]["data"]["accountNumber"] ?? null) !== $account_number) {
                throw new SafeHavenException("Invalid account number provided", ApiConstants::BAD_REQ_ERR_CODE);
            }

            $response["data"]["data"]["bank_code"] = $bank_code;

            return $response["data"]["data"];
        } catch (ProviderException $e) {
            ExceptionService::broadcastOnAllChannels($e);
            throw new ProviderException("Sorry we are experiencing bank transfer downtime.");
        } catch (SafeHavenException $e) {
            ExceptionService::broadcastOnAllChannels($e);
            throw new SafeHavenException($e->getMessage(), $e->getCode());
        }
    }

    public function deleteAccount($id)
    {
        try {
            $full_url = $this->base_url . "/virtual-accounts/{$id}";
            $response = $this->setClient()->delete($full_url);
            if (!in_array(($response["status"] ?? null), [ApiConstants::GOOD_REQ_CODE])) {
                throw new ProviderException(($response["data"]["message"] ?? $response["message"]), $response["status"]);
            }

            if (!in_array($response["data"]["statusCode"] ?? null, [ApiConstants::GOOD_REQ_CODE])) {
                throw new ProviderException(($response["data"]["message"] ?? $response["message"]), $response["status"]);
            }
        } catch (ProviderException $e) {
            ExceptionService::broadcastOnAllChannels($e);
        }
    }
}
