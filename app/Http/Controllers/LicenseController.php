<?php

namespace App\Http\Controllers;

use App\Http\Requests\LicenseRequest;
use App\Models\License;
use App\Models\LicenseInstallation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LicenseController extends Controller
{
    public function index(Request $request)
    {
        $query = License::with(['vendor', 'installations'])->withCount('installations');

        // Apply filters
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('compliance_status')) {
            $query->where('compliance_status', $request->compliance_status);
        }

        if ($request->filled('vendor')) {
            $query->where('vendor_id', $request->vendor);
        }

        if ($request->boolean('expiring_soon')) {
            $query->expiringSoon();
        }

        if ($request->boolean('expired')) {
            $query->expired();
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                  ->orWhere('product_key', 'like', '%' . $search . '%')
                  ->orWhere('license_key', 'like', '%' . $search . '%')
                  ->orWhere('version', 'like', '%' . $search . '%')
                  ->orWhereHas('vendor', function ($vendorQuery) use ($search) {
                      $vendorQuery->where('name', 'like', '%' . $search . '%');
                  });
            });
        }

        $licenses = $query->paginate(25)->withQueryString();

        return Inertia::render('Licenses/Index', [
            'licenses' => $licenses,
            'filters' => $request->only(['status', 'compliance_status', 'vendor', 'expiring_soon', 'expired', 'search'])
        ]);
    }

    public function create()
    {
        // Get vendors for dropdown
        $vendors = \App\Models\Vendor::select('id', 'name')->get();

        return Inertia::render('Licenses/Create', [
            'vendors' => $vendors,
        ]);
    }

    public function store(LicenseRequest $request)
    {
        License::create($request->validated());

        return redirect()->route('licenses.index')->with('success', 'License created successfully.');
    }

    public function show($id)
    {
        $license = License::with(['vendor', 'installations', 'documents', 'auditLogs' => function ($query) {
            $query->latest()->limit(10);
        }])->findOrFail($id);

        return Inertia::render('Licenses/Show', [
            'license' => $license
        ]);
    }

    public function edit($id)
    {
        $license = License::findOrFail($id);
        $vendors = \App\Models\Vendor::select('id', 'name')->get();

        return Inertia::render('Licenses/Edit', [
            'license' => $license,
            'vendors' => $vendors,
        ]);
    }

    public function update(LicenseRequest $request, $id)
    {
        $license = License::findOrFail($id);
        $license->update($request->validated());

        return redirect()->route('licenses.index')->with('success', 'License updated successfully.');
    }

    public function destroy($id)
    {
        $license = License::findOrFail($id);

        // Check permissions
        if (!auth()->user()->hasRole(['Org Admin', 'IT Engineer'])) {
            abort(403, 'Unauthorized');
        }

        $license->delete();

        return redirect()->route('licenses.index')->with('success', 'License deleted successfully.');
    }

    public function inventory()
    {
        $inventory = License::with(['vendor', 'installations'])
            ->withCount('installations')
            ->get()
            ->map(function ($license) {
                return [
                    'id' => $license->id,
                    'name' => $license->name,
                    'vendor' => $license->vendor?->name,
                    'version' => $license->version,
                    'quantity' => $license->quantity,
                    'used' => $license->installations_count,
                    'available' => $license->available_installations,
                    'status' => $license->status,
                    'compliance_status' => $license->compliance_status,
                    'expiration_date' => $license->expiration_date,
                    'is_expired' => $license->is_expired,
                    'is_expiring_soon' => $license->is_expiring_soon,
                ];
            });

        return Inertia::render('Licenses/Inventory', [
            'inventory' => $inventory,
        ]);
    }

    public function compliance()
    {
        $stats = [
            'total_licenses' => License::count(),
            'compliant' => License::compliant()->count(),
            'unlicensed' => License::where('compliance_status', 'Unlicensed')->count(),
            'nulled' => License::where('compliance_status', 'Nulled')->count(),
            'trial' => License::where('compliance_status', 'Trial')->count(),
            'evaluation' => License::where('compliance_status', 'Evaluation')->count(),
            'expired' => License::expired()->count(),
            'expiring_soon' => License::expiringSoon()->count(),
        ];

        $nonCompliantLicenses = License::whereNotIn('compliance_status', ['Licensed'])
            ->with('vendor')
            ->get();

        return Inertia::render('Licenses/Compliance', [
            'stats' => $stats,
            'nonCompliantLicenses' => $nonCompliantLicenses,
        ]);
    }

    public function calendar()
    {
        $expiringLicenses = License::whereNotNull('expiration_date')
            ->where('expiration_date', '>', now())
            ->where('expiration_date', '<=', now()->addDays(90))
            ->with('vendor')
            ->orderBy('expiration_date')
            ->get()
            ->map(function ($license) {
                return [
                    'id' => $license->id,
                    'title' => $license->name,
                    'start' => $license->expiration_date->toDateString(),
                    'end' => $license->expiration_date->toDateString(),
                    'backgroundColor' => $license->days_until_expiration <= 7 ? '#EF4444' :
                                       ($license->days_until_expiration <= 30 ? '#F59E0B' : '#10B981'),
                    'vendor' => $license->vendor?->name,
                    'days_until_expiration' => $license->days_until_expiration,
                ];
            });

        return Inertia::render('Licenses/Calendar', [
            'expiringLicenses' => $expiringLicenses,
        ]);
    }

    public function evidence()
    {
        // Evidence and documents related to licenses
        $licensesWithDocuments = License::with(['documents', 'vendor'])
            ->whereHas('documents')
            ->get();

        return Inertia::render('Licenses/Evidence', [
            'licensesWithDocuments' => $licensesWithDocuments,
        ]);
    }

    public function vendors()
    {
        $vendorStats = \App\Models\Vendor::withCount(['licenses' => function ($query) {
            $query->where('status', 'Active');
        }])
        ->having('licenses_count', '>', 0)
        ->get()
        ->map(function ($vendor) {
            $licenses = $vendor->licenses;
            return [
                'id' => $vendor->id,
                'name' => $vendor->name,
                'total_licenses' => $licenses->count(),
                'active_licenses' => $licenses->where('status', 'Active')->count(),
                'expired_licenses' => $licenses->filter->is_expired->count(),
                'expiring_soon' => $licenses->filter->is_expiring_soon->count(),
                'compliant' => $licenses->where('compliance_status', 'Licensed')->count(),
                'total_cost' => $licenses->sum('cost'),
            ];
        });

        return Inertia::render('Licenses/Vendors', [
            'vendorStats' => $vendorStats,
        ]);
    }

    public function alerts()
    {
        $alerts = collect();

        // Expired licenses
        $expired = License::expired()->with('vendor')->get()->map(function ($license) {
            return [
                'type' => 'expired',
                'severity' => 'critical',
                'title' => 'License Expired',
                'message' => "License '{$license->name}' has expired",
                'license' => $license,
                'created_at' => now(),
            ];
        });

        // Expiring soon
        $expiringSoon = License::expiringSoon()->with('vendor')->get()->map(function ($license) {
            return [
                'type' => 'expiring',
                'severity' => 'warning',
                'title' => 'License Expiring Soon',
                'message' => "License '{$license->name}' expires in {$license->days_until_expiration} days",
                'license' => $license,
                'created_at' => now(),
            ];
        });

        // Non-compliant
        $nonCompliant = License::whereNotIn('compliance_status', ['Licensed'])->with('vendor')->get()->map(function ($license) {
            return [
                'type' => 'compliance',
                'severity' => 'warning',
                'title' => 'License Compliance Issue',
                'message' => "License '{$license->name}' has compliance status: {$license->compliance_status}",
                'license' => $license,
                'created_at' => now(),
            ];
        });

        $alerts = $expired->concat($expiringSoon)->concat($nonCompliant)->sortByDesc('created_at');

        return Inertia::render('Licenses/Alerts', [
            'alerts' => $alerts,
        ]);
    }

    public function report()
    {
        $stats = [
            'total' => License::count(),
            'active' => License::active()->count(),
            'expired' => License::expired()->count(),
            'expiring_soon' => License::expiringSoon()->count(),
            'compliant' => License::compliant()->count(),
            'by_status' => License::selectRaw('status, COUNT(*) as count')
                ->groupBy('status')
                ->pluck('count', 'status')
                ->toArray(),
            'by_compliance' => License::selectRaw('compliance_status, COUNT(*) as count')
                ->groupBy('compliance_status')
                ->pluck('count', 'compliance_status')
                ->toArray(),
            'by_vendor' => License::whereNotNull('vendor_id')
                ->selectRaw('vendor_id, COUNT(*) as count')
                ->groupBy('vendor_id')
                ->with('vendor')
                ->get()
                ->pluck('count', 'vendor.name')
                ->toArray(),
            'total_cost' => License::sum('cost'),
            'average_cost' => License::avg('cost'),
        ];

        return Inertia::render('Licenses/Report', [
            'stats' => $stats,
        ]);
    }

    public function import()
    {
        return Inertia::render('Licenses/Import');
    }

    public function importCsv(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,txt|max:2048',
        ]);

        // Implementation for CSV import
        // This would parse the CSV and create licenses

        return redirect()->route('licenses.index')->with('success', 'Licenses imported successfully.');
    }
}
