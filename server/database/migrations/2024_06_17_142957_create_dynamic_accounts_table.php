<?php

use App\Constants\Account\User\UserConstants;
use App\Constants\General\StatusConstants;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDynamicAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dynamic_accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id")->nullable()->constrained("users")->cascadeOnDelete();
            $table->foreignId("wallet_id")->nullable()->constrained("wallets")->cascadeOnDelete();
            $table->string("reference")->unique();
            $table->string("account_number");
            $table->string("account_name");
            $table->string("amount")->nullable();
            $table->string("currency")->nullable();
            $table->string("provider");
            $table->string("account_id")->nullable();
            $table->string("type")->nullable()->default(UserConstants::USER);
            $table->dateTime("expires_at")->nullable();
            $table->string("status")->default(StatusConstants::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dynamic_accounts');
    }
}
