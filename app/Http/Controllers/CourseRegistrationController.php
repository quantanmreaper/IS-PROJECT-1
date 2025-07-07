<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class CourseRegistrationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new course.
     */
    public function create()
    {
        return Inertia::render('Courses/CourseRegistration');
    }

    /**
     * Store a newly created course in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'thumbnail' => 'nullable|image|max:2048', // 2MB max
            'price' => 'required|numeric|min:0',
            'status' => 'required|in:draft,published,archived',
        ]);

        // Handle thumbnail upload if provided
        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $request->file('thumbnail')->store('course-thumbnails', 'public');
            $validated['thumbnail'] = $thumbnailPath;
        }

        // Add user_id to the validated data
        $validated['user_id'] = Auth::id();

        // Create the course
        $course = Course::create($validated);

        return redirect()->route('dashboard', $course->id)
            ->with('success', 'Course registered successfully!');
    }

    /**
     * Publish a course by changing its status to 'published'
     */
    public function publish(Course $course)
    {
        // Check if the current user is the owner of the course
        if (Auth::id() !== $course->user_id) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to publish this course.'
            ], 403);
        }

        // Check if the course is in draft status
        if ($course->status !== 'draft') {
            return response()->json([
                'success' => false,
                'message' => 'Only draft courses can be published.'
            ], 400);
        }

        // Update the course status to published
        $course->status = 'published';
        $course->save();

        return response()->json([
            'success' => true,
            'message' => 'Course published successfully!',
            'course' => $course
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
