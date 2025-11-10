<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Gate;

class VendorReportsController extends Controller
{
    public function index()
    {
        Gate::authorize('viewAny', Vendor::class);

        $stats = [
            'total_vendors' => Vendor::count(),
            'active_vendors' => Vendor::where('status', 'Active')->count(),
            'active_contracts' => Contract::where('status', 'Active')->count(),
            'expiring_30' => Contract::where('status', 'Active')->where('end_on', '<=', now()->addDays(30))->count(),
            'expiring_60' => Contract::where('status', 'Active')->where('end_on', '<=', now()->addDays(60))->count(),
            'expiring_90' => Contract::where('status', 'Active')->where('end_on', '<=', now()->addDays(90))->count(),
        ];

        $topSpend = Vendor::with(['contracts' => function ($query) {
            $query->where('status', 'Active');
        }])->get()->map(function ($vendor) {
            return [
                'name' => $vendor->name,
                'total_amount' => $vendor->contracts->sum('amount'),
                'contract_count' => $vendor->contracts->count(),
            ];
        })->sortByDesc('total_amount')->take(10);

        $expiringContracts = Contract::with('vendor')
            ->where('status', 'Active')
            ->where('end_on', '<=', now()->addDays(90))
            ->orderBy('end_on')
            ->get()
            ->map(function ($contract) {
                return [
                    'id' => $contract->id,
                    'vendor_name' => $contract->vendor->name,
                    'title' => $contract->title,
                    'end_on' => $contract->end_on,
                    'days_left' => $contract->days_until_expiry,
                    'amount' => $contract->amount,
                    'currency' => $contract->currency,
                ];
            });

        return inertia('Vendors/Report', [
            'stats' => $stats,
            'topSpend' => $topSpend,
            'expiringContracts' => $expiringContracts,
            'can' => [
                'export' => Gate::allows('viewAny', Vendor::class),
            ],
        ]);
    }

    public function exportCsv()
    {
        Gate::authorize('viewAny', Vendor::class);

        $contracts = Contract::with('vendor')
            ->orderBy('end_on')
            ->get();

        $filename = 'vendor_contracts_' . now()->format('Y-m-d') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"$filename\"",
        ];

        $callback = function () use ($contracts) {
            $file = fopen('php://output', 'w');

            // CSV headers
            fputcsv($file, [
                'Vendor Name',
                'Contract Title',
                'Contract No',
                'Type',
                'Start Date',
                'End Date',
                'Amount',
                'Currency',
                'Billing Cycle',
                'Status',
                'Days Until Expiry'
            ]);

            // CSV data
            foreach ($contracts as $contract) {
                fputcsv($file, [
                    $contract->vendor->name,
                    $contract->title,
                    $contract->contract_no,
                    $contract->type,
                    $contract->start_on->format('Y-m-d'),
                    $contract->end_on->format('Y-m-d'),
                    $contract->amount,
                    $contract->currency,
                    $contract->billing_cycle,
                    $contract->status,
                    $contract->days_until_expiry,
                ]);
            }

            fclose($file);
        };

        return Response::stream($callback, 200, $headers);
    }
}
