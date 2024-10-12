<?php

use App\Constants\General\StatusConstants;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('wallet_sets', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id")->constrained("users")->cascadeOnDelete();
            $table->string("ext_wallet_set_id");
            $table->string("name");
            $table->string("idempotency_key")->unique();
            $table->string("custody_type")->nullable();
            $table->string("provider");
            $table->string("status")->default(StatusConstants::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wallet_sets');
    }
};
