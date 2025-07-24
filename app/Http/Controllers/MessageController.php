<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index(User $user)
    {
        // Get the authenticated user
        $authUser = Auth::user();

        // Get messages between the authenticated user and the specified user
        $messages = Message::where(function ($query) use ($authUser, $user) {
            $query->where('sender_id', $authUser->id)
                  ->where('recipient_id', $user->id);
        })->orWhere(function ($query) use ($authUser, $user) {
            $query->where('sender_id', $user->id)
                  ->where('recipient_id', $authUser->id);
        })
        ->with(['sender:id,name,pfp'])
        ->orderBy('created_at', 'asc')
        ->get();

        // Add full URL to profile pictures in messages
        $messages->transform(function($message) {
            if ($message->sender && $message->sender->pfp && !str_starts_with($message->sender->pfp, 'http')) {
                $message->sender->pfp = asset('storage/' . $message->sender->pfp);
            }
            return $message;
        });

        // Mark messages as read
        Message::where('sender_id', $user->id)
              ->where('recipient_id', $authUser->id)
              ->where('read', false)
              ->update(['read' => true]);

        // Add full URL to recipient's profile picture
        if ($user->pfp && !str_starts_with($user->pfp, 'http')) {
            $user->pfp = asset('storage/' . $user->pfp);
        }

        return Inertia::render('Chat/Show', [
            'messages' => $messages,
            'recipient' => $user->only(['id', 'name', 'pfp']),
        ]);
    }

    public function getMessages(User $user)
    {
        $authUser = Auth::user();

        $messages = Message::where(function ($query) use ($authUser, $user) {
            $query->where('sender_id', $authUser->id)
                  ->where('recipient_id', $user->id);
        })->orWhere(function ($query) use ($authUser, $user) {
            $query->where('sender_id', $user->id)
                  ->where('recipient_id', $authUser->id);
        })
        ->with(['sender:id,name,pfp'])
        ->orderBy('created_at', 'asc')
        ->get();

        // full URL to profile pictures in messages
        $messages->transform(function($message) {
            if ($message->sender && $message->sender->pfp && !str_starts_with($message->sender->pfp, 'http')) {
                $message->sender->pfp = asset('storage/' . $message->sender->pfp);
            }
            return $message;
        });

        return response()->json(['messages' => $messages]);
    }

    public function sendMessage(Request $request, User $user)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $message = Message::create([
            'sender_id' => Auth::id(),
            'recipient_id' => $user->id,
            'message' => $request->message,
        ]);

        // Load the sender relationship
        $message->load('sender');
        
        // full URL to sender's profile picture
        if ($message->sender && $message->sender->pfp && !str_starts_with($message->sender->pfp, 'http')) {
            $message->sender->pfp = asset('storage/' . $message->sender->pfp);
        }

        // Broadcast the message
        broadcast(new MessageSent($message, Auth::user()))->toOthers();

        return response()->json(['message' => $message]);
    }

    public function markAsRead(User $user)
    {
        $authUser = Auth::user();
        
        $count = Message::where('sender_id', $user->id)
              ->where('recipient_id', $authUser->id)
              ->where('read', false)
              ->update(['read' => true]);
          
        return response()->json(['success' => true, 'count' => $count]);
    }
}
