<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;


class GetMentoredController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $currentUserId = $request->user()?->id;
        $mentors = User::where('is_mentor', true)
            ->whereHas('mentorDetails')
            ->when($currentUserId, function ($query, $currentUserId) {
                $query->where('id', '!=', $currentUserId);
            })
            ->with(['mentorDetails'])
            ->get()
            ->map(function ($mentor) {
                $details = $mentor->mentorDetails;
                if ($details instanceof \Illuminate\Database\Eloquent\Collection) {
                    $details = $details->first();
                }
                return [
                    'id' => $mentor->id,
                    'name' => $mentor->name,
                    'pfp' => $mentor->pfp ?? null,
                    'year_of_study' => $details?->year_of_study ?? 'N/A',
                    'course' => $details?->course ?? '',
                    'skills' => is_array($details?->skills) ? implode(',', $details->skills) : ($details?->skills ?? ''),
                    'hobbies' => is_array($details?->hobbies) ? implode(',', $details->hobbies) : ($details?->hobbies ?? ''),
                ];
            })
            ->values();

        return Inertia::render('Mentors/MentorList', ['mentors' => $mentors]);
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
        $mentor = User::where('is_mentor', true)
            ->with(['mentorDetails'])
            ->findOrFail($id);

        $details = $mentor->mentorDetails;
        if ($details instanceof \Illuminate\Database\Eloquent\Collection) {
            $details = $details->first();
        }

        $mentorData = [
            'id' => $mentor->id,
            'name' => $mentor->name,
            'bio' => $mentor->bio ?? '',
            'pfp' => $mentor->pfp ?? null,
            'year_of_study' => $details?->year_of_study ?? null,
            'course' => $details?->course ?? '',
            'skills' => is_array($details?->skills) ? implode(',', $details->skills) : ($details?->skills ?? ''),
            'hobbies' => is_array($details?->hobbies) ? implode(',', $details->hobbies) : ($details?->hobbies ?? ''),
            'work_experience' => $details?->work_experience ?? '',
        ];

        return Inertia::render('Mentors/MentorShow', ['mentor' => $mentorData]);
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
