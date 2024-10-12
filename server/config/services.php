<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
        'scheme' => 'https',
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'circle' => [
        'api_key' => env('CIRCLE_API_KEY'),
        'base_url' => env('CIRCLE_BASE_URL'),
        'entity_secret' => env("CIRCLE_ENTITY_SECRET")
    ],

    'safehaven' => [
        'client_id' => env('SAFE_HAVEN_CLIENT_ID'),
        'client_assertion' => env('SAFE_HAVEN_CLIENT_ASSERTION'),
        'refresh_token' => env('SAFE_HAVEN_REFRESH_TOKEN'),
        'default_account_number' => env('SAFE_HAVEN_DEBIT_ACCOUNT'),
    ],
];
