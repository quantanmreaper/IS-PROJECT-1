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
    public function index()
    {
        $mentors = User::where('is_mentor', true)
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
                    'bio' => $mentor->bio ?? '',
                    'pfp' => $mentor->pfp ?? null,
                    // Add more mentor-specific fields as needed
                ];
            });

        return Inertia::render('Auth/MentorsList', ['mentors' => $mentors]);
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
