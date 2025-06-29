<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseSection;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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
        try {
            // Log the incoming request data to see what's being sent
            Log::info('Lesson store request data:', $request->all());
            
            $validationRules = [
                'course_section_id' => 'required|exists:course_sections,id',
                'title' => 'required|string|max:255',
                'content_type' => 'required|in:video,pdf,text,quiz',
                'order' => 'required|integer|min:1',
            ];
            
            // Add conditional validation rules based on content type
            if ($request->content_type === 'video') {
                $validationRules['video_path'] = 'required|string|url';
                $validationRules['content'] = 'nullable|string'; // Make content optional for videos
            } else {
                $validationRules['content'] = 'required|string';
                $validationRules['video_path'] = 'nullable';
            }
            
            // Log the validation rules we're using
            Log::info('Validation rules:', $validationRules);
            
            $validated = $request->validate($validationRules);

            // Verify the section belongs to a course owned by the authenticated user
            $section = CourseSection::findOrFail($validated['course_section_id']);
            $course = Course::where('id', $section->course_id)
                ->where('user_id', Auth::id())
                ->firstOrFail();

            // Create the lesson
            $lesson = Lesson::create($validated);

            return redirect()->route('courses.show', $course->id)
                ->with('success', 'Lesson added successfully!');
        } catch (\Exception $e) {
            Log::error('Error storing lesson: ' . $e->getMessage());
            return redirect()->back()->withErrors([
                'error' => 'An error occurred while creating the lesson: ' . $e->getMessage()
            ]);
        }
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

        return redirect()->route('lessons.create.with.course', $course->id)
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
