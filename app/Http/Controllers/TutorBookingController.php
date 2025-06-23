<?php

namespace App\Http\Controllers;

use App\Models\TutingSession;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Mail\NewBookingNotification;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;


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
            'unit_id' => 'required|exists:units,id',
            'session_datetime' => 'required|date',
            'duration' => 'required|integer|min:1|max:6',
            'notes' => 'nullable|string|max:500',
        ]);

        $tutor = User::findOrFail($tutorId);
        $duration = (int) $request->input('duration');
        $hourlyRate = optional($tutor->TutorDetails)->hourly_rate ?? 0; // Fetch from TutorDetails
        $amount = $hourlyRate * $duration;

        $session = TutingSession::create([
            'tutee_id' => Auth::user()->id,
            'tutor_id' => $tutorId,
            'unit_id' => $request->input('unit_id'),
            'scheduled_start' => $request->input('session_datetime'),
            'scheduled_stop' => \Carbon\Carbon::parse($request->input('session_datetime'))->addHours($duration),
            'notes' => $request->input('notes', ''),
        ]);

        // Send email notification to tutor
        Mail::to($tutor->email)->send(new NewBookingNotification($tutor, Auth::user(), $session));

        // Prepare payment variables
        $intasend = new \App\Services\IntaSendCheckoutService();
        $host = config('app.url'); // Or set your public host URL
        $redirectUrl = route('payment.callback'); // Define this route for payment callback/redirect
        $refOrderNumber = 'booking_' . uniqid(); // Only allowed characters
        $userName = Auth::user()->name;
        $userEmail = Auth::user()->email;
        $userPhone = Auth::user()->phone_number ?? '';

        // Log before payment initiation
        Log::info('Initiating IntaSend payment', [
            'amount' => $amount,
            'currency' => 'KES',
            'user_name' => $userName,
            'user_email' => $userEmail,
            'user_phone' => $userPhone,
            'host' => $host,
            'redirectUrl' => $redirectUrl,
            'refOrderNumber' => $refOrderNumber,
            'session_id' => $session->id,
        ]);

        try {
            $resp = $intasend->createCheckout(
                $amount,
                'KES',
                $userName,
                $userEmail,
                $userPhone,
                $host,
                $redirectUrl,
                $refOrderNumber
            );
            Log::info('IntaSend payment created', [
                'checkout_url' => $resp->url,
                'response' => $resp,
                'session_id' => $session->id,
            ]);
            // Always return JSON for AJAX/Inertia requests
            if ($request->expectsJson() || $request->wantsJson() || $request->header('X-Inertia')) {
                return response()->json(['redirect' => $resp->url]);
            }
            // Only do a real redirect for normal browser requests
            return redirect()->away($resp->url);
        } catch (\Exception $e) {
            Log::error('IntaSend payment initiation failed', [
                'error' => $e->getMessage(),
                'session_id' => $session->id,
            ]);
            if ($request->expectsJson() || $request->wantsJson() || $request->header('X-Inertia')) {
                return response()->json(['error' => 'Failed to initiate payment. Please try again.'], 500);
            }
            return redirect()->back()->withErrors(['payment' => 'Failed to initiate payment. Please try again.']);
        }
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
