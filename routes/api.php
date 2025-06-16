<?php

use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/messages/{user}', [MessageController::class, 'getMessages']);
    Route::post('/messages/{user}', [MessageController::class, 'sendMessage']);
});
