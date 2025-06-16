<?php

namespace App\Http\Controllers;

use App\Models\TutingSession;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Mail\NewBookingNotification;
use Illuminate\Support\Facades\Mail;


class TutorBookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($tutorId)
    {
        $tutor = User::findOrFail($tutorId);
        return Inertia::render('TutorBooking/Booked', [
            'tutor' => $tutor
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($tutorId)
    {
        $tutor = User::findOrFail($tutorId);
        $units = $tutor->units()->select('units.id', 'units.name')->get();
        return Inertia::render('TutorBooking/Create', ['tutor' => $tutor, 'units' => $units]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $tutorId)
    {
        $request->validate([
            'unit' => 'required|exists:units,id',
            'session_datetime' => 'required|date',
            'duration' => 'required|integer|min:1|max:6',
            'notes' => 'nullable|string|max:500',
        ]);

        $tutor = User::findOrFail($tutorId);
        $session = TutingSession::create([
            'tutee_id' => Auth::user()->id,
            'tutor_id' => $tutorId,
            'unit_id' => $request->input('unit'),
            'scheduled_start' => $request->input('session_datetime'),
            'scheduled_stop' => \Carbon\Carbon::parse($request->input('session_datetime'))->addHours($request->input('duration')),
            'notes' => $request->input('notes', ''),
        ]);

        // Send email notification to tutor
        Mail::to($tutor->email)->send(new NewBookingNotification($tutor, Auth::user(), $session));

        return redirect()->route('bookTutor.index', ['tutor' => $tutorId])
            ->with('success', 'Session booked successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
