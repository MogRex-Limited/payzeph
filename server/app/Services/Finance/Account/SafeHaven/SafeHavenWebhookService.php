<?php

namespace App\Services\Finance\Account\SafeHaven;

use App\Exceptions\General\InvalidRequestException;
use App\Services\Finance\Account\SafeHaven\SafeHavenVirtualAccountPaymentWebhookService;
use App\Services\System\ExceptionService;
use Exception;
use Illuminate\Support\Facades\DB;

class SafeHavenWebhookService
{
    public array $payload;

    public function setPayload(array $value)
    {
        $this->payload = $value;
        return $this;
    }

    public function handle()
    {
        DB::beginTransaction();
        try {
            $payload = $this->payload;
            if (in_array($payload["type"] ?? null, ["virtualAccount.transfer"])) {
                $this->handleVirtualAccountPayments($payload);
            } else {
                throw new InvalidRequestException("The event is unregistered");
            }
            DB::commit();
        } catch (Exception $th) {
            DB::rollBack();
            ExceptionService::logAndBroadcast($th);
            throw $th;
        }
    }

    public function handleVirtualAccountPayments($payload)
    {
        return (new SafeHavenVirtualAccountPaymentWebhookService)
            ->setPayload($payload)
            ->handle();
    }
}
