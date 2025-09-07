<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BukuController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KategoriController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::get('/check-auth', [AuthController::class, 'checkAuth']);

// Protected routes
Route::middleware(['auth:admin'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Books CRUD
    Route::apiResource('books', BukuController::class);

    // Categories
    Route::get('/categories', [KategoriController::class, 'index']);
});
