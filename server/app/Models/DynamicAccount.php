<?php

namespace App\Models;

use App\Constants\Finance\PaymentConstants;
use App\Constants\General\StatusConstants;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DynamicAccount extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function user()
    {
        return $this->belongsTo(User::class, "user_id");
    }

    public function wallet()
    {
        return $this->belongsTo(Wallet::class, "wallet_id");
    }

    public function scopeStatus($query, $status = StatusConstants::ACTIVE)
    {
        return $query->where("status", $status);
    }

    public function scopeProvider($query, $provider = PaymentConstants::GATEWAY_SAFE_HAVEN)
    {
        return $query->where("provider", $provider);
    }

    public function scopeCurrent($query)
    {
        $time = now()->addMinutes(5);
        return $query->where("expires_at", ">=", $time);
    }

    public function scopeSearch($query, $value)
    {
        $query->whereRaw("CONCAT(provider,' ', account_name,' ', account_number) LIKE ?", ["%$value%"])
            ->orWhereHas("user", function ($user) use ($value) {
                $user->search($value);
            });
    }

    public function imageUrl()
    {
        if ($this->provider == PaymentConstants::GATEWAY_SAFE_HAVEN) {
            return asset("images/gateways/safe-haven.png");
        }
    }
}
