<?php

namespace App\Console\Commands;

use App\Services\Provider\Circle\CircleService;
use Illuminate\Console\Command;

class TestCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $response =  (new CircleService)->createEntitySecretCipher();

        dd($response);

        // AppMailerService::send([
        //     "data" => [
        //     ],
        //     "to" => "joelomojefe@gmail.com",
        //     "template" => "emails.test",
        //     "subject" => "Test Email",
        // ]);
    }
}
