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
use Carbon\Carbon;


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

        // Get tutor's availability from TutorDetails
        $tutorDetails = $tutor->TutorDetails; // Note the capital T in TutorDetails to match the relationship
        Log::info('Tutor details retrieved', [
            'tutor_id' => $tutorId,
            'has_details' => !is_null($tutorDetails),
        ]);

        $availability = [
            'start' => $tutorDetails ? $tutorDetails->availability_start : null,
            'stop' => $tutorDetails ? $tutorDetails->availability_stop : null,
        ];

        // Get already booked sessions to prevent double booking
        $unavailableTimes = TutingSession::where('tutor_id', $tutorId)
            ->whereDate('scheduled_start', '>=', now())
            ->get(['scheduled_start', 'scheduled_stop'])
            ->map(function ($session) {
                return [
                    'start' => $session->scheduled_start,
                    'stop' => $session->scheduled_stop,
                ];
            });

        return Inertia::render('TutorBooking/Create', [
            'tutor' => $tutor,
            'units' => $units,
            'availability' => $availability,
            'unavailableTimes' => $unavailableTimes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $tutorId)
    {
        try {
            Log::info('Starting booking process', [
                'tutor_id' => $tutorId,
                'input' => $request->except(['_token']),
            ]);

            $validated = $request->validate([
                'unit_id' => 'required|exists:units,id',
                'session_datetime' => 'required|date',
                'duration' => 'required|integer|min:1|max:6',
                'notes' => 'nullable|string|max:500',
            ]);

            $tutor = User::findOrFail($tutorId);
            $duration = (int) $request->input('duration');
            $tutorDetails = $tutor->TutorDetails;
            $hourlyRate = (float) ($tutorDetails ? $tutorDetails->hourly_rate : 0);

            Log::info('Processing booking with rate', [
                'hourly_rate' => $hourlyRate,
                'duration' => $duration
            ]);

            if ($hourlyRate < 0.1 || $duration < 1) {
                Log::warning('Invalid rate or duration', [
                    'hourly_rate' => $hourlyRate,
                    'duration' => $duration
                ]);
                return back()->withErrors(['session_datetime' => 'Tutor hourly rate or duration is invalid.']);
            }

            $amount = round($hourlyRate * $duration, 2);
            $sessionStart = Carbon::parse($request->input('session_datetime'));
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
        } catch (\Exception $e) {
            Log::error('Error in booking process', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'tutor_id' => $tutorId,
                'input' => $request->except(['_token']),
            ]);

            return back()->withErrors(['general' => 'An error occurred while processing your booking. Please try again.']);
        }
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
     * Show accepted bookings and revenue/funds for the authenticated tutor.
     */
    public function tutorBookings()
    {
        $user = Auth::user();
        if (!$user->is_tutor) {
            abort(403, 'Only tutors can access this page.');
        }
        // Get all accepted bookings for this tutor
        $bookings = \App\Models\TutingSession::where('tutor_id', $user->id)
            ->where('acceptance', true)
            ->with(['tutee', 'unit'])
            ->orderByDesc('scheduled_start')
            ->get();
        // Calculate total revenue (all bookings)
        $totalRevenue = $bookings->reduce(function ($sum, $b) use ($user) {
            $start = $b->scheduled_start instanceof \Carbon\Carbon ? $b->scheduled_start : \Carbon\Carbon::parse($b->scheduled_start);
            $stop = $b->scheduled_stop instanceof \Carbon\Carbon ? $b->scheduled_stop : \Carbon\Carbon::parse($b->scheduled_stop);
            $duration = $start && $stop ? $start->diffInHours($stop) : 0;
            $rate = optional($user->TutorDetails)->hourly_rate ?? 0;
            return $sum + ($duration * $rate);
        }, 0);
        // Calculate available funds (completed bookings only)
        $availableFunds = $bookings->reduce(function ($sum, $b) use ($user) {
            $start = $b->scheduled_start instanceof \Carbon\Carbon ? $b->scheduled_start : \Carbon\Carbon::parse($b->scheduled_start);
            $stop = $b->scheduled_stop instanceof \Carbon\Carbon ? $b->scheduled_stop : \Carbon\Carbon::parse($b->scheduled_stop);
            $duration = $start && $stop ? $start->diffInHours($stop) : 0;
            $rate = optional($user->TutorDetails)->hourly_rate ?? 0;
            $completed = $b->completion_status ? true : false;
            return $sum + ($completed ? ($duration * $rate) : 0);
        }, 0);
        // Prepare data for frontend
        $bookingData = $bookings->map(function ($b) use ($user) {
            $start = $b->scheduled_start instanceof \Carbon\Carbon ? $b->scheduled_start : \Carbon\Carbon::parse($b->scheduled_start);
            $stop = $b->scheduled_stop instanceof \Carbon\Carbon ? $b->scheduled_stop : \Carbon\Carbon::parse($b->scheduled_stop);
            $duration = $start && $stop ? $start->diffInHours($stop) : 0;
            return [
                'id' => $b->id,
                'tutee_name' => optional($b->tutee)->name ?? '-',
                'unit_name' => optional($b->unit)->name ?? '-',
                'scheduled_start' => $start ? $start->format('Y-m-d H:i') : '-',
                'scheduled_stop' => $stop ? $stop->format('Y-m-d H:i') : '-',
                'duration' => $duration,
                'status' => $b->actual_stop ? 'Completed' : 'Upcoming',
                'amount' => optional($user->TutorDetails)->hourly_rate ? ($duration * $user->TutorDetails->hourly_rate) : 0,
                'created_at' => $b->created_at ? $b->created_at->toDateTimeString() : null,
            ];
        });
        return Inertia::render('Tutors/TutorBookings', [
            'auth' => ['user' => $user],
            'bookings' => $bookingData,
            'totalRevenue' => $totalRevenue,
            'availableFunds' => $availableFunds,
        ]);
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
