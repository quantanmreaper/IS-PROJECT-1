<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\MentorDetails;
use Illuminate\Http\RedirectResponse;
//use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Mail\WelcomeMentor;
use Illuminate\Support\Facades\Mail;

class MentorDetailsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {

        return Inertia::render('Mentors/MentorRegistration');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'year_of_study' => 'required|integer',
            'course' => 'required|string|max:255',
            'skills' => 'nullable|string|max:255',
            'hobbies' => 'nullable|string|max:255',
            'work_experience' => 'nullable|string|max:255',
        ]);

        //mentor id is the current user id
        $validated['mentor_id'] = Auth::id();
        $user = Auth::user();
        if ($user instanceof \App\Models\User) {
            $user->is_mentor = true;
            $user->save();
            // Send welcome email
            Mail::to($user->email)->send(new WelcomeMentor($user));
        }


        MentorDetails::create($validated);
        return redirect()->route('dashboard')->with('success', 'Mentor details submitted successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(MentorDetails $mentorDetails)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MentorDetails $mentorDetails)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MentorDetails $mentorDetails)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MentorDetails $mentorDetails)
    {
        //
    }
}
