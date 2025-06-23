<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class IntaSendService
{
    protected $publicKey;
    protected $secretKey;
    protected $baseUrl;

    public function __construct()
    {
        $this->publicKey = config('intasend.public_key', env('INTASEND_PUBLIC_KEY'));
        $this->secretKey = config('intasend.secret_key', env('INTASEND_SECRET_KEY'));
        $this->baseUrl = config('intasend.base_url', env('INTASEND_BASE_URL', 'https://api.intasend.com/v1/checkout/'));
    }

    /**
     * Initiate a payment and return the checkout URL
     */
    public function initiatePayment($amount, $email, $name, $phone, $currency = 'KES', $description = 'Tutoring Session')
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->secretKey,
            'Content-Type' => 'application/json',
        ])->post($this->baseUrl, [
            'public_key' => $this->publicKey,
            'amount' => $amount,
            'currency' => $currency,
            'email' => $email,
            'name' => $name,
            'phone_number' => $phone,
            'hosted_payment' => true,
            'description' => $description,
        ]);

        if ($response->successful() && isset($response['url'])) {
            return $response['url'];
        }
        throw new \Exception('Failed to initiate payment: ' . $response->body());
    }
}
