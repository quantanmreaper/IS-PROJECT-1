<?php

use App\Http\Controllers\MessageController;
use App\Http\Controllers\Auth\TutorRegistrationController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\GetTutoredController;
use App\Http\Controllers\GetMentoredController;
use App\Http\Controllers\MentorDetailsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TutorBookingController;
use App\Http\Controllers\TutorDetailsController;
use App\Http\Controllers\UnitController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;

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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', ['user' => Auth::user(),]);
})->middleware(['auth', 'verified'])->name('dashboard');

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

// Custom route for booking a tutor session (create form)
Route::get('bookTutor/create/{tutor}', [TutorBookingController::class, 'create'])
    ->middleware(['auth', 'verified'])
    ->name('bookTutor.create');

Route::resource('bookTutor', TutorBookingController::class)
    ->middleware(['auth', 'verified'])
    ->parameters(['bookTutor' => 'tutor'])
    ->names('bookTutor')
    ->except(['create']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //Mentor Registration
    Route::get('/MentorRegistration', [MentorDetailsController::class, 'create'])->name('MentorRegistration');
    Route::post('/MentorRegistration', [MentorDetailsController::class, 'store'])->name('MentorRegistration.store');
  
    Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/chat/{user}', [MessageController::class, 'index'])->name('chat.show');
    Route::get('/chats', [ChatController::class, 'index'])->name('chats.conversations');

    });

    Route::middleware('auth')->group(function () {
    Route::get('/messages/{user}', [MessageController::class, 'getMessages']);
    Route::post('/messages/{user}', [MessageController::class, 'sendMessage']);
});

});




require __DIR__ . '/auth.php';
