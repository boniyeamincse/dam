<?php

namespace App\Http\Controllers;

use App\Models\Domain;
use App\Http\Requests\DomainRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use League\Csv\Writer;
use Illuminate\Support\Facades\Response;

class DomainController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Domain::query();

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('asset_id', 'like', "%{$search}%")
                  ->orWhere('primary_url', 'like', "%{$search}%")
                  ->orWhere('registrar', 'like', "%{$search}%")
                  ->orWhere('business_unit', 'like', "%{$search}%");
            });
        }

        // Filters
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('environment')) {
            $query->where('environment', $request->environment);
        }

        $domains = $query->orderBy('expiry_date', 'asc')->paginate(15);

        return Inertia::render('Domains/Index', [
            'domains' => $domains,
            'filters' => $request->only(['search', 'type', 'status', 'environment']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Domains/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DomainRequest $request)
    {
        Domain::create($request->validated());

        return redirect()->route('domains.index')->with('message', 'Domain created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Domain $domain)
    {
        return Inertia::render('Domains/Show', [
            'domain' => $domain,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Domain $domain)
    {
        return Inertia::render('Domains/Edit', [
            'domain' => $domain,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DomainRequest $request, Domain $domain)
    {
        $domain->update($request->validated());

        return redirect()->route('domains.index')->with('message', 'Domain updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Domain $domain)
    {
        $domain->delete();

        return redirect()->route('domains.index')->with('message', 'Domain deleted successfully.');
    }

    /**
     * Generate domain report.
     */
    public function report()
    {
        $totalDomains = Domain::count();
        $activeDomains = Domain::where('status', 'Active')->count();
        $inactiveDomains = Domain::where('status', 'Deactive')->count();
        $expiringThisMonth = Domain::where('expiry_date', '>=', now()->startOfMonth())
                                  ->where('expiry_date', '<=', now()->endOfMonth())
                                  ->count();
        $byEnvironment = Domain::selectRaw('environment, COUNT(*) as count')
                              ->groupBy('environment')
                              ->get()
                              ->map(function ($item) {
                                  return [
                                      'name' => $item->environment,
                                      'value' => $item->count,
                                  ];
                              });

        return Inertia::render('Domains/Report', [
            'stats' => [
                'total_domains' => $totalDomains,
                'active_domains' => $activeDomains,
                'inactive_domains' => $inactiveDomains,
                'expiring_this_month' => $expiringThisMonth,
                'by_environment' => $byEnvironment,
            ],
        ]);
    }

    /**
     * Download domain report as CSV.
     */
    public function downloadReport()
    {
        $domains = Domain::all();

        $csv = Writer::createFromString('');

        // Add headers
        $csv->insertOne([
            'Asset ID',
            'Type',
            'Status',
            'Environment',
            'Business Unit',
            'Purpose',
            'Primary Owner',
            'Owner Email',
            'Technical Owner',
            'Tech Email',
            'Registrar',
            'Registrant Org',
            'Registration Date',
            'Expiry Date',
            'Auto Renew',
            'Renewal Term',
            'Cost Per Term',
            'Currency',
            'Billing Owner',
            'GL Cost Center',
            'Nameserver 1',
            'Nameserver 2',
            'CDN/WAF',
            'Primary URL',
            'Redirect Target',
            'Notes',
        ]);

        // Add data
        foreach ($domains as $domain) {
            $csv->insertOne([
                $domain->asset_id,
                $domain->type,
                $domain->status,
                $domain->environment,
                $domain->business_unit,
                $domain->purpose,
                $domain->primary_owner,
                $domain->owner_email,
                $domain->technical_owner,
                $domain->tech_email,
                $domain->registrar,
                $domain->registrant_org,
                $domain->registration_date ? $domain->registration_date->format('Y-m-d') : '',
                $domain->expiry_date ? $domain->expiry_date->format('Y-m-d') : '',
                $domain->auto_renew ? 'Yes' : 'No',
                $domain->renewal_term,
                $domain->cost_per_term,
                $domain->currency,
                $domain->billing_owner,
                $domain->gl_cost_center,
                $domain->nameserver1,
                $domain->nameserver2,
                $domain->cdn_waf,
                $domain->primary_url,
                $domain->redirect_target,
                $domain->notes,
            ]);
        }

        $filename = 'domain-report-' . now()->format('Y-m-d-H-i-s') . '.csv';

        return Response::make($csv->getContent(), 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }
}
