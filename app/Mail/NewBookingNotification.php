<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewBookingNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $tutor;
    public $tutee;
    public $session;

    public function __construct($tutor, $tutee, $session)
    {
        $this->tutor = $tutor;
        $this->tutee = $tutee;
        $this->session = $session;
    }

    public function build()
    {
        return $this->subject('You have a new tutoring session booking')
            ->view('emails.new_booking_notification');
    }
}
