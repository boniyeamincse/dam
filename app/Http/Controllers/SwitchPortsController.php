<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\SwitchPort;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SwitchPortsController extends Controller
{
    public function index()
    {
        // Placeholder port data - in real implementation, this would pull from switch_ports table
        $switches = Asset::switches()
            ->with(['location'])
            ->get();

        $ports = [];

        foreach ($switches as $switch) {
            // Generate placeholder ports for demonstration
            for ($i = 1; $i <= 24; $i++) {
                $ports[] = [
                    'id' => $switch->id . '-' . $i,
                    'switch_name' => $switch->name,
                    'switch_tag' => $switch->tag,
                    'port_name' => "GigabitEthernet0/{$i}",
                    'admin_up' => rand(0, 1),
                    'oper_up' => rand(0, 1),
                    'vlan_mode' => rand(0, 1) ? 'access' : 'trunk',
                    'vlan_ids' => rand(0, 1) ? '10' : '10,20,30',
                    'poe' => rand(0, 1),
                    'speed_mbps' => [1000, 100, 10][rand(0, 2)],
                    'description' => rand(0, 1) ? "Port {$i} Description" : null,
                ];
            }
        }

        return Inertia::render('Switches/Ports', [
            'ports' => collect($ports)->paginate(50),
        ]);
    }
}
