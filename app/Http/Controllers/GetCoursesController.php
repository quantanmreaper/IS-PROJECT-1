<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class GetCoursesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = Course::with('seller')
            ->select('id', 'user_id', 'title', 'description', 'thumbnail', 'price', 'status', 'created_at')
            ->where('status', 'published')
            ->get()
            ->map(function ($course) {
                // Check if thumbnail is just a filename or already a full URL
                if ($course->thumbnail && !filter_var($course->thumbnail, FILTER_VALIDATE_URL)) {
                    // If it's not a URL, prepend the storage path
                    $course->thumbnail = asset('storage/' . $course->thumbnail);
                }
                return $course;
            });
        
        return Inertia::render('Courses/AllCourses', [
            'courses' => $courses
        ]);
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
        $course = Course::with(['seller', 'sections.lessons', 'reviews.user'])
            ->findOrFail($id);
            
        // Check if the course is published
        if ($course->status !== 'published') {
            abort(403, 'This course is not available for viewing.');
        }
            
        // Check if the current user has purchased this course with "paid" status
        $isEnrolled = false;
        if (Auth::check()) {
            $isEnrolled = $course->hasPurchased(Auth::id());
        }
            
        // Format the thumbnail URL if needed
        if ($course->thumbnail && !filter_var($course->thumbnail, FILTER_VALIDATE_URL)) {
            $course->thumbnail = asset('storage/' . $course->thumbnail);
        }
            
        return Inertia::render('Courses/ViewCourse', [
            'course' => $course,
            'isEnrolled' => $isEnrolled
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
    
    /**
     * Display the dashboard with random courses
     */
    public function dashboard()
    {
        $randomCourses = $this->getRandomForDashboard();
        
        return Inertia::render('Dashboard', [
            'user' => Auth::user(),
            'randomCourses' => $randomCourses
        ]);
    }
    
    /**
     * Get random courses for dashboard
     */
    public function getRandomForDashboard()
    {
        $randomCourses = Course::with('seller')
            ->select('id', 'user_id', 'title', 'description', 'thumbnail', 'price', 'status')
            ->where('status', 'published')
            ->inRandomOrder()
            ->limit(5)
            ->get()
            ->map(function ($course) {
                // Check if thumbnail is just a filename or already a full URL
                if ($course->thumbnail && !filter_var($course->thumbnail, FILTER_VALIDATE_URL)) {
                    // If it's not a URL, prepend the storage path
                    $course->thumbnail = asset('storage/' . $course->thumbnail);
                }
                return $course;
            });
            
        return $randomCourses;
    }
}
