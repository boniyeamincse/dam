<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SwitchAuditController extends Controller
{
    public function index()
    {
        // Placeholder audit entries - in real implementation, this would pull from audit_logs table
        $auditEntries = Asset::switches()
            ->with(['location'])
            ->get()
            ->flatMap(function ($switch) {
                $actions = ['created', 'updated', 'status_changed', 'maintenance'];
                $entries = [];

                for ($i = 0; $i < rand(1, 5); $i++) {
                    $entries[] = [
                        'id' => $switch->id . '-audit-' . $i,
                        'switch_name' => $switch->name,
                        'switch_tag' => $switch->tag,
                        'user' => ['John Doe', 'Jane Smith', 'Mike Johnson'][rand(0, 2)],
                        'action' => $actions[array_rand($actions)],
                        'details' => 'Asset information updated',
                        'timestamp' => now()->subDays(rand(0, 30))->subHours(rand(0, 24))->format('Y-m-d H:i:s'),
                    ];
                }

                return $entries;
            })
            ->sortByDesc('timestamp')
            ->take(50);

        return Inertia::render('Switches/Audit', [
            'auditEntries' => $auditEntries,
        ]);
    }
}
