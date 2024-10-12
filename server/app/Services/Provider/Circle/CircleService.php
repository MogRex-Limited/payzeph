<?php

namespace App\Services\Provider\Circle;

use App\Constants\General\ApiConstants;
use App\Exceptions\General\ProviderException;
use App\Services\General\Guzzle\GuzzleService;
use App\Services\System\ExceptionService;
use Exception;

class CircleService
{
    public $client;
    public $api_key;
    public $base_url;
    public $entity_secret;
    public $public_key;
    public $headers;
    public $validated_data;

    public function __construct()
    {
        $this->api_key = env("CIRCLE_API_KEY");
        $this->base_url = env("CIRCLE_BASE_URL");
        $this->entity_secret = env("CIRCLE_ENTITY_SECRET");
        $this->headers = $headers = [
            "accept" => "application/json",
            "Content-Type" => "application/json",
            "Authorization" => "Bearer $this->api_key"
        ];

        $this->client = new GuzzleService($headers);
    }


    public function fectchPublicKey()
    {
        try {
            $full_url = $this->base_url . "/config/entity/publicKey";

            $response = $this->client->post($full_url, [

            ]);

            if (!in_array(($response["status"] ?? null), [ApiConstants::GOOD_REQ_CODE])) {
                throw new ProviderException(json_encode($response["data"]["message"] ?? $response["message"]), $response["status"]);
            }

            if (empty($response["data"]["data"]["publicKey"] ?? null)) {
                throw new ProviderException(json_encode($response["data"]["message"] ?? $response["message"]), $response["status"]);
            }

            $this->public_key = $response["data"]["data"]["publicKey"];
            return $response["data"];
        } catch (ProviderException $e) {
            ExceptionService::broadcastOnAllChannels($e);
            throw $e;
        }
    }

    public function createWalletSet()
    {
        try {
            $full_url = $this->base_url . "/developer/walletSets";

            $response = $this->client->get($full_url);

            if (!in_array(($response["status"] ?? null), [ApiConstants::GOOD_REQ_CODE])) {
                throw new ProviderException(json_encode($response["data"]["message"] ?? $response["message"]), $response["status"]);
            }

            if (empty($response["data"]["data"]["publicKey"] ?? null)) {
                throw new ProviderException(json_encode($response["data"]["message"] ?? $response["message"]), $response["status"]);
            }

            $this->public_key = $response["data"]["data"]["publicKey"];
            return $response["data"];
        } catch (ProviderException $e) {
            ExceptionService::broadcastOnAllChannels($e);
            throw $e;
        }
    }

    public function createWallet()
    {
        try {
            $full_url = $this->base_url . "/developer/wallets";

            $response = $this->client->get($full_url);

            if (!in_array(($response["status"] ?? null), [ApiConstants::GOOD_REQ_CODE])) {
                throw new ProviderException(json_encode($response["data"]["message"] ?? $response["message"]), $response["status"]);
            }

            if (empty($response["data"]["data"]["publicKey"] ?? null)) {
                throw new ProviderException(json_encode($response["data"]["message"] ?? $response["message"]), $response["status"]);
            }

            $this->public_key = $response["data"]["data"]["publicKey"];
            return $response["data"];
        } catch (ProviderException $e) {
            ExceptionService::broadcastOnAllChannels($e);
            throw $e;
        }
    }

    public function createEntitySecretCipher()
    {
        try {
            $entity_secret = $this->entity_secret;
            $this->fectchPublicKey();

            $key =  $this->encryptEntitySecret($this->public_key, $entity_secret);
            dd($this->public_key, $key);
            // Convert hex-encoded entity secret to binary
            $entity_secret = hex2bin($entity_secret);

            // Load the public key from PEM format
            $public_key = openssl_pkey_get_public($this->public_key);

            if (!$public_key) {
                throw new ProviderException('Invalid public key');
            }

            // Encrypt the entity secret using RSA-OAEP with SHA-256 as the hash function
            $encrypted_data = '';
            $padding = OPENSSL_PKCS1_OAEP_PADDING; // Ensure OAEP padding is used
            $success = openssl_public_encrypt($entity_secret, $encrypted_data, $public_key, $padding);

            if (!$success) {
                throw new ProviderException('Encryption failed');
            }

            // Base64 encode the encrypted data
            $encrypted_data = base64_encode($encrypted_data);
            return $encrypted_data;
        } catch (ProviderException $e) {
            ExceptionService::broadcastOnAllChannels($e);
            throw $e;
        }
    }

    public function encryptEntitySecret($publicKeyString, $hexEncodedEntitySecret)
    {
        // Decode entity secret
        $entitySecret = hex2bin($hexEncodedEntitySecret);
        if (strlen($entitySecret) !== 32) {
            throw new Exception("Invalid entity secret length");
        }

        // Parse public key
        $pubKey = $this->parseRsaPublicKeyFromPem($publicKeyString);

        // Encrypt the secret
        $cipherText = $this->encryptOAEP($pubKey, $entitySecret);

        return $cipherText;
    }

    // Function to parse RSA public key from PEM format
    public function parseRsaPublicKeyFromPem($pubPEM)
    {
        $pem = openssl_pkey_get_public($pubPEM);
        if (!$pem) {
            throw new Exception("Failed to parse PEM block containing the key");
        }
        $details = openssl_pkey_get_details($pem);
        if ($details['type'] !== OPENSSL_KEYTYPE_RSA) {
            throw new Exception("Key type is not RSA");
        }
        return $details['key'];
    }

    // Function to encrypt with OAEP padding
    public function encryptOAEP($pubKey, $message)
    {
        $cipherText = null;
        $result = openssl_public_encrypt($message, $cipherText, $pubKey, OPENSSL_PKCS1_OAEP_PADDING);
        if (!$result) {
            throw new Exception("Encryption failed: " . openssl_error_string());
        }
        return base64_encode($cipherText);
    }
}
