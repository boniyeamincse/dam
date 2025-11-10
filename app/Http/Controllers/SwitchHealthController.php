<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SwitchHealthController extends Controller
{
    public function index()
    {
        // Placeholder health check data
        $switches = Asset::switches()
            ->with(['location', 'network'])
            ->get()
            ->map(function ($switch) {
                // Simulate health status (placeholder)
                $statuses = ['up', 'warn', 'down'];
                $randomStatus = $statuses[array_rand($statuses)];

                return [
                    'id' => $switch->id,
                    'name' => $switch->name,
                    'tag' => $switch->tag,
                    'location' => $switch->location?->name ?? 'Unknown',
                    'mgmt_ip' => $switch->network?->mgmt_ip ?? 'N/A',
                    'status' => $randomStatus,
                    'last_check' => now()->subMinutes(rand(1, 60))->format('Y-m-d H:i:s'),
                ];
            });

        return Inertia::render('Switches/Health', [
            'switches' => $switches,
        ]);
    }
}
