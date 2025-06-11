<?php

use App\Http\Controllers\Auth\TutorRegistrationController;
use App\Http\Controllers\MentorDetailsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TutorDetailsController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\TutorDetailsController;
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

Route::resource('TutorRegistration', TutorDetailsController::class)
    ->middleware(['auth', 'verified'])
    ->parameters(['TutorRegistration' => 'tutor'])
    ->names('TutorRegistration');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/UnitsAddition', [UnitController::class, 'create'])->name('UnitsAddition');
    Route::post('/UnitsAddition', [UnitController::class, 'store'])->name('UnitsAddition.store');

    //Route::get('/TutorRegistration', [TutorRegistrationController::class, 'create'])->name('TutorRegistration');

    //Mentor Registration
    Route::get('/MentorRegistration', [MentorDetailsController::class, 'create'])->name('MentorRegistration');
    Route::post('/MentorRegistration', [MentorDetailsController::class, 'store'])->name('MentorRegistration.store');
});




require __DIR__ . '/auth.php';
