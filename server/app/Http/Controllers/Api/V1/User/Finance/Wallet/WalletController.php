<?php

namespace App\Http\Controllers\Api\V1\User\Finance\Wallet;

use App\Constants\General\ApiConstants;
use App\Exceptions\Finance\Wallet\WalletException;
use App\Exceptions\General\ModelNotFoundException;
use App\Helpers\ApiHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\Finance\Wallet\WalletResource;
use App\Services\Finance\Wallet\WalletService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class WalletController extends Controller
{
    public $wallet_service;
    public function __construct()
    {
        $this->wallet_service = new WalletService;
    }

    public function index(Request $request)
    {
        try {
            $user = auth()->user();
            $wallets = $this->wallet_service->setUser($user)->wallets($user)->get();
            $data = WalletResource::collection($wallets);
            return ApiHelper::validResponse("Wallets returned successfully", $data);
        } catch (Exception $e) {
            return ApiHelper::problemResponse($this->serverErrorMessage, ApiConstants::SERVER_ERR_CODE, $e);
        }
    }

    public function show(Request $request, $wallet_id)
    {
        try {
            $wallet = WalletService::getById($wallet_id);
            $data = WalletResource::make($wallet);
            return ApiHelper::validResponse("Wallet returned successfully", $data, $request, "wallets/" . $wallet->id . "/details");
        } catch (ModelNotFoundException $e) {
            return ApiHelper::problemResponse($e->getMessage(), ApiConstants::NOT_FOUND_ERR_CODE, $e);
        } catch (Exception $e) {
            return ApiHelper::problemResponse($this->serverErrorMessage, ApiConstants::SERVER_ERR_CODE, $e);
        }
    }

    public function create(Request $request)
    {
        try {
            $user = auth()->user();
            $wallet = $this->wallet_service->create($request->all(), $user);
            $data = WalletResource::make($wallet);
            return ApiHelper::validResponse("Wallet created successfully", $data);
        } catch (ValidationException $e) {
            return ApiHelper::inputErrorResponse("The given data is invalid", ApiConstants::VALIDATION_ERR_CODE, $e);
        } catch (WalletException $e) {
            return ApiHelper::problemResponse($e->getMessage(), ApiConstants::BAD_REQ_ERR_CODE);
        } catch (\Throwable $e) {
            return ApiHelper::problemResponse($e->getMessage(), ApiConstants::SERVER_ERR_CODE);
        }
    }
}
