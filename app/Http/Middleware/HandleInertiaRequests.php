<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\Message;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'is_tutor' => $request->user()->is_tutor,
                    'is_mentor' => $request->user()->is_mentor,
                    'user_type' => $request->user()->user_type,
                    'unread_message_count' => Message::where('recipient_id', $request->user()->id)
                                               ->where('read', false)
                                               ->count(),
                ] : null,
            ],
             'flash' => [
            'success' => session('success'),
            'error' => session('error'),
        ],
        ];
    }
}
