<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ServersController extends Controller
{
    public function index()
    {
        return Inertia::render('Servers/Index');
    }
}
