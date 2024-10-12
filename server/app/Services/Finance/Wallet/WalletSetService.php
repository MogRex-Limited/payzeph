<?php

namespace App\Services\Finance\Wallet;

use App\Exceptions\General\ModelNotFoundException;
use App\Models\WalletSet;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class WalletSetService
{
    public static function getById($id): WalletSet
    {
        $wallet = WalletSet::where("id", $id)->first();
        if (empty($wallet)) {
            throw new ModelNotFoundException("Wallet set not found");
        }
        return $wallet;
    }

    public function validate(array $data)
    {
        $validator = Validator::make($data, [
            'user_id' => 'required|exists:users,id',
            'ext_wallet_set_id' => "required|string",
            'custody_type' => "required|string",
            'idempotency_key' => "required|string",
            'name' => "required|string",
            'provider' => "required|string",
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $data =  $validator->validated();
    }


    public function create(array $data)
    {
        try {
            $data = $this->validate($data);
            $wallet_set = WalletSet::create($data);
            return $wallet_set;
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function update(array $data, $id)
    {
        try {
            $data = $this->validate($data);
            $wallet_set = $this->getById($id);
            $wallet_set->update($data);
            return $wallet_set->refresh();
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function deploy($id)
    {
        try {
            $wallet_set = $this->getById($id);
            $wallet_set->delete();
        } catch (Exception $e) {
            throw $e;
        }
    }
}
