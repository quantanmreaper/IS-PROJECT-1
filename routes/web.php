<?php

use App\Http\Controllers\MessageController;
use App\Http\Controllers\Auth\TutorRegistrationController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\TutionRequestsController;
use App\Http\Controllers\GetTutoredController;
use App\Http\Controllers\GetMentoredController;
use App\Http\Controllers\MentorDetailsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TutorBookingController;
use App\Http\Controllers\TutorDetailsController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\LessonsController;
//use App\Models\Course;
use App\Http\Controllers\CourseRegistrationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;
use App\Http\Controllers\GetCoursesController;
use App\Http\Controllers\CourseReviewController;
use App\Http\Controllers\CoursePurchaseController;
use App\Http\Controllers\AdminReportController;

// Add this line to register broadcasting routes with web middleware
//Broadcast::routes(['middleware' => ['web', 'auth']]);

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [GetCoursesController::class, 'dashboard'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::resource('tutorRegistration', TutorDetailsController::class)
    ->middleware(['auth', 'verified'])
    ->parameters(['tutorRegistration' => 'tutor'])
    ->names('tutorRegistration');

Route::resource('getTutored', GetTutoredController::class)
    ->middleware(['auth', 'verified'])
    ->parameters(['getTutored' => 'tutor'])
    ->names('getTutored');

Route::resource('getMentored', GetMentoredController::class)
    ->middleware(['auth', 'verified'])
    ->parameters(['getMentored' => 'mentor'])
    ->names('getMentored');

Route::resource('units', UnitController::class)
    ->middleware(['auth', 'verified'])
    ->parameters(['units' => 'unit'])
    ->names('units');

// Group all custom and resource routes for TutorBookingController under a prefix and shared middleware
Route::prefix('bookTutor')->middleware(['auth', 'verified'])->group(function () {
    // Custom route for booking a tutor session (create form)
    Route::get('create/{tutor}', [TutorBookingController::class, 'create'])
        ->name('bookTutor.create');

    // Custom POST route for booking a tutor session (store)
    Route::post('{tutor}', [TutorBookingController::class, 'store'])
        ->name('bookTutor.store');

    // Custom route for viewing booked sessions
    Route::get('booked/{tutor}', [TutorBookingController::class, 'index'])
        ->name('bookTutor.index');

    Route::resource('/', TutorBookingController::class)
        ->parameters(['' => 'tutor'])
        ->names('bookTutor')
        ->except(['create', 'store', 'index']);
});

Route::resource('tutionRequests', TutionRequestsController::class)
    ->middleware(['auth', 'verified'])
    ->parameters(['tutionRequests' => 'tutingSession'])
    ->names('tutionRequests');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //Mentor Registration
    Route::get('/MentorRegistration', [MentorDetailsController::class, 'create'])->name('MentorRegistration');
    Route::post('/MentorRegistration', [MentorDetailsController::class, 'store'])->name('MentorRegistration.store');



    Route::get('/CourseRegistration', [CourseRegistrationController::class, 'create'])->name('CourseRegistration');
    Route::post('/CourseRegistration', [CourseRegistrationController::class, 'store'])->name('CourseRegistration');
});

//chatting with mentors
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/chat/{user}', [MessageController::class, 'index'])->name('chat.show');
    Route::get('/chats', [ChatController::class, 'index'])->name('chats.conversations');

    Route::get('/messages/{user}', [MessageController::class, 'getMessages']);
    Route::post('/messages/{user}', [MessageController::class, 'sendMessage']);
    Route::post('/messages/{user}/mark-read', [MessageController::class, 'markAsRead']);

    Route::get('/courses/lessons', [LessonsController::class, 'create'])->name('lessons.create');
    Route::get('/courses/{course}/lessons', [LessonsController::class, 'create'])->name('lessons.create.with.course');
    Route::post('/lessons', [LessonsController::class, 'store'])->name('lessons.store');
    Route::post('/course-sections', [LessonsController::class, 'createSection'])->name('course-sections.store');

    // All courses route
    Route::get('/courses', [GetCoursesController::class, 'index'])->name('courses.all');

    // View single course route
    Route::get('/courses/{course}', [GetCoursesController::class, 'show'])->name('courses.show');

    // Course reviews routes
    Route::post('/courses/{course}/reviews', [CourseReviewController::class, 'store'])->name('course.reviews.store');
    Route::delete('/courses/{course}/reviews/{review}', [CourseReviewController::class, 'destroy'])->name('course.reviews.destroy');

    // Course payment routes
    Route::match(['get', 'post'], '/courses/{course}/purchase', [CoursePurchaseController::class, 'purchase'])->name('courses.purchase');
    Route::post('/courses/{course}/purchase/confirm', [CoursePurchaseController::class, 'confirm'])->name('courses.purchase.confirm');
    Route::get('/courses/{course}/payment-callback', [CoursePurchaseController::class, 'callback'])->name('courses.payment.callback');

    // Admin Reports Routes
    Route::get('/admin/reports', [AdminReportController::class, 'index'])->name('admin.reports');
    Route::post('/admin/reports/preview', [AdminReportController::class, 'preview'])->name('admin.reports.preview');
    Route::post('/admin/reports/download', [AdminReportController::class, 'download'])->name('admin.reports.download');
    Route::get('/admin/reports/chart-data', [AdminReportController::class, 'getChartData'])->name('admin.reports.chart-data');

    // Units Addition routes
    Route::get('UnitsAddition', [UnitController::class, 'create'])->name('UnitsAddition');
    Route::post('UnitsAddition', [UnitController::class, 'store'])->name('UnitsAddition.store');

});

// Payment callback route after IntaSend checkout
Route::get('/bookTutor/thank-you', function () {
    return Inertia::render('TutorBooking/Booked'); // or your custom thank you/confirmation page
})->name('payment.callback');

Route::post('bookTutor/{session}/payment/confirm', [TutorBookingController::class, 'confirmPayment'])->name('bookTutor.payment.confirm');



require __DIR__ . '/auth.php';
