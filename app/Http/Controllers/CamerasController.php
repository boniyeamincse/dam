<?php

namespace App\Http\Controllers;

use App\Http\Requests\CameraRequest;
use App\Models\Asset;
use App\Models\AssetNetwork;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CamerasController extends Controller
{
    public function index(Request $request)
    {
        $query = Asset::with(['network', 'alerts'])
            ->where('asset_type', 'camera')
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

        $cameras = $query->paginate(25)->withQueryString();

        return Inertia::render('Cameras/Index', [
            'cameras' => $cameras,
            'filters' => $request->only(['status', 'location', 'vendor', 'model', 'os_firmware', 'has_alerts', 'search'])
        ]);
    }

    public function create()
    {
        // Get unique values for filter dropdowns
        $locations = Asset::where('asset_type', 'camera')
            ->whereNotNull('location_id')
            ->distinct()
            ->pluck('location_id')
            ->map(function ($locationId) {
                return ['id' => $locationId, 'name' => 'Location ' . $locationId]; // Placeholder
            });

        $vendors = Asset::where('asset_type', 'camera')
            ->whereNotNull('vendor_id')
            ->distinct()
            ->pluck('vendor_id')
            ->map(function ($vendorId) {
                return ['id' => $vendorId, 'name' => 'Vendor ' . $vendorId]; // Placeholder
            });

        return Inertia::render('Cameras/Create', [
            'locations' => $locations,
            'vendors' => $vendors,
        ]);
    }

    public function store(CameraRequest $request)
    {
        DB::transaction(function () use ($request) {
            $asset = Asset::create([
                'asset_type' => 'camera',
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

        return redirect()->route('cameras.index')->with('success', 'Camera created successfully.');
    }

    public function show($id)
    {
        $camera = Asset::with(['network', 'alerts', 'documents', 'auditLogs' => function ($query) {
            $query->latest()->limit(10);
        }])->where('asset_type', 'camera')->findOrFail($id);

        return Inertia::render('Cameras/Show', [
            'camera' => $camera
        ]);
    }

    public function edit($id)
    {
        $camera = Asset::with('network')->where('asset_type', 'camera')->findOrFail($id);

        return Inertia::render('Cameras/Edit', [
            'camera' => $camera
        ]);
    }

    public function update(CameraRequest $request, $id)
    {
        $asset = Asset::where('asset_type', 'camera')->findOrFail($id);

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

        return redirect()->route('cameras.index')->with('success', 'Camera updated successfully.');
    }

    public function destroy($id)
    {
        $asset = Asset::where('asset_type', 'camera')->findOrFail($id);

        // Check permissions
        if (!auth()->user()->hasRole(['Org Admin', 'IT Engineer'])) {
            abort(403, 'Unauthorized');
        }

        $asset->delete();

        return redirect()->route('cameras.index')->with('success', 'Camera deleted successfully.');
    }

    public function report()
    {
        // Aggregate data for report
        $stats = [
            'total' => Asset::where('asset_type', 'camera')->count(),
            'by_status' => Asset::where('asset_type', 'camera')
                ->selectRaw('status, COUNT(*) as count')
                ->groupBy('status')
                ->pluck('count', 'status')
                ->toArray(),
            'by_vendor' => Asset::where('asset_type', 'camera')
                ->whereNotNull('vendor_id')
                ->selectRaw('vendor_id, COUNT(*) as count')
                ->groupBy('vendor_id')
                ->pluck('count')
                ->toArray(),
            'offline_last_24h' => Asset::where('asset_type', 'camera')
                ->where(function ($q) {
                    $q->whereNull('last_seen')
                      ->orWhere('last_seen', '<', now()->subDay());
                })
                ->count(),
            'with_alerts' => Asset::where('asset_type', 'camera')
                ->whereHas('alerts', function ($q) {
                    $q->where('status', 'active');
                })
                ->count(),
        ];

        return Inertia::render('Cameras/Report', [
            'stats' => $stats
        ]);
    }

    public function health($id)
    {
        $camera = Asset::with('network')->where('asset_type', 'camera')->findOrFail($id);

        // Placeholder health data
        $health = [
            'last_ping' => $camera->last_seen,
            'latency_ms' => rand(1, 50), // Placeholder
            'status' => $camera->last_seen && $camera->last_seen > now()->subMinutes(5) ? 'online' : 'offline',
            'uptime' => '99.9%', // Placeholder
            'cpu_usage' => rand(10, 80), // Placeholder
            'memory_usage' => rand(20, 90), // Placeholder
        ];

        return Inertia::render('Cameras/Health', [
            'camera' => $camera,
            'health' => $health
        ]);
    }

    public function duplicate($id)
    {
        $original = Asset::with('network')->where('asset_type', 'camera')->findOrFail($id);

        DB::transaction(function () use ($original) {
            $asset = $original->replicate();
            $asset->name = $original->name . ' (Copy)';
            $asset->tag = $original->tag . '-COPY';
            $asset->save();

            $network = $original->network->replicate();
            $network->asset_id = $asset->id;
            $network->save();
        });

        return redirect()->route('cameras.index')->with('success', 'Camera duplicated successfully.');
    }

    public function retire($id)
    {
        $asset = Asset::where('asset_type', 'camera')->findOrFail($id);
        $asset->update(['status' => 'Retired']);

        return redirect()->route('cameras.index')->with('success', 'Camera retired successfully.');
    }

    public function export()
    {
        $cameras = Asset::with('network')
            ->where('asset_type', 'camera')
            ->get();

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="cameras_' . now()->format('Y-m-d') . '.csv"',
        ];

        $callback = function () use ($cameras) {
            $file = fopen('php://output', 'w');

            fputcsv($file, [
                'Name', 'Asset Tag', 'Model', 'Serial', 'Status',
                'Management IP', 'Hostname', 'OS/Firmware', 'VLAN',
                'Purchase Date', 'Warranty End', 'Last Seen', 'Notes'
            ]);

            foreach ($cameras as $camera) {
                fputcsv($file, [
                    $camera->name,
                    $camera->tag,
                    $camera->model,
                    $camera->serial,
                    $camera->status,
                    $camera->network?->mgmt_ip,
                    $camera->network?->hostname,
                    $camera->network?->os_firmware,
                    $camera->network?->vlan,
                    $camera->purchase_date?->format('Y-m-d'),
                    $camera->warranty_end?->format('Y-m-d'),
                    $camera->last_seen?->format('Y-m-d H:i:s'),
                    $camera->notes,
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
