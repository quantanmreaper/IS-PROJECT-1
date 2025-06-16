<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TutionRequestAccepted extends Mailable
{
    use Queueable, SerializesModels;

    public $tutee;
    public $tutor;
    public $session;

    public function __construct($tutee, $tutor, $session)
    {
        $this->tutee = $tutee;
        $this->tutor = $tutor;
        $this->session = $session;
    }

    public function build()
    {
        return $this->subject('Your Tutoring Session Has Been Accepted')
            ->view('emails.tution_request_accepted');
    }
}
