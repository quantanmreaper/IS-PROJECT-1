<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\TutorDetails;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Review;

use function Termwind\render;

class GetTutoredController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tutors = User::where('is_tutor', true)
            ->whereHas('tutorDetails')
            ->where('id', '!=', optional(Auth::user())->id)
            ->with(['tutorDetails', 'units'])
            ->get()
            ->map(function ($tutor) {
                $details = $tutor->tutorDetails;
                if ($details instanceof \Illuminate\Database\Eloquent\Collection) {
                    $details = $details->first();
                }
                return [
                    'id' => $tutor->id,
                    'name' => $tutor->name,
                    'pfp' => $tutor->pfp ?? null,
                    'hourly_rate' => $details->hourly_rate ?? null,
                    'units' => $tutor->units->map(function ($unit) {
                        return [
                            'id' => $unit->id,
                            'name' => $unit->name,
                            'proficiency_level' => $unit->pivot->proficiency_level ?? null,
                        ];
                    })->toArray(),
                ];
            });

        return Inertia::render('Tutors/TutorsList', ['tutors' => $tutors]);
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
    public function show(string $id)
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
            'pfp' => $tutor->pfp ?? null,
            'bio' => $tutor->bio ?? '',
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
