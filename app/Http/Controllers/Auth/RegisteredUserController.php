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
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email', 'regex:/^[^@]+@strathmore\.edu$/'],
            'password' => ['required', 'string', 'min:8', 'confirmed', Rules\Password::min(8)->letters()->numbers()->symbols()->mixedCase()],
            'bio' => 'required',
            'profile_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'student_id' => 'required|file|mimes:jpg,jpeg,png,pdf|max:5120',
            'phone' => 'required',
        ], [
            'email.regex' => 'The Email must be a valid Strathmore university address'
        ]);



        Log::info('User type received:', ['usertype' => $request->usertype]);

        $user = User::create([

            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_type' => 'standard user',
            'bio' => $request->bio,
            'phone_number' => $request->phone,
        ]);

        if ($request->hasFile('profile_photo')) {
            $path = $request->file('profile_photo')->store('pfps', 'public');
            $user->pfp = $path;
            $user->save(); // Save after adding the image path
        }

        if ($request->hasFile('student_id')) {
            $path = $request->file('student_id')->store('ids', 'public');
            $user->student_id = $path;
            $user->save(); // Save after adding the image path
        }




        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
