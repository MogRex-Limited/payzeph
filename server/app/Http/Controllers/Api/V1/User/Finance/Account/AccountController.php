<?php

namespace App\Http\Controllers\Api\V1\User\Finance\Account;

use App\Constants\Account\User\UserConstants;
use App\Constants\Finance\PaymentConstants;
use App\Constants\General\ApiConstants;
use App\Exceptions\Finance\Payment\SafeHavenException;
use App\Exceptions\General\InvalidRequestException;
use App\Exceptions\General\ModelNotFoundException;
use App\Helpers\ApiHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\Finance\Account\DynamicAccountResource;
use App\Services\Finance\Payment\DynamicPayment\DynamicAccountPaymentService;
use App\Services\Finance\Wallet\WalletService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AccountController extends Controller
{
    public $wallet_service;
    public function __construct()
    {
        $this->wallet_service = new WalletService;
    }

    public function generateDynamicAccount(Request $request)
    {
        try {
            $user = auth()->user();
            $wallet = !empty($wallet_id = $request->wallet_id) ? $this->wallet_service->getById($wallet_id) : $this->wallet_service->getByUserId($user->id);

            if (empty($wallet)) {
                throw new ModelNotFoundException("Select a wallet to proceed");
            }

            $account = (new DynamicAccountPaymentService)
                ->setUser($user)
                ->setWallet($wallet)
                ->setType(UserConstants::USER)
                ->setProvider(PaymentConstants::GATEWAY_SAFE_HAVEN)
                ->byProvider();

            $data = DynamicAccountResource::make($account);
            return ApiHelper::validResponse("Account generated successfully", $data);
        } catch (ValidationException $e) {
            return ApiHelper::inputErrorResponse("The given data is invalid", ApiConstants::VALIDATION_ERR_CODE);
        } catch (SafeHavenException | ModelNotFoundException $e) {
            return ApiHelper::problemResponse($e->getMessage(), ApiConstants::BAD_REQ_ERR_CODE);
        } catch (Exception $e) {
            throw $e;
            return ApiHelper::problemResponse("Sorry we are experiencing bank transfer downtime.", ApiConstants::SERVER_ERR_CODE);
        }
    }
}
