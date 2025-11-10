<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SwitchConfigsController extends Controller
{
    public function index()
    {
        // Placeholder config documents - in real implementation, this would pull from documents table
        $configs = Asset::switches()
            ->with(['location'])
            ->get()
            ->map(function ($switch) {
                return [
                    'id' => $switch->id . '-config',
                    'switch_name' => $switch->name,
                    'switch_tag' => $switch->tag,
                    'filename' => "config_{$switch->tag}.txt",
                    'uploaded_at' => now()->subDays(rand(1, 30))->format('Y-m-d'),
                    'size_kb' => rand(10, 500),
                    'version' => 'v' . rand(1, 5) . '.' . rand(0, 9),
                ];
            });

        return Inertia::render('Switches/Configs', [
            'configs' => $configs,
        ]);
    }
}
