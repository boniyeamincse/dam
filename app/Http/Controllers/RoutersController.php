<?php

namespace App\Http\Controllers;

use App\Http\Requests\RouterRequest;
use App\Models\Asset;
use App\Models\AssetNetwork;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RoutersController extends Controller
{
    public function index(Request $request)
    {
        $query = Asset::with(['network', 'alerts'])
            ->where('asset_type', 'router')
            ->whereNull('deleted_at');

        // Apply filters
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('location')) {
            $query->where('location_id', $request->location);
        }

        if ($request->filled('vendor')) {
            $query->where('vendor_id', $request->vendor);
        }

        if ($request->filled('model')) {
            $query->where('model', 'like', '%' . $request->model . '%');
        }

        if ($request->filled('os_firmware')) {
            $query->whereHas('network', function ($q) use ($request) {
                $q->where('os_firmware', 'like', '%' . $request->os_firmware . '%');
            });
        }

        if ($request->boolean('has_alerts')) {
            $query->whereHas('alerts', function ($q) {
                $q->where('status', 'active');
            });
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                  ->orWhere('tag', 'like', '%' . $search . '%')
                  ->orWhereHas('network', function ($networkQuery) use ($search) {
                      $networkQuery->where('mgmt_ip', 'like', '%' . $search . '%')
                                   ->orWhere('hostname', 'like', '%' . $search . '%');
                  });
            });
        }

        $routers = $query->paginate(25)->withQueryString();

        return Inertia::render('Routers/Index', [
            'routers' => $routers,
            'filters' => $request->only(['status', 'location', 'vendor', 'model', 'os_firmware', 'has_alerts', 'search'])
        ]);
    }

    public function create()
    {
        // Get unique values for filter dropdowns
        $locations = Asset::where('asset_type', 'router')
            ->whereNotNull('location_id')
            ->distinct()
            ->pluck('location_id')
            ->map(function ($locationId) {
                return ['id' => $locationId, 'name' => 'Location ' . $locationId]; // Placeholder
            });

        $vendors = Asset::where('asset_type', 'router')
            ->whereNotNull('vendor_id')
            ->distinct()
            ->pluck('vendor_id')
            ->map(function ($vendorId) {
                return ['id' => $vendorId, 'name' => 'Vendor ' . $vendorId]; // Placeholder
            });

        return Inertia::render('Routers/Create', [
            'locations' => $locations,
            'vendors' => $vendors,
        ]);
    }

    public function store(RouterRequest $request)
    {
        DB::transaction(function () use ($request) {
            $asset = Asset::create([
                'asset_type' => 'router',
                'name' => $request->name,
                'tag' => $request->tag,
                'model' => $request->model,
                'serial' => $request->serial,
                'status' => $request->status,
                'purchase_date' => $request->purchase_date,
                'warranty_end' => $request->warranty_end,
                'notes' => $request->notes,
                'last_seen' => now(),
            ]);

            AssetNetwork::create([
                'asset_id' => $asset->id,
                'mgmt_ip' => $request->mgmt_ip,
                'hostname' => $request->hostname,
                'os_firmware' => $request->os_firmware,
                'vlan' => $request->vlan,
            ]);
        });

        return redirect()->route('routers.index')->with('success', 'Router created successfully.');
    }

    public function show($id)
    {
        $router = Asset::with(['network', 'alerts', 'documents', 'auditLogs' => function ($query) {
            $query->latest()->limit(10);
        }])->where('asset_type', 'router')->findOrFail($id);

        return Inertia::render('Routers/Show', [
            'router' => $router
        ]);
    }

    public function edit($id)
    {
        $router = Asset::with('network')->where('asset_type', 'router')->findOrFail($id);

        return Inertia::render('Routers/Edit', [
            'router' => $router
        ]);
    }

    public function update(RouterRequest $request, $id)
    {
        $asset = Asset::where('asset_type', 'router')->findOrFail($id);

        DB::transaction(function () use ($request, $asset) {
            $asset->update([
                'name' => $request->name,
                'tag' => $request->tag,
                'model' => $request->model,
                'serial' => $request->serial,
                'status' => $request->status,
                'purchase_date' => $request->purchase_date,
                'warranty_end' => $request->warranty_end,
                'notes' => $request->notes,
            ]);

            $asset->network->update([
                'mgmt_ip' => $request->mgmt_ip,
                'hostname' => $request->hostname,
                'os_firmware' => $request->os_firmware,
                'vlan' => $request->vlan,
            ]);
        });

        return redirect()->route('routers.index')->with('success', 'Router updated successfully.');
    }

    public function destroy($id)
    {
        $asset = Asset::where('asset_type', 'router')->findOrFail($id);

        // Check permissions
        if (!auth()->user()->hasRole(['Org Admin', 'IT Engineer'])) {
            abort(403, 'Unauthorized');
        }

        $asset->delete();

        return redirect()->route('routers.index')->with('success', 'Router deleted successfully.');
    }

    public function report()
    {
        // Aggregate data for report
        $stats = [
            'total' => Asset::where('asset_type', 'router')->count(),
            'by_status' => Asset::where('asset_type', 'router')
                ->selectRaw('status, COUNT(*) as count')
                ->groupBy('status')
                ->pluck('count', 'status')
                ->toArray(),
            'by_vendor' => Asset::where('asset_type', 'router')
                ->whereNotNull('vendor_id')
                ->selectRaw('vendor_id, COUNT(*) as count')
                ->groupBy('vendor_id')
                ->pluck('count')
                ->toArray(),
            'offline_last_24h' => Asset::where('asset_type', 'router')
                ->where(function ($q) {
                    $q->whereNull('last_seen')
                      ->orWhere('last_seen', '<', now()->subDay());
                })
                ->count(),
            'with_alerts' => Asset::where('asset_type', 'router')
                ->whereHas('alerts', function ($q) {
                    $q->where('status', 'active');
                })
                ->count(),
        ];

        return Inertia::render('Routers/Report', [
            'stats' => $stats
        ]);
    }

    public function health($id)
    {
        $router = Asset::with('network')->where('asset_type', 'router')->findOrFail($id);

        // Placeholder health data
        $health = [
            'last_ping' => $router->last_seen,
            'latency_ms' => rand(1, 50), // Placeholder
            'status' => $router->last_seen && $router->last_seen > now()->subMinutes(5) ? 'online' : 'offline',
            'uptime' => '99.9%', // Placeholder
            'cpu_usage' => rand(10, 80), // Placeholder
            'memory_usage' => rand(20, 90), // Placeholder
        ];

        return Inertia::render('Routers/Health', [
            'router' => $router,
            'health' => $health
        ]);
    }

    public function duplicate($id)
    {
        $original = Asset::with('network')->where('asset_type', 'router')->findOrFail($id);

        DB::transaction(function () use ($original) {
            $asset = $original->replicate();
            $asset->name = $original->name . ' (Copy)';
            $asset->tag = $original->tag . '-COPY';
            $asset->save();

            $network = $original->network->replicate();
            $network->asset_id = $asset->id;
            $network->save();
        });

        return redirect()->route('routers.index')->with('success', 'Router duplicated successfully.');
    }

    public function retire($id)
    {
        $asset = Asset::where('asset_type', 'router')->findOrFail($id);
        $asset->update(['status' => 'Retired']);

        return redirect()->route('routers.index')->with('success', 'Router retired successfully.');
    }

    public function export()
    {
        $routers = Asset::with('network')
            ->where('asset_type', 'router')
            ->get();

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="routers_' . now()->format('Y-m-d') . '.csv"',
        ];

        $callback = function () use ($routers) {
            $file = fopen('php://output', 'w');

            fputcsv($file, [
                'Name', 'Asset Tag', 'Model', 'Serial', 'Status',
                'Management IP', 'Hostname', 'OS/Firmware', 'VLAN',
                'Purchase Date', 'Warranty End', 'Last Seen', 'Notes'
            ]);

            foreach ($routers as $router) {
                fputcsv($file, [
                    $router->name,
                    $router->tag,
                    $router->model,
                    $router->serial,
                    $router->status,
                    $router->network?->mgmt_ip,
                    $router->network?->hostname,
                    $router->network?->os_firmware,
                    $router->network?->vlan,
                    $router->purchase_date?->format('Y-m-d'),
                    $router->warranty_end?->format('Y-m-d'),
                    $router->last_seen?->format('Y-m-d H:i:s'),
                    $router->notes,
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
