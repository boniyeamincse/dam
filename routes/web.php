<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DomainsController;
use App\Http\Controllers\RoutersController;
use App\Http\Controllers\SwitchesController;
use App\Http\Controllers\ServersController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn() => redirect('/dashboard'));

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/domains', [DomainsController::class, 'index'])->name('domains');
    Route::get('/routers', [RoutersController::class, 'index'])->name('routers');
    Route::get('/switches', [SwitchesController::class, 'index'])->name('switches');
    Route::get('/servers', [ServersController::class, 'index'])->name('servers');
    Route::get('/settings', [SettingsController::class, 'index'])
        ->middleware('role:Org Admin')
        ->name('settings');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
