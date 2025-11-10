<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Debug: Add some basic data to ensure the controller is working
        $user = auth()->user();

        return Inertia::render('Dashboard/Index', [
            'user' => $user,
            'stats' => [
                'domains' => 0,
                'routers' => 0,
                'switches' => 0,
                'servers' => 0,
            ]
        ]);
    }
}
