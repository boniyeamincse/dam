<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Domain;
use App\Models\Router;
use App\Models\Asset;
use App\Models\Vendor;
use App\Models\License;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // Calculate actual stats
        $stats = [
            'total_assets' => Asset::count(),
            'routers' => Asset::where('asset_type', 'router')->count(),
            'switches' => Asset::where('asset_type', 'switch')->count(),
            'cameras' => Asset::where('asset_type', 'camera')->count(),
            'servers' => Asset::where('asset_type', 'server')->count(),
            'domains' => Domain::count(),
            'vendors' => Vendor::count(),
            'licenses' => License::count(),
            'active_licenses' => License::active()->count(),
            'expired_licenses' => License::expired()->count(),
            'expiring_licenses' => License::expiringSoon()->count(),
            'compliant_licenses' => License::compliant()->count(),
            'active_alerts' => 0, // TODO: Implement alerts system
            'expiring_soon' => Domain::where('expiry_date', '<=', now()->addDays(30))->count(),
            'license_expiring_soon' => License::expiringSoon()->count(),
        ];

        // Recent alerts (mock data for now)
        $alerts = [
            [
                'id' => 1,
                'type' => 'critical',
                'title' => 'Router R1 Connection Lost',
                'description' => 'Main office router is unreachable',
                'timestamp' => now()->subHours(2),
            ],
            [
                'id' => 2,
                'type' => 'warning',
                'title' => 'SSL Certificate Expiring',
                'description' => 'api.akij.com certificate expires in 7 days',
                'timestamp' => now()->subDays(1),
            ],
        ];

        // Expiring soon (domains + licenses)
        $expiringDomains = Domain::where('expiry_date', '<=', now()->addDays(30))
            ->orderBy('expiry_date')
            ->take(3)
            ->get()
            ->map(function ($domain) {
                return [
                    'id' => $domain->id,
                    'type' => 'domain',
                    'title' => $domain->primary_url,
                    'expires_at' => $domain->expiry_date,
                    'days_left' => now()->diffInDays($domain->expiry_date),
                ];
            });

        $expiringLicenses = License::expiringSoon()
            ->orderBy('expiration_date')
            ->take(3)
            ->get()
            ->map(function ($license) {
                return [
                    'id' => $license->id,
                    'type' => 'license',
                    'title' => $license->name,
                    'expires_at' => $license->expiration_date,
                    'days_left' => $license->days_until_expiration,
                ];
            });

        $expiringSoon = $expiringDomains->concat($expiringLicenses)->sortBy('days_left')->take(5);

        return Inertia::render('Dashboard/Index', [
            'user' => $user,
            'stats' => $stats,
            'alerts' => $alerts,
            'expiringSoon' => $expiringSoon,
        ]);
    }
}
