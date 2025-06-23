<?php

namespace App\Services;

use IntaSend\IntaSendPHP\Checkout;
use IntaSend\IntaSendPHP\Customer;

class IntaSendCheckoutService
{
    protected $checkout;
    protected $testMode;

    public function __construct()
    {
        $publishableKey = env('INTASEND_PUBLIC_KEY');
        $this->testMode = env('INTASEND_TEST', true); // true for sandbox, false for live
        $this->checkout = new Checkout();
        $this->checkout->init([
            'publishable_key' => $publishableKey,
            'test' => $this->testMode,
        ]);
    }

    public function createCheckout($amount, $currency, $name, $email, $phone, $host, $redirectUrl, $refOrderNumber)
    {
        $customer = new Customer();
        $customer->first_name = $name;
        $customer->email = $email;
        $customer->phone_number = $phone;
        $customer->country = 'KE';

        $resp = $this->checkout->create(
            $amount,
            $currency,
            $customer,
            $host,
            $redirectUrl,
            $refOrderNumber,
            null,
            null
        );
        return $resp;
    }
}
