<?php

namespace App\Http\Controllers;

use App\Http\Requests\SwitchRequest;
use App\Models\Asset;
use App\Models\AssetNetwork;
use App\Models\Location;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class SwitchesController extends Controller
{
    public function index(Request $request)
    {
        $query = Asset::switches()
            ->with(['location', 'vendor', 'network']);

        // Filters
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

        if ($request->filled('os_firmware')) {
            $query->whereHas('network', function ($q) use ($request) {
                $q->where('os_firmware', 'like', '%' . $request->os_firmware . '%');
            });
        }

        if ($request->boolean('with_alerts')) {
            $query->withAlerts();
        }

        // Global search
        if ($request->filled('q')) {
            $search = $request->q;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                  ->orWhere('tag', 'like', '%' . $search . '%')
                  ->orWhereHas('network', function ($networkQuery) use ($search) {
                      $networkQuery->where('mgmt_ip', 'like', '%' . $search . '%')
                                  ->orWhere('hostname', 'like', '%' . $search . '%');
                  });
            });
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'name');
        $sortDir = $request->get('sort_dir', 'asc');

        if (in_array($sortBy, ['name', 'tag', 'status', 'model'])) {
            $query->orderBy($sortBy, $sortDir);
        } elseif ($sortBy === 'location') {
            $query->join('locations', 'assets.location_id', '=', 'locations.id')
                  ->orderBy('locations.name', $sortDir)
                  ->select('assets.*');
        } else {
            $query->orderBy('name', 'asc');
        }

        $switches = $query->paginate(25)->withQueryString();

        // Get filter options
        $locations = Location::orderBy('name')->get(['id', 'name']);
        $vendors = Vendor::orderBy('name')->get(['id', 'name']);
        $models = Asset::switches()->distinct()->pluck('model')->filter()->sort();
        $firmwares = AssetNetwork::whereHas('asset', function ($q) {
            $q->switches();
        })->distinct()->pluck('os_firmware')->filter()->sort();

        return Inertia::render('Switches/Index', [
            'switches' => $switches,
            'filters' => [
                'locations' => $locations,
                'vendors' => $vendors,
                'models' => $models,
                'firmwares' => $firmwares,
            ],
            'query' => $request->only(['q', 'status', 'location_id', 'vendor_id', 'model', 'os_firmware', 'with_alerts', 'sort_by', 'sort_dir']),
        ]);
    }

    public function create()
    {
        Gate::authorize('create', Asset::class);

        $locations = Location::orderBy('name')->get(['id', 'name']);
        $vendors = Vendor::orderBy('name')->get(['id', 'name']);

        return Inertia::render('Switches/Create', [
            'locations' => $locations,
            'vendors' => $vendors,
        ]);
    }

    public function store(SwitchRequest $request)
    {
        Gate::authorize('create', Asset::class);

        $validated = $request->validated();

        $assetData = collect($validated)->except(['network'])->toArray();
        $assetData['asset_type'] = 'switch';

        $asset = Asset::create($assetData);

        if (isset($validated['network'])) {
            $asset->network()->create($validated['network']);
        }

        return redirect()->route('switches.show', $asset)
                        ->with('success', 'Switch created successfully.');
    }

    public function show(Asset $asset)
    {
        Gate::authorize('view', $asset);

        $asset->load(['location', 'vendor', 'network', 'documents', 'auditLogs' => function ($query) {
            $query->latest()->take(10);
        }]);

        return Inertia::render('Switches/Show', [
            'asset' => $asset,
        ]);
    }

    public function edit(Asset $asset)
    {
        Gate::authorize('update', $asset);

        $locations = Location::orderBy('name')->get(['id', 'name']);
        $vendors = Vendor::orderBy('name')->get(['id', 'name']);

        $asset->load(['network']);

        return Inertia::render('Switches/Edit', [
            'asset' => $asset,
            'locations' => $locations,
            'vendors' => $vendors,
        ]);
    }

    public function update(SwitchRequest $request, Asset $asset)
    {
        Gate::authorize('update', $asset);

        $validated = $request->validated();

        $assetData = collect($validated)->except(['network'])->toArray();
        $asset->update($assetData);

        if (isset($validated['network'])) {
            $asset->network()->updateOrCreate(
                ['asset_id' => $asset->id],
                $validated['network']
            );
        }

        return redirect()->route('switches.show', $asset)
                        ->with('success', 'Switch updated successfully.');
    }

    public function destroy(Asset $asset)
    {
        Gate::authorize('delete', $asset);

        $asset->delete();

        return redirect()->route('switches.index')
                        ->with('success', 'Switch deleted successfully.');
    }
}
