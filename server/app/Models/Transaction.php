<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class, "user_id", "id");
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class, "currency_id", "id");
    }

    public function wallet()
    {
        return $this->belongsTo(Wallet::class, "wallet_id", "id");
    }

    public function scopeSearch($query, $value)
    {
        $query->where(function ($builder) use ($value) {
            $builder->where("description", "LIKE", "%$value%")
                ->orWhere("reference", "LIKE", "%$value%")
                ->orWhere("batch_no", "like", "%$value%")
                ->orWhereRaw("CONCAT(description,' ', reference) LIKE ?", ["%$value%"])
                ->orWhereHas("user", function ($user) use ($value) {
                    $user->search($value);
                });
        });
    }

    public function formattedAmount($key = "amount", $currency_symbol = null)
    {
        return format_money($this->$key, 2, $currency_symbol ?? $this->currency->symbol);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class, "transaction_id");
    }
}
