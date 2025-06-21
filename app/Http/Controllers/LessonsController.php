<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseSection;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class LessonsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new lesson.
     */
    public function create($courseId = null)
    {
        // Get all courses owned by the authenticated user for the dropdown
        $userCourses = Course::where('user_id', Auth::id())
            ->select('id', 'title')
            ->get();
            
        if ($courseId) {
        // Verify the course belongs to the authenticated user
        $course = Course::where('id', $courseId)
            ->where('user_id', Auth::id())
            ->with('sections')
            ->firstOrFail();
            
        return Inertia::render('Courses/Lessons', [
            'course' => $course,
                'sections' => $course->sections,
                'userCourses' => $userCourses
            ]);
        } else {
            // If no course ID is provided, just show the course selection UI
            return Inertia::render('Courses/Lessons', [
                'course' => null,
                'sections' => [],
                'userCourses' => $userCourses
        ]);
        }
    }

    /**
     * Store a newly created lesson in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_section_id' => 'required|exists:course_sections,id',
            'title' => 'required|string|max:255',
            'content_type' => 'required|in:video,pdf,text,quiz',
            'content' => 'required|string',
            'order' => 'required|integer|min:1',
            'video_path' => $request->content_type == 'video' ? 'required|file|mimes:mp4,webm,ogg|max:102400' : 'nullable',
        ]);

        // Verify the section belongs to a course owned by the authenticated user
        $section = CourseSection::findOrFail($validated['course_section_id']);
        $course = Course::where('id', $section->course_id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        // Handle video upload if provided
        if ($request->hasFile('video_path')) {
            $videoPath = $request->file('video_path')->store('lesson-videos', 'public');
            $validated['video_path'] = $videoPath;
        }

        // Create the lesson
        $lesson = Lesson::create($validated);

        return redirect()->route('dashboard', $course->id)
            ->with('success', 'Lesson added successfully!');
    }

    /**
     * Create a new course section.
     */
    public function createSection(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:255',
            'order' => 'required|integer|min:1',
        ]);

        // Verify the course belongs to the authenticated user
        $course = Course::where('id', $validated['course_id'])
            ->where('user_id', Auth::id())
            ->firstOrFail();

        // Create the section
        $section = CourseSection::create($validated);

        return redirect()->route('dashboard', $course->id)
            ->with('success', 'Section added successfully!');
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
