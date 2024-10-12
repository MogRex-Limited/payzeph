<?php

namespace App\Http\Resources\User;

use App\Http\Resources\Finance\Wallet\WalletResource;
use App\Services\Finance\Wallet\WalletService;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $wallets = (new WalletService)->setUser($this)->wallets()->get();
        return [
            "id" => $this->id,
            "first_name" => $this->first_name,
            "middle_name" => $this->middle_name,
            "last_name" => $this->last_name,
            "email" => $this->email,
            "zeph_id" => $this->zeph_id,
            "status" => $this->status,
            "phone_number" => $this->phone_number,
            "business_name" => $this->business_name,
            "business_category" => $this->business_category,
            "email_verified_at" => $this->email_verified_at,
            "two_factor_enabled" => $this->two_factor_enabled,
            "wallets" => WalletResource::collection($wallets), 
            "created_at" => $this->created_at,
        ];
    }
}
