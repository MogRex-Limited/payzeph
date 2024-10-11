<?php

namespace App\Http\Resources\Finance\Wallet;

use App\Http\Resources\Finance\Currency\CurrencyResource;
use Illuminate\Http\Resources\Json\JsonResource;

class   WalletResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "type" => $this->type,
            "balance" => $this->balance,
            "currency" => CurrencyResource::make($this->whenLoaded("currency", $this->currency)),
            "status" => $this->status,
            "created_at" => $this->created_at,
        ];
    }
}
