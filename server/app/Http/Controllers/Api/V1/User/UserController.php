<?php

namespace App\Http\Controllers\Api\V1\User;

use App\Constants\General\ApiConstants;
use App\Exceptions\General\ModelNotFoundException;
use App\Helpers\ApiHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserResource;
use App\Services\User\UserService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public $user_service;
    public $interest_service;
    public $blocked_user_service;
    public $avatar_service;
    public $social_auth_link_service;

    public function __construct()
    {
        $this->user_service = new UserService;
    }

    public function me()
    {
        try {
            $user = auth()->user();
            return ApiHelper::validResponse("User data retrieved successfully", UserResource::make($user));
        } catch (Exception $e) {
            return ApiHelper::problemResponse($this->serverErrorMessage, ApiConstants::SERVER_ERR_CODE, null, $e);
        }
    }

    public function update(Request $request)
    {
        try {
            $user = $this->user_service->update($request->all(), auth()->id());
            return ApiHelper::validResponse("User data updated successfully", UserResource::make($user));
        } catch (ValidationException $e) {
            return ApiHelper::inputErrorResponse($this->validationErrorMessage, ApiConstants::VALIDATION_ERR_CODE, null, $e);
        } catch (Exception $e) {
            return ApiHelper::problemResponse($this->serverErrorMessage, ApiConstants::SERVER_ERR_CODE, null, $e);
        }
    }

    public function getByZephId(Request $request)
    {
        try {
            $data = $request->validate([
                "zeph_id" => "required|exists:users,zeph_id",
            ]);

            $user = (new UserService)->getById($data["zeph_id"], "zeph_id");
            $data = UserResource::custom($user);
            return ApiHelper::validResponse("Wallet returned successfully", $data);
        } catch (ValidationException $e) {
            return ApiHelper::inputErrorResponse($this->validationErrorMessage, ApiConstants::VALIDATION_ERR_CODE, $e);
        } catch (ModelNotFoundException $e) {
            return ApiHelper::problemResponse($e->getMessage(), ApiConstants::BAD_REQ_ERR_CODE);
        } catch (\Throwable $e) {
            return ApiHelper::problemResponse($e->getMessage(), ApiConstants::SERVER_ERR_CODE);
        }
    }
}
