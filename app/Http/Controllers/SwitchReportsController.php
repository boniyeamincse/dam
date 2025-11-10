<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\AssetNetwork;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class SwitchReportsController extends Controller
{
    public function index()
    {
        Gate::authorize('viewAny', Asset::class);

        $switches = Asset::switches()->get();

        // Calculate KPIs
        $totalCount = $switches->count();
        $activeCount = $switches->where('status', 'in_service')->count();
        $retiredCount = $switches->where('status', 'retired')->count();
        $expiringWarrantyCount = $switches->filter(function ($switch) {
            return $switch->warranty_end && $switch->warranty_end->isPast();
        })->count();

        // Vendor breakdown
        $vendorStats = $switches->groupBy('vendor.name')->map(function ($group, $vendor) {
            return [
                'vendor' => $vendor ?: 'Unknown',
                'count' => $group->count(),
                'percentage' => $totalCount > 0 ? round(($group->count() / $totalCount) * 100, 1) : 0,
            ];
        })->sortByDesc('count')->values();

        // Location breakdown
        $locationStats = $switches->groupBy('location.name')->map(function ($group, $location) {
            return [
                'location' => $location ?: 'Unknown',
                'count' => $group->count(),
                'percentage' => $totalCount > 0 ? round(($group->count() / $totalCount) * 100, 1) : 0,
            ];
        })->sortByDesc('count')->values();

        return Inertia::render('Switches/Report', [
            'kpis' => [
                'total' => $totalCount,
                'active' => $activeCount,
                'retired' => $retiredCount,
                'expiring_warranty' => $expiringWarrantyCount,
            ],
            'vendorStats' => $vendorStats,
            'locationStats' => $locationStats,
        ]);
    }

    public function exportCsv(Request $request)
    {
        Gate::authorize('viewAny', Asset::class);

        $filename = 'switches_export_' . now()->format('Y-m-d_H-i-s') . '.csv';

        return new StreamedResponse(function () use ($request) {
            $handle = fopen('php://output', 'w');

            // CSV headers
            fputcsv($handle, [
                'Tag',
                'Name',
                'Model',
                'Serial',
                'Vendor',
                'Location',
                'Status',
                'Management IP',
                'Hostname',
                'OS/Firmware',
                'VLAN',
                'Purchase Date',
                'Warranty End',
                'Last Seen',
                'Notes',
            ]);

            // Apply same filters as index
            $query = Asset::switches()
                ->with(['location', 'vendor', 'network']);

            if ($request->filled('status')) {
                $query->where('status', $request->status);
            }

            if ($request->filled('location_id')) {
                $query->where('location_id', $request->location_id);
            }

            if ($request->filled('vendor_id')) {
                $query->where('vendor_id', $request->vendor_id);
            }

            if ($request->filled('model')) {
                $query->where('model', 'like', '%' . $request->model . '%');
            }

            $switches = $query->get();

            foreach ($switches as $switch) {
                fputcsv($handle, [
                    $switch->tag,
                    $switch->name,
                    $switch->model,
                    $switch->serial,
                    $switch->vendor?->name ?? '',
                    $switch->location?->name ?? '',
                    $switch->status,
                    $switch->network?->mgmt_ip ?? '',
                    $switch->network?->hostname ?? '',
                    $switch->network?->os_firmware ?? '',
                    $switch->network?->vlan ?? '',
                    $switch->purchase_date?->format('Y-m-d') ?? '',
                    $switch->warranty_end?->format('Y-m-d') ?? '',
                    $switch->last_seen?->format('Y-m-d H:i:s') ?? '',
                    $switch->notes,
                ]);
            }

            fclose($handle);
        }, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }
}
