<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DomainController;
use App\Http\Controllers\DomainsController;
use App\Http\Controllers\RoutersController;
use App\Http\Controllers\CamerasController;
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

Route::get('/', function () {
    return auth()->check() ? redirect('/dashboard') : redirect('/login');
});

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
    // Servers
    Route::prefix('servers')->group(function () {
        Route::get('/', [ServersController::class, 'index'])->name('servers.index');
        Route::get('/create', [ServersController::class, 'create'])->name('servers.create');
        Route::post('/', [ServersController::class, 'store'])->name('servers.store');
        Route::get('/{server}', [ServersController::class, 'show'])->name('servers.show');
        Route::get('/{server}/edit', [ServersController::class, 'edit'])->name('servers.edit');
        Route::put('/{server}', [ServersController::class, 'update'])->name('servers.update');
        Route::delete('/{server}', [ServersController::class, 'destroy'])->name('servers.destroy');
        Route::get('/health', [ServersController::class, 'health'])->name('servers.health');
        Route::get('/report', [ServersController::class, 'report'])->name('servers.report');
        Route::get('/export/csv', [ServersController::class, 'export'])->name('servers.export');
        Route::get('/import', [ServersController::class, 'import'])->name('servers.import');
        Route::post('/import', [ServersController::class, 'importCsv'])->name('servers.import.post');
    });

    // Cameras
    Route::prefix('cameras')->group(function () {
        Route::get('/', [CamerasController::class, 'index'])->name('cameras.index');
        Route::get('/create', [CamerasController::class, 'create'])->name('cameras.create');
        Route::post('/', [CamerasController::class, 'store'])->name('cameras.store');
        Route::get('/{camera}', [CamerasController::class, 'show'])->name('cameras.show');
        Route::get('/{camera}/edit', [CamerasController::class, 'edit'])->name('cameras.edit');
        Route::put('/{camera}', [CamerasController::class, 'update'])->name('cameras.update');
        Route::delete('/{camera}', [CamerasController::class, 'destroy'])->name('cameras.destroy');
        Route::get('/report', [CamerasController::class, 'report'])->name('cameras.report');
        Route::get('/{camera}/health', [CamerasController::class, 'health'])->name('cameras.health');
        Route::post('/{camera}/duplicate', [CamerasController::class, 'duplicate'])->name('cameras.duplicate');
        Route::post('/{camera}/retire', [CamerasController::class, 'retire'])->name('cameras.retire');
        Route::get('/export/csv', [CamerasController::class, 'export'])->name('cameras.export');
        // Placeholder routes for future features
        Route::get('/{camera}/interfaces', function () { abort(404, 'Coming soon'); })->name('cameras.interfaces');
        Route::get('/{camera}/vlans', function () { abort(404, 'Coming soon'); })->name('cameras.vlans');
        Route::get('/{camera}/neighbors', function () { abort(404, 'Coming soon'); })->name('cameras.neighbors');
        Route::get('/{camera}/configs', function () { abort(404, 'Coming soon'); })->name('cameras.configs');
    });

    // Licenses
    Route::prefix('licenses')->group(function () {
        Route::get('/', [App\Http\Controllers\LicenseController::class, 'index'])->name('licenses.index');
        Route::get('/create', [App\Http\Controllers\LicenseController::class, 'create'])->name('licenses.create');
        Route::post('/', [App\Http\Controllers\LicenseController::class, 'store'])->name('licenses.store');
        Route::get('/{license}', [App\Http\Controllers\LicenseController::class, 'show'])->name('licenses.show');
        Route::get('/{license}/edit', [App\Http\Controllers\LicenseController::class, 'edit'])->name('licenses.edit');
        Route::put('/{license}', [App\Http\Controllers\LicenseController::class, 'update'])->name('licenses.update');
        Route::delete('/{license}', [App\Http\Controllers\LicenseController::class, 'destroy'])->name('licenses.destroy');
        Route::get('/inventory', [App\Http\Controllers\LicenseController::class, 'inventory'])->name('licenses.inventory');
        Route::get('/compliance', [App\Http\Controllers\LicenseController::class, 'compliance'])->name('licenses.compliance');
        Route::get('/calendar', [App\Http\Controllers\LicenseController::class, 'calendar'])->name('licenses.calendar');
        Route::get('/evidence', [App\Http\Controllers\LicenseController::class, 'evidence'])->name('licenses.evidence');
        Route::get('/vendors', [App\Http\Controllers\LicenseController::class, 'vendors'])->name('licenses.vendors');
        Route::get('/alerts', [App\Http\Controllers\LicenseController::class, 'alerts'])->name('licenses.alerts');
        Route::get('/report', [App\Http\Controllers\LicenseController::class, 'report'])->name('licenses.report');
        Route::get('/import', [App\Http\Controllers\LicenseController::class, 'import'])->name('licenses.import');
        Route::post('/import', [App\Http\Controllers\LicenseController::class, 'importCsv'])->name('licenses.import.post');
    });

    // Documents
    Route::prefix('documents')->group(function () {
        Route::get('/', [App\Http\Controllers\DocumentsController::class, 'index'])->name('documents.index');
        Route::get('/upload', [App\Http\Controllers\DocumentsController::class, 'upload'])->name('documents.upload');
        Route::post('/upload', [App\Http\Controllers\DocumentsController::class, 'store'])->name('documents.store');
        Route::get('/{document}/download', [App\Http\Controllers\DocumentsController::class, 'download'])->name('documents.download');
        Route::delete('/{document}', [App\Http\Controllers\DocumentsController::class, 'destroy'])->name('documents.destroy');
        Route::get('/assets', [App\Http\Controllers\DocumentsController::class, 'assets'])->name('documents.assets');
        Route::get('/vendors', [App\Http\Controllers\DocumentsController::class, 'vendors'])->name('documents.vendors');
        Route::get('/licenses', [App\Http\Controllers\DocumentsController::class, 'licenses'])->name('documents.licenses');
    });

    // Locations & Network
    Route::prefix('locations')->group(function () {
        Route::get('/', [App\Http\Controllers\LocationsController::class, 'index'])->name('locations.index');
        Route::get('/subnets', [App\Http\Controllers\LocationsController::class, 'subnets'])->name('locations.subnets');
        Route::get('/topology', [App\Http\Controllers\LocationsController::class, 'topology'])->name('locations.topology');
    });

    // Reports
    Route::prefix('reports')->group(function () {
        Route::get('/assets', [App\Http\Controllers\ReportsController::class, 'assets'])->name('reports.assets');
        Route::get('/compliance', [App\Http\Controllers\ReportsController::class, 'compliance'])->name('reports.compliance');
        Route::get('/expiries', [App\Http\Controllers\ReportsController::class, 'expiries'])->name('reports.expiries');
        Route::get('/exports', [App\Http\Controllers\ReportsController::class, 'exports'])->name('reports.exports');
    });

    // Alerts
    Route::prefix('alerts')->group(function () {
        Route::get('/', [App\Http\Controllers\AlertsController::class, 'index'])->name('alerts.index');
        Route::get('/schedules', [App\Http\Controllers\AlertsController::class, 'schedules'])->name('alerts.schedules');
        Route::post('/{alert}/acknowledge', [App\Http\Controllers\AlertsController::class, 'acknowledge'])->name('alerts.acknowledge');
        Route::post('/{alert}/close', [App\Http\Controllers\AlertsController::class, 'close'])->name('alerts.close');
    });

    // Settings (enhanced)
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings');
    Route::patch('/settings', [SettingsController::class, 'update'])->name('settings.update');
    Route::post('/settings/theme', [SettingsController::class, 'updateTheme'])->name('settings.theme');

    // Admin Settings (Org Admin only)
    Route::middleware('role:Org Admin')->group(function () {
        Route::get('/settings/users', [App\Http\Controllers\Settings\AdminSettingsController::class, 'users'])->name('settings.users');
        Route::get('/settings/branding', [App\Http\Controllers\Settings\AdminSettingsController::class, 'branding'])->name('settings.branding');
        Route::get('/settings/email', [App\Http\Controllers\Settings\AdminSettingsController::class, 'email'])->name('settings.email');
        Route::get('/settings/backup', [App\Http\Controllers\Settings\AdminSettingsController::class, 'backup'])->name('settings.backup');
        Route::get('/settings/audit', [App\Http\Controllers\Settings\AdminSettingsController::class, 'audit'])->name('settings.audit');
        Route::get('/settings/themes', [App\Http\Controllers\Settings\AdminSettingsController::class, 'themes'])->name('settings.themes');
        Route::get('/settings/api', [App\Http\Controllers\Settings\AdminSettingsController::class, 'api'])->name('settings.api');
        Route::get('/settings/about', [App\Http\Controllers\Settings\AdminSettingsController::class, 'about'])->name('settings.about');
    });

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
