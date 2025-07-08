<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class WelcomeMentor extends Mailable
{
    use Queueable, SerializesModels;

    public $mentor;

    public function __construct($mentor)
    {
        $this->mentor = $mentor;
    }

    public function build()
    {
        return $this->subject('Welcome to Peer To Peer Mentorship!')
            ->view('emails.welcome_mentor');
    }
}
