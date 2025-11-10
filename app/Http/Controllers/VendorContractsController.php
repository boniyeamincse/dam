<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContractRequest;
use App\Models\Contract;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class VendorContractsController extends Controller
{
    public function index(Vendor $vendor)
    {
        Gate::authorize('view', $vendor);

        $contracts = $vendor->contracts()
            ->with(['documents'])
            ->orderBy('end_on')
            ->paginate(15);

        return inertia('Vendors/Contracts/Index', [
            'vendor' => $vendor,
            'contracts' => $contracts,
            'can' => [
                'create' => Gate::allows('create', Contract::class),
            ],
        ]);
    }

    public function create(Vendor $vendor)
    {
        Gate::authorize('create', Contract::class);

        return inertia('Vendors/Contracts/Create', [
            'vendor' => $vendor,
        ]);
    }

    public function store(ContractRequest $request, Vendor $vendor)
    {
        Gate::authorize('create', Contract::class);

        $contract = $vendor->contracts()->create($request->validated());

        return redirect()->route('vendors.contracts.index', $vendor)->with('success', 'Contract created successfully.');
    }

    public function edit(Vendor $vendor, Contract $contract)
    {
        Gate::authorize('update', $contract);

        return inertia('Vendors/Contracts/Edit', [
            'vendor' => $vendor,
            'contract' => $contract,
        ]);
    }

    public function update(ContractRequest $request, Vendor $vendor, Contract $contract)
    {
        Gate::authorize('update', $contract);

        $contract->update($request->validated());

        return redirect()->route('vendors.contracts.index', $vendor)->with('success', 'Contract updated successfully.');
    }

    public function destroy(Vendor $vendor, Contract $contract)
    {
        Gate::authorize('delete', $contract);

        $contract->delete();

        return redirect()->route('vendors.contracts.index', $vendor)->with('success', 'Contract deleted successfully.');
    }

    public function globalIndex()
    {
        Gate::authorize('viewAny', Contract::class);

        $contracts = Contract::with('vendor')
            ->where('status', 'Active')
            ->orderBy('end_on')
            ->paginate(15);

        return inertia('Vendors/Contracts/GlobalIndex', [
            'contracts' => $contracts,
            'can' => [
                'create' => Gate::allows('create', Contract::class),
                'export' => Gate::allows('viewAny', Contract::class),
            ],
        ]);
    }
}
