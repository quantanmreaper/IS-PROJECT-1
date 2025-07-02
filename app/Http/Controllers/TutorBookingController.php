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
        $hourlyRate = (float) (optional($tutor->TutorDetails)->hourly_rate ?? 0);
        if ($hourlyRate < 0.1 || $duration < 1) {
            return back()->withErrors(['session_datetime' => 'Tutor hourly rate or duration is invalid.']);
        }
        $amount = round($hourlyRate * $duration, 2);
        $sessionStart = \Carbon\Carbon::parse($request->input('session_datetime'));
        $sessionStop = $sessionStart->copy()->addHours($duration);

        $session = TutingSession::create([
            'tutee_id' => Auth::user()->id,
            'tutor_id' => $tutorId,
            'unit_id' => $request->input('unit_id'),
            'scheduled_start' => $sessionStart,
            'scheduled_stop' => $sessionStop,
            'notes' => $request->input('notes', ''),
        ]);

        // Send email notification to tutor
        Mail::to($tutor->email)->send(new NewBookingNotification($tutor, Auth::user(), $session));

        // Prepare payment variables
        $intasend = new \App\Services\IntaSendCheckoutService();
        $host = config('app.url'); // Or set your public host URL
        $redirectUrl = route('payment.callback'); // Define this route for payment callback/redirect
        $refOrderNumber = 'booking_' . uniqid();
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

        // Save session and prepare summary
        return Inertia::render('PaymentSummary', [
            'payment' => [
                'item_type' => 'tutoring',
                'item_title' => $tutor->name . ' Tutoring Session',
                'amount' => $amount,
                'instructor_name' => $tutor->name,
                'session_datetime' => $sessionStart->format('D, M j Y, g:i a'),
                'ref' => $refOrderNumber,
                'confirm_url' => route('bookTutor.payment.confirm', $session->id),
                'cancel_url' => route('bookTutor.create', $tutor->id),
            ]
        ]);
    }

    // Confirm and actually initiate IntaSend checkout (step 2)
    public function confirmPayment(Request $request, $sessionId)
    {
        $session = TutingSession::findOrFail($sessionId);
        $tutor = $session->tutor;
        $user = Auth::user();
        $hourlyRate = (float) (optional($tutor->TutorDetails)->hourly_rate ?? 0);
        $start = $session->scheduled_start instanceof \Carbon\Carbon ? $session->scheduled_start : \Carbon\Carbon::parse($session->scheduled_start);
        $stop = $session->scheduled_stop instanceof \Carbon\Carbon ? $session->scheduled_stop : \Carbon\Carbon::parse($session->scheduled_stop);
        $duration = $start->diffInHours($stop);
        $amount = round($hourlyRate * $duration, 2);
        if ($amount < 0.1) {
            return response()->json(['error' => 'Tutoring session amount must be at least 0.1 KES. Please check the tutor rate or session duration.'], 400);
        }
        // Fallback logic for phone number
        $phone = $user->phone_number;
        $phoneSource = 'user';
        if (empty($phone)) {
            $phone = $request->input('phone_number');
            $phoneSource = 'request';
        }
        if (empty($phone)) {
            $phone = '254712345678'; // fallback/test value
            $phoneSource = 'fallback';
        }
        Log::info('Using phone number for payment', [
            'phone' => $phone,
            'source' => $phoneSource,
            'user_id' => $user->id,
        ]);
        $intasend = new \App\Services\IntaSendCheckoutService();
        $host = config('app.url');
        $redirectUrl = route('payment.callback');
        try {
            $resp = $intasend->createCheckout(
                $amount,
                'KES',
                $user->name,
                $user->email,
                $phone,
                $host,
                $redirectUrl,
                'booking_' . $session->id
            );
            // Immediately redirect to IntaSend payment page
            return redirect()->away($resp->url);
        } catch (\Exception $e) {
            Log::error('Tutoring payment initiation failed', [
                'error' => $e->getMessage(),
                'session_id' => $session->id,
                'user_id' => $user->id,
            ]);
            return response()->json(['error' => 'Failed to initiate payment. Please try again.'], 500);
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
