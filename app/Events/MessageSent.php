<?php

namespace App\Events;

use App\Models\Message;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    public $user;
    //public $recipient;

    /**
     * Create a new event instance.
     */
    public function __construct(Message $message, User $user)
    {
        //
        $this->message = $message;
        $this->user = $user;

    }
    public function broadcastOn(){
        return new PrivateChannel('chat.'.$this->message->recipient_id);
    }
    
    public function broadcastWith(){
        // Load sender information
        $this->message->load('sender');
        
        // Add full URL to profile pictures
        if ($this->message->sender && $this->message->sender->pfp && !str_starts_with($this->message->sender->pfp, 'http')) {
            $this->message->sender->pfp = asset('storage/' . $this->message->sender->pfp);
        }
        
        // Add full URL to user's profile picture
        $userData = $this->user->only(['id', 'name', 'pfp']);
        if ($userData['pfp'] && !str_starts_with($userData['pfp'], 'http')) {
            $userData['pfp'] = asset('storage/' . $userData['pfp']);
        }
        
        return[
            'message' => $this->message,
            'user' => $userData,
        ];
    }

    public function broadcastAs()
    {
        return 'MessageSent';
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * 
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    /* public function broadcastOn(): array
    {
        return [
            new PrivateChannel('channel-name'),
        ];
    } */
}
