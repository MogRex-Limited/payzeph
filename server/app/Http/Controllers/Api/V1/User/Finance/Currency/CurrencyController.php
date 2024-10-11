<?php

namespace App\Http\Controllers\Api\V1\User\Finance\Currency;

use App\Constants\General\ApiConstants;
use App\Exceptions\General\ModelNotFoundException;
use App\Helpers\ApiHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\Finance\Currency\CurrencyResource;
use App\Services\Finance\Currency\CurrencyService;
use Exception;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
    public $currency_service;
    public function __construct()
    {
        $this->currency_service = new CurrencyService;
    }

    public function index(Request $request)
    {
        try {
            $currencies = $this->currency_service->list()->status()->get();
            $data = CurrencyResource::collection($currencies);
            return ApiHelper::validResponse("Currencies returned successfully", $data);
        } catch (Exception $e) {
            return ApiHelper::problemResponse($this->serverErrorMessage, ApiConstants::SERVER_ERR_CODE, $e);
        }
    }

    public function show(Request $request, $currency_id)
    {
        try {
            $currency = $this->currency_service->getById($currency_id);
            $data = CurrencyResource::make($currency);
            return ApiHelper::validResponse("Currency returned successfully", $data);
        } catch (ModelNotFoundException $e) {
            return ApiHelper::problemResponse($e->getMessage(), ApiConstants::NOT_FOUND_ERR_CODE, $e);
        } catch (Exception $e) {
            return ApiHelper::problemResponse($this->serverErrorMessage, ApiConstants::SERVER_ERR_CODE, $e);
        }
    }
}
