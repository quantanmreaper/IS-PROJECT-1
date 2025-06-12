<?php

use App\Http\Controllers\Auth\TutorRegistrationController;
use App\Http\Controllers\GetTutoredController;
use App\Http\Controllers\GetMentoredController;
use App\Http\Controllers\MentorDetailsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TutorDetailsController;
use App\Http\Controllers\UnitController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //Mentor Registration
    Route::get('/MentorRegistration', [MentorDetailsController::class, 'create'])->name('MentorRegistration');
    Route::post('/MentorRegistration', [MentorDetailsController::class, 'store'])->name('MentorRegistration.store');
});




require __DIR__ . '/auth.php';
