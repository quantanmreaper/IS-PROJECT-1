<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CoursePurchase;
use App\Models\TutingSession;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

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
        $user = Auth::user();
        $metrics = [];

        if ($user->user_type === 'standard user') {
            // Learner metrics (all users)
            $metrics['learner'] = [
                'total_courses_enrolled' => CoursePurchase::where('user_id', $user->id)->count(),
                'total_sessions_booked' => TutingSession::where('tutee_id', $user->id)->count(),
                'total_reviews_written' => method_exists($user, 'reviews') ? $user->reviews()->count() : 0,
            ];

            // Tutor metrics
            if ($user->is_tutor) {
                $sessions = TutingSession::where('tutor_id', $user->id)->get();
                $hourlyRate = optional($user->TutorDetails)->hourly_rate;
                $hourlyRate = is_numeric($hourlyRate) ? $hourlyRate : 0;
                $totalEarnings = 0;
                foreach ($sessions as $session) {
                    if ($session->scheduled_start && $session->scheduled_stop) {
                        try {
                            $start = $session->scheduled_start instanceof \DateTimeInterface ? $session->scheduled_start : Carbon::parse($session->scheduled_start);
                            $stop = $session->scheduled_stop instanceof \DateTimeInterface ? $session->scheduled_stop : Carbon::parse($session->scheduled_stop);
                            $hours = $stop->greaterThan($start) ? $stop->diffInHours($start) : 0;
                            if ($hours > 0) {
                                $totalEarnings += $hourlyRate * $hours;
                            }
                        } catch (\Exception $e) {
                            // skip invalid datetimes
                        }
                    }
                }
                $metrics['tutor'] = [
                    'total_sessions_hosted' => $sessions->count(),
                    'total_earnings' => round($totalEarnings, 2),
                    'total_courses_created' => method_exists($user, 'soldCourses') ? $user->soldCourses()->count() : 0,
                ];
            }

            // Admin metrics
            if ($user->user_type === 'admin') {
                $metrics['admin'] = [
                    'total_users' => User::count(),
                    'total_courses' => \App\Models\Course::count(),
                    'total_sessions' => TutingSession::count(),
                ];
            }
        }

        return Inertia::render('Dashboard', [
            'user' => $user,
            'randomCourses' => $randomCourses,
            'metrics' => $metrics,
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
