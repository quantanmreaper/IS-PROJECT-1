<?php

namespace App\Http\Controllers;

use App\Models\TutingSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use App\Mail\TutionRequestAccepted;

class TutionRequestsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch all tuting sessions where the authenticated user is the tutor
        $userId = Auth::id();
        if (!$userId) {
            return redirect()->route('login')->with('error', 'You must be logged in to view this page.');
        }
        $tutingSessions = TutingSession::where('tutor_id', $userId)
            ->with(['unit', 'tutee:id,name,pfp'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($session) {
                $start = $session->scheduled_start;
                $stop = $session->scheduled_stop;
                $duration = null;
                if ($start && $stop) {
                    $startTime = \Carbon\Carbon::parse($start);
                    $stopTime = \Carbon\Carbon::parse($stop);
                    $duration = abs($stopTime->diffInHours($startTime));
                }
                return [
                    'id' => $session->id,
                    'unit' => $session->unit ? ['name' => $session->unit->name] : null,
                    'scheduled_start' => $start ? \Carbon\Carbon::parse($start)->format('D, jS M \a\t g:i a') : null,
                    'scheduled_stop' => $stop ? \Carbon\Carbon::parse($stop)->format('D, jS M \a\t g:i a') : null,
                    'duration' => $duration,
                    'accepted' => $session->acceptance ?? false,
                    'tutee' => $session->tutee,
                    'created_at' => $session->created_at ? $session->created_at->format('D, jS M Y g:i a') : null,
                ];
            });

        return Inertia::render('TutionRequests/index', [
            'requests' => $tutingSessions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(TutingSession $tutingSession)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TutingSession $tutingSession)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TutingSession $tutingSession)
    {
        $request->validate([
            'accepted' => 'required|boolean',
        ]);

        $tutingSession->acceptance = $request->input('accepted');
        $tutingSession->save();

        // Send email to tutee if accepted
        if ($tutingSession->acceptance) {
            $tutee = $tutingSession->tutee;
            $tutor = $tutingSession->tutor;
            $session = $tutingSession->load('unit');
            Mail::to($tutee->email)->send(new TutionRequestAccepted($tutee, $tutor, $session));
        }

        return redirect()->back()->with('success', 'Tution request updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TutingSession $tutingSession)
    {
        //
    }
}
