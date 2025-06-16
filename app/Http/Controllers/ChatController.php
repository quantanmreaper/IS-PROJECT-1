<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        // Get all users the authenticated user has chatted with
        $conversationUsers = User::whereIn('id', function($query) use ($user) {
            $query->select('sender_id')
                ->from('messages')
                ->where('recipient_id', $user->id)
                ->union(
                    DB::table('messages')
                    ->select('recipient_id')
                    ->where('sender_id', $user->id)
                );
        })
        ->select('id', 'name', 'pfp')
        ->withCount(['sentMessages as unread_count' => function($query) use ($user) {
            $query->where('recipient_id', $user->id)
                  ->where('read', false);
        }])
        ->get();
        
        return Inertia::render('Chat/Conversations', [
            'conversations' => $conversationUsers
        ]);
    }
}
