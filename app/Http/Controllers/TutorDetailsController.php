<?php

namespace App\Http\Controllers;

use App\Models\TutorDetails;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Unit;
use Illuminate\Support\Facades\Auth;
use App\Models\TutorUnit;
use App\Models\User;
use Inertia\Response;
use App\Mail\WelcomeTutor;
use Illuminate\Support\Facades\Mail;
use App\Models\Review;

class TutorDetailsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return redirect()->route('TutorRegistration.create');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $units = Unit::select('id', 'name')->get();
        return Inertia::render('Tutors/TutorRegistration', ['units' => $units]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'progress_report' => 'required|file|mimes:pdf|max:2048',
            'hourly_rate' => 'required|numeric|min:100',
            'units' => 'required|array|min:1',
            'units.*' => 'exists:units,id',
            'available_from' => 'required|date_format:H:i',
            'available_until' => 'required|date_format:H:i|after:available_from',
        ]);

        $progressReportPath = $request->file('progress_report')->store('progress_reports', 'public');

        TutorDetails::create([
            'tutor_id' => Auth::id(),
            'progress_report' => $progressReportPath,
            'approval_status' => true,
            'hourly_rate' => $request->hourly_rate,
            'availability_start' => $request->available_from,
            'availability_stop' => $request->available_until,
        ]);

        foreach ($request->units as $unitId) {
            TutorUnit::create([
                'tutor_id' => Auth::id(),
                'unit_id' => $unitId,
                'proficiency_level' => 2,
            ]);
        }

        $user = User::find(Auth::id());
        $user->is_tutor = true;
        $user->save();

        // Send welcome email
        Mail::to($user->email)->send(new WelcomeTutor($user));

        return redirect()->route('dashboard')->with('success', 'Tutor registration successful. Your details are under review.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $tutor = User::with(['tutorDetails', 'tutorUnits.unit'])
            ->where('id', $id)
            ->first();

        // Get reviews for this tutor through tutor sessions
        $reviews = Review::whereHas('tutingSession', function ($query) use ($id) {
            $query->where('tutor_id', $id);
        })
            ->with('reviewer:id,name') // Include reviewer info
            ->get();

        // Calculate average rating
        $averageRating = null;
        if ($reviews->count() > 0) {
            $averageRating = round($reviews->avg('rating'), 1);
        }

        // Format tutor data
        $formattedTutor = [
            'id' => $tutor->id,
            'name' => $tutor->name,
            'pfp' => $tutor->tutorDetails->pfp ?? null,
            'bio' => $tutor->tutorDetails->bio ?? null,
            'hourly_rate' => $tutor->tutorDetails->hourly_rate ?? null,
            'availability_start' => $tutor->tutorDetails->availability_start ?? null,
            'availability_stop' => $tutor->tutorDetails->availability_stop ?? null,
            'units' => $tutor->tutorUnits->map(function ($tutorUnit) {
                return $tutorUnit->unit->name;
            }),
            'reviews' => $reviews,
            'average_rating' => $averageRating,
            'reviews_count' => $reviews->count(),
        ];

        return Inertia::render('Tutors/TutorShow', [
            'tutor' => $formattedTutor
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TutorDetails $tutorDetails)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TutorDetails $tutorDetails)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TutorDetails $tutorDetails)
    {
        //
    }
}
