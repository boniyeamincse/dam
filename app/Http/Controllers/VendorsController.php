<?php

namespace App\Http\Controllers;

use App\Http\Requests\VendorRequest;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class VendorsController extends Controller
{
    public function index()
    {
        Gate::authorize('viewAny', Vendor::class);

        $vendors = Vendor::withCount(['contracts' => function ($query) {
            $query->where('status', 'Active');
        }])
        ->when(request('search'), function ($query) {
            $query->where('name', 'like', '%' . request('search') . '%')
                  ->orWhere('contact_email', 'like', '%' . request('search') . '%');
        })
        ->when(request('category'), function ($query) {
            $query->where('category', request('category'));
        })
        ->when(request('status'), function ($query) {
            $query->where('status', request('status'));
        })
        ->orderBy('name')
        ->paginate(15);

        return inertia('Vendors/Index', [
            'vendors' => $vendors,
            'filters' => request()->only(['search', 'category', 'status']),
            'can' => [
                'create' => Gate::allows('create', Vendor::class),
                'export' => Gate::allows('viewAny', Vendor::class),
            ],
        ]);
    }

    public function create()
    {
        Gate::authorize('create', Vendor::class);

        return inertia('Vendors/Create');
    }

    public function store(VendorRequest $request)
    {
        Gate::authorize('create', Vendor::class);

        Vendor::create($request->validated());

        return redirect()->route('vendors.index')->with('success', 'Vendor created successfully.');
    }

    public function show(Vendor $vendor)
    {
        Gate::authorize('view', $vendor);

        $vendor->load(['contracts' => function ($query) {
            $query->with(['documents'])->orderBy('end_on');
        }, 'documents', 'assets.asset']);

        return inertia('Vendors/Show', [
            'vendor' => $vendor,
            'can' => [
                'update' => Gate::allows('update', $vendor),
                'delete' => Gate::allows('delete', $vendor),
                'create_contract' => Gate::allows('create', \App\Models\Contract::class),
            ],
        ]);
    }

    public function edit(Vendor $vendor)
    {
        Gate::authorize('update', $vendor);

        return inertia('Vendors/Edit', [
            'vendor' => $vendor,
        ]);
    }

    public function update(VendorRequest $request, Vendor $vendor)
    {
        Gate::authorize('update', $vendor);

        $vendor->update($request->validated());

        return redirect()->route('vendors.show', $vendor)->with('success', 'Vendor updated successfully.');
    }

    public function destroy(Vendor $vendor)
    {
        Gate::authorize('delete', $vendor);

        $vendor->delete();

        return redirect()->route('vendors.index')->with('success', 'Vendor deleted successfully.');
    }
}
