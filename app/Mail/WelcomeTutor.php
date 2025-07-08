<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class WelcomeTutor extends Mailable
{
    use Queueable, SerializesModels;

    public $tutor;

    public function __construct($tutor)
    {
        $this->tutor = $tutor;
    }

    public function build()
    {
        return $this->subject('Welcome to Peer To Peer Tutoring!')
            ->view('emails.welcome_tutor');
    }
}
