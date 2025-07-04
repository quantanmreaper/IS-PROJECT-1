<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\TutingSession;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AdminReportController extends Controller
{
    /**
     * Display report options page
     */
    public function index()
    {
        // Verify the user is an admin
        if (Auth::user()->user_type !== 'admin') {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Reports/Index', [
            'reportTypes' => [
                ['value' => 'users', 'label' => 'User Report'],
                ['value' => 'courses', 'label' => 'Course Report'],
                ['value' => 'sessions', 'label' => 'Session Report'],
                ['value' => 'summary', 'label' => 'Summary Report'],
            ]
        ]);
    }

    /**
     * Generate report preview
     */
    public function preview(Request $request)
    {
        // Verify the user is an admin
        if (Auth::user()->user_type !== 'admin') {
            abort(403, 'Unauthorized action.');
        }

        // Validate request
        $validated = $request->validate([
            'reportType' => 'required|string|in:users,courses,sessions,summary',
            'startDate' => 'nullable|date',
            'endDate' => 'nullable|date|after_or_equal:startDate',
        ]);

        // Set date range
        $startDate = $request->startDate ? Carbon::parse($request->startDate) : Carbon::now()->subMonths(1);
        $endDate = $request->endDate ? Carbon::parse($request->endDate) : Carbon::now();

        // Get report data based on type
        $reportData = $this->getReportData($validated['reportType'], $startDate, $endDate);

        return Inertia::render('Reports/Preview', [
            'reportType' => $validated['reportType'],
            'startDate' => $startDate->toDateString(),
            'endDate' => $endDate->toDateString(),
            'reportData' => $reportData,
        ]);
    }

    /**
     * Generate and download report
     */
    public function download(Request $request)
    {
        // Verify the user is an admin
        if (Auth::user()->user_type !== 'admin') {
            abort(403, 'Unauthorized action.');
        }

        // Validate request
        $validated = $request->validate([
            'reportType' => 'required|string|in:users,courses,sessions,summary',
            'format' => 'required|string|in:pdf,excel',
            'startDate' => 'nullable|date',
            'endDate' => 'nullable|date|after_or_equal:startDate',
        ]);

        // Set date range
        $startDate = $request->startDate ? Carbon::parse($request->startDate) : Carbon::now()->subMonths(1);
        $endDate = $request->endDate ? Carbon::parse($request->endDate) : Carbon::now();

        // Get report data
        $reportData = $this->getReportData($validated['reportType'], $startDate, $endDate);

        // Generate and download the report
        if ($validated['format'] === 'pdf') {
            return $this->downloadPdf($validated['reportType'], $reportData, $startDate, $endDate);
        } else {
            return $this->downloadExcel($validated['reportType'], $reportData, $startDate, $endDate);
        }
    }

    /**
     * Get report data based on type and date range
     */
    private function getReportData($reportType, $startDate, $endDate)
    {
        switch ($reportType) {
            case 'users':
                $users = User::with('TutorDetails', 'MentorDetails')
                    ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                        return $query->whereBetween('created_at', [$startDate, $endDate]);
                    })
                    ->get()
                    ->map(function ($user) {
                        return [
                            'id' => $user->id,
                            'name' => $user->name,
                            'email' => $user->email,
                            'user_type' => $user->user_type,
                            'is_tutor' => $user->is_tutor ? 'Yes' : 'No',
                            'is_mentor' => $user->is_mentor ? 'Yes' : 'No',
                            'created_at' => $user->created_at->format('Y-m-d'),
                        ];
                    })
                    ->toArray();

                return [
                    'title' => 'User Report',
                    'date_range' => $startDate->format('Y-m-d') . ' to ' . $endDate->format('Y-m-d'),
                    'total_count' => count($users),
                    'data' => $users,
                    'columns' => ['ID', 'Name', 'Email', 'User Type', 'Is Tutor', 'Is Mentor', 'Created At'],
                ];

            case 'courses':
                $courses = Course::with('seller')
                    ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                        return $query->whereBetween('created_at', [$startDate, $endDate]);
                    })
                    ->get()
                    ->map(function ($course) {
                        return [
                            'id' => $course->id,
                            'title' => $course->title,
                            'seller' => $course->seller->name,
                            'price' => $course->price,
                            'status' => $course->status,
                            'created_at' => $course->created_at->format('Y-m-d'),
                        ];
                    })
                    ->toArray();

                return [
                    'title' => 'Course Report',
                    'date_range' => $startDate->format('Y-m-d') . ' to ' . $endDate->format('Y-m-d'),
                    'total_count' => count($courses),
                    'data' => $courses,
                    'columns' => ['ID', 'Title', 'Seller', 'Price', 'Status', 'Created At'],
                ];

            case 'sessions':
                $sessions = TutingSession::with(['tutor', 'tutee'])
                    ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                        return $query->whereBetween('created_at', [$startDate, $endDate]);
                    })
                    ->get()
                    ->map(function ($session) {
                        return [
                            'id' => $session->id,
                            'tutor' => $session->tutor->name,
                            'tutee' => $session->tutee->name,
                            'scheduled_start' => $session->scheduled_start ? Carbon::parse($session->scheduled_start)->format('Y-m-d H:i') : 'N/A',
                            'scheduled_stop' => $session->scheduled_stop ? Carbon::parse($session->scheduled_stop)->format('Y-m-d H:i') : 'N/A',
                            'acceptance' => $session->acceptance,
                            'created_at' => $session->created_at->format('Y-m-d'),
                        ];
                    })
                    ->toArray();

                return [
                    'title' => 'Session Report',
                    'date_range' => $startDate->format('Y-m-d') . ' to ' . $endDate->format('Y-m-d'),
                    'total_count' => count($sessions),
                    'data' => $sessions,
                    'columns' => ['ID', 'Tutor', 'Tutee', 'Start Time', 'End Time', 'Status', 'Created At'],
                ];

            case 'summary':
                // Get summary statistics
                $newUsers = User::whereBetween('created_at', [$startDate, $endDate])->count();
                $newCourses = Course::whereBetween('created_at', [$startDate, $endDate])->count();
                $newSessions = TutingSession::whereBetween('created_at', [$startDate, $endDate])->count();
                
                // Get user type distribution
                $userTypes = User::selectRaw('user_type, count(*) as count')
                    ->groupBy('user_type')
                    ->get()
                    ->pluck('count', 'user_type')
                    ->toArray();

                // Get course status distribution
                $courseStatuses = Course::selectRaw('status, count(*) as count')
                    ->groupBy('status')
                    ->get()
                    ->pluck('count', 'status')
                    ->toArray();

                // Get session status distribution
                $sessionStatuses = TutingSession::selectRaw('acceptance, count(*) as count')
                    ->groupBy('acceptance')
                    ->get()
                    ->pluck('count', 'acceptance')
                    ->toArray();

                return [
                    'title' => 'Summary Report',
                    'date_range' => $startDate->format('Y-m-d') . ' to ' . $endDate->format('Y-m-d'),
                    'total_users' => User::count(),
                    'total_courses' => Course::count(),
                    'total_sessions' => TutingSession::count(),
                    'new_users' => $newUsers,
                    'new_courses' => $newCourses,
                    'new_sessions' => $newSessions,
                    'user_types' => $userTypes,
                    'course_statuses' => $courseStatuses,
                    'session_statuses' => $sessionStatuses,
                ];

            default:
                return [];
        }
    }

    /**
     * Generate and download PDF report
     */
    private function downloadPdf($reportType, $reportData, $startDate, $endDate)
    {
        $pdf = PDF::loadView('reports.pdf.' . $reportType, [
            'reportData' => $reportData,
            'startDate' => $startDate,
            'endDate' => $endDate
        ]);

        $filename = $reportType . '_report_' . date('Y-m-d') . '.pdf';
        return $pdf->download($filename);
    }

    /**
     * Generate and download Excel report
     */
    private function downloadExcel($reportType, $reportData, $startDate, $endDate)
    {
        // This will require Excel export classes to be created
        // For now, we'll return a simplified version
        $filename = $reportType . '_report_' . date('Y-m-d') . '.xlsx';
        
        // Simple array to Excel export
        return Excel::download(
            new \App\Exports\ReportExport($reportData),
            $filename
        );
    }

    /**
     * Get chart data for the admin dashboard
     */
    public function getChartData()
    {
        // Verify the user is an admin
        if (Auth::user()->user_type !== 'admin') {
            abort(403, 'Unauthorized action.');
        }

        // Get monthly user registrations for the last 6 months
        $monthlyUsers = $this->getMonthlyData(User::class);
        
        // Get monthly courses created for the last 6 months
        $monthlyCourses = $this->getMonthlyData(Course::class);
        
        // Get monthly sessions booked for the last 6 months
        $monthlySessions = $this->getMonthlyData(TutingSession::class);

        return response()->json([
            'monthlyUsers' => $monthlyUsers,
            'monthlyCourses' => $monthlyCourses,
            'monthlySessions' => $monthlySessions,
        ]);
    }

    /**
     * Helper to get monthly data for charts
     */
    private function getMonthlyData($model)
    {
        $monthlyData = [];
        $currentDate = Carbon::now();
        
        // Get data for the last 6 months
        for ($i = 5; $i >= 0; $i--) {
            $month = $currentDate->copy()->subMonths($i);
            $startOfMonth = $month->copy()->startOfMonth();
            $endOfMonth = $month->copy()->endOfMonth();
            
            $count = $model::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();
            
            $monthlyData[] = [
                'month' => $month->format('M Y'),
                'count' => $count,
            ];
        }
        
        return $monthlyData;
    }
} 