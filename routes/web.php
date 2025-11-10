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

    Route::prefix('vendors')->group(function () {
        Route::get('/', [App\Http\Controllers\VendorsController::class, 'index'])->name('vendors.index');
        Route::get('/create', [App\Http\Controllers\VendorsController::class, 'create'])->name('vendors.create');
        Route::post('/', [App\Http\Controllers\VendorsController::class, 'store'])->name('vendors.store');
        Route::get('/{vendor}', [App\Http\Controllers\VendorsController::class, 'show'])->name('vendors.show');
        Route::get('/{vendor}/edit', [App\Http\Controllers\VendorsController::class, 'edit'])->name('vendors.edit');
        Route::put('/{vendor}', [App\Http\Controllers\VendorsController::class, 'update'])->name('vendors.update');
        Route::delete('/{vendor}', [App\Http\Controllers\VendorsController::class, 'destroy'])->name('vendors.destroy');

        Route::get('/{vendor}/contracts', [App\Http\Controllers\VendorContractsController::class, 'index'])->name('vendors.contracts.index');
        Route::get('/{vendor}/contracts/create', [App\Http\Controllers\VendorContractsController::class, 'create'])->name('vendors.contracts.create');
        Route::post('/{vendor}/contracts', [App\Http\Controllers\VendorContractsController::class, 'store'])->name('vendors.contracts.store');
        Route::get('/{vendor}/contracts/{contract}/edit', [App\Http\Controllers\VendorContractsController::class, 'edit'])->name('vendors.contracts.edit');
        Route::put('/{vendor}/contracts/{contract}', [App\Http\Controllers\VendorContractsController::class, 'update'])->name('vendors.contracts.update');
        Route::delete('/{vendor}/contracts/{contract}', [App\Http\Controllers\VendorContractsController::class, 'destroy'])->name('vendors.contracts.destroy');

        Route::get('/{vendor}/documents', [App\Http\Controllers\VendorDocumentsController::class, 'index'])->name('vendors.documents.index');
        Route::post('/{vendor}/documents', [App\Http\Controllers\VendorDocumentsController::class, 'store'])->name('vendors.documents.store');
        Route::delete('/{vendor}/documents/{doc}', [App\Http\Controllers\VendorDocumentsController::class, 'destroy'])->name('vendors.documents.destroy');
        Route::get('/documents/{doc}/download', [App\Http\Controllers\VendorDocumentsController::class, 'download'])->name('vendors.documents.download');

        Route::get('/contracts', [App\Http\Controllers\VendorContractsController::class, 'globalIndex'])->name('vendors.contracts.global');
        Route::get('/documents', [App\Http\Controllers\VendorDocumentsController::class, 'globalIndex'])->name('vendors.documents.global');
        Route::get('/report', [App\Http\Controllers\VendorReportsController::class, 'index'])->name('vendors.report');
        Route::get('/report/export', [App\Http\Controllers\VendorReportsController::class, 'exportCsv'])->name('vendors.report.export');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
