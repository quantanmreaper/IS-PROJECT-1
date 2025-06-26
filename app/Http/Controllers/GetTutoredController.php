<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\TutorDetails;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

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
        $tutor = User::where('is_tutor', true)
            ->whereHas('tutorDetails')
            ->with(['tutorDetails', 'units'])
            ->findOrFail($id);

        $details = $tutor->tutorDetails;
        if ($details instanceof \Illuminate\Database\Eloquent\Collection) {
            $details = $details->first();
        }

        $tutorData = [
            'id' => $tutor->id,
            'name' => $tutor->name,
            'bio' => $tutor->bio ?? '',
            'pfp' => $tutor->pfp ?? null,
            'hourly_rate' => $details->hourly_rate ?? null,
            'units' => $tutor->units->map(function ($unit) {
                return [
                    'name' => $unit->name,
                    'proficiency_level' => $unit->pivot->proficiency_level ?? null,
                ];
            })->toArray(),
            'availability_start' => $details->availability_start,
            'availability_stop' => $details->availability_stop,
        ];

        return Inertia::render('Tutors/TutorShow', ['tutor' => $tutorData]);
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
