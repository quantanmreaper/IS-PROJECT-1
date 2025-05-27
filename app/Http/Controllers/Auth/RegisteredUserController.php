<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
/*             'password' => ['required', 'confirmed', Rules\Password::defaults()],
 */         'password' => ['required', 'string', 'min:8', 'confirmed', Rules\Password::min(8)->letters()->numbers()->symbols()->mixedCase()],
            'usertype' => 'required',
            'bio' => 'required',
            //'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'phone' => 'required',

    ]);

   

Log::info('User type received:', ['usertype' => $request->usertype]);

        $user = User::create([
             
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_type' => $request->usertype,
            'bio' => $request->bio,
            //'pfp' => $request->file('profile_image') ? $request->file('profile_image')->store('profile_images', 'public') : null,
            'phone_number' => $request->phone,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
