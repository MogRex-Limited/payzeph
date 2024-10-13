<?php

namespace App\Http\Controllers\Api\V1\User\Finance\Payment;

use App\Constants\General\ApiConstants;
use App\Exceptions\Finance\Wallet\WalletException;
use App\Exceptions\General\InvalidRequestException;
use App\Exceptions\General\ModelNotFoundException;
use App\Helpers\ApiHelper;
use App\Http\Controllers\Controller;
use App\Services\Finance\Transfer\FundTransferService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class PaymentController extends Controller
{
    public function initiate(Request $request)
    {
        try {
            $data = (new FundTransferService)->process($request->all());
            return ApiHelper::validResponse("Transfer of fund successful", $data);
        } catch (ValidationException $e) {
            return ApiHelper::inputErrorResponse($this->validationErrorMessage, ApiConstants::VALIDATION_ERR_CODE, $e);
        } catch (InvalidRequestException | ModelNotFoundException | WalletException $e) {
            return ApiHelper::problemResponse($e->getMessage(), ApiConstants::BAD_REQ_ERR_CODE, $e);
        } catch (Exception $e) {
            return ApiHelper::problemResponse($this->serverErrorMessage, ApiConstants::SERVER_ERR_CODE, $e);
        }
    }
}
