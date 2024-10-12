<?php

namespace App\Http\Resources\Finance\Account;

use App\Constants\Finance\PaymentConstants;
use Illuminate\Http\Resources\Json\JsonResource;

class DynamicAccountResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $data = [
            "id" => $this->id,
            "reference" => $this->reference,
            "account_number" => $this->account_number,
            "account_name" => $this->account_name,
            "amount" => $this->amount,
            "currency" => $this->currency,
            "provider" => $this->provider,
            "image_url" => $this->imageUrl(),
            "bank_name" => ($this->provider == PaymentConstants::GATEWAY_SAFE_HAVEN) ? "Safe Haven Microfinance Bank" : $this->provider,
            "expires_at" => $this->expires_at,
            "status" => $this->status,
        ];

        return $data;
    }
}
