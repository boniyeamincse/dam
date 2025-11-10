<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DomainController;
use App\Http\Controllers\DomainsController;
use App\Http\Controllers\RoutersController;
use App\Http\Controllers\ServersController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SwitchesController;
use App\Http\Controllers\SwitchReportsController;
use App\Http\Controllers\SwitchImportController;
use App\Http\Controllers\SwitchHealthController;
use App\Http\Controllers\SwitchPortsController;
use App\Http\Controllers\SwitchConfigsController;
use App\Http\Controllers\SwitchAuditController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn() => redirect('/login'));

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('domains')->group(function () {
        Route::get('/', [DomainController::class, 'index'])->name('domains.index');
        Route::get('/report', [DomainController::class, 'report'])->name('domains.report');
        Route::get('/report/download', [DomainController::class, 'downloadReport'])->name('domains.report.download');
        Route::get('/create', [DomainController::class, 'create'])->name('domains.create');
        Route::post('/', [DomainController::class, 'store'])->name('domains.store');
        Route::get('/{domain}/edit', [DomainController::class, 'edit'])->name('domains.edit');
        Route::put('/{domain}', [DomainController::class, 'update'])->name('domains.update');
        Route::delete('/{domain}', [DomainController::class, 'destroy'])->name('domains.destroy');
    });

    Route::prefix('routers')->group(function () {
        Route::get('/', [RoutersController::class, 'index'])->name('routers.index');
        Route::get('/create', [RoutersController::class, 'create'])->name('routers.create');
        Route::post('/', [RoutersController::class, 'store'])->name('routers.store');
        Route::get('/{router}', [RoutersController::class, 'show'])->name('routers.show');
        Route::get('/{router}/edit', [RoutersController::class, 'edit'])->name('routers.edit');
        Route::put('/{router}', [RoutersController::class, 'update'])->name('routers.update');
        Route::delete('/{router}', [RoutersController::class, 'destroy'])->name('routers.destroy');
        Route::get('/report', [RoutersController::class, 'report'])->name('routers.report');
        Route::get('/{router}/health', [RoutersController::class, 'health'])->name('routers.health');
        Route::post('/{router}/duplicate', [RoutersController::class, 'duplicate'])->name('routers.duplicate');
        Route::post('/{router}/retire', [RoutersController::class, 'retire'])->name('routers.retire');
        Route::get('/export/csv', [RoutersController::class, 'export'])->name('routers.export');
        // Placeholder routes for future features
        Route::get('/{router}/interfaces', function () { abort(404, 'Coming soon'); })->name('routers.interfaces');
        Route::get('/{router}/vlans', function () { abort(404, 'Coming soon'); })->name('routers.vlans');
        Route::get('/{router}/neighbors', function () { abort(404, 'Coming soon'); })->name('routers.neighbors');
        Route::get('/{router}/configs', function () { abort(404, 'Coming soon'); })->name('routers.configs');
    });
    Route::prefix('switches')->group(function () {
        Route::get('/', [SwitchesController::class, 'index'])->name('switches.index');
        Route::get('/create', [SwitchesController::class, 'create'])->name('switches.create');
        Route::post('/', [SwitchesController::class, 'store'])->name('switches.store');
        Route::get('/{asset}', [SwitchesController::class, 'show'])->name('switches.show');
        Route::get('/{asset}/edit', [SwitchesController::class, 'edit'])->name('switches.edit');
        Route::put('/{asset}', [SwitchesController::class, 'update'])->name('switches.update');
        Route::delete('/{asset}', [SwitchesController::class, 'destroy'])->name('switches.destroy');

        Route::get('/report', [SwitchReportsController::class, 'index'])->name('switches.report');
        Route::get('/report/export', [SwitchReportsController::class, 'exportCsv'])->name('switches.report.export');

        Route::get('/import', [SwitchImportController::class, 'showForm'])->name('switches.import');
        Route::post('/import', [SwitchImportController::class, 'importCsv'])->name('switches.import.post');
        Route::get('/template', [SwitchImportController::class, 'templateCsv'])->name('switches.template');

        Route::get('/health', [SwitchHealthController::class, 'index'])->name('switches.health');
        Route::get('/ports', [SwitchPortsController::class, 'index'])->name('switches.ports');
        Route::get('/configs', [SwitchConfigsController::class, 'index'])->name('switches.configs');
        Route::get('/audit', [SwitchAuditController::class, 'index'])->name('switches.audit');
    });
    Route::get('/servers', [ServersController::class, 'index'])->name('servers');
    Route::get('/settings', [SettingsController::class, 'index'])
        ->middleware('role:Org Admin')
        ->name('settings');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
