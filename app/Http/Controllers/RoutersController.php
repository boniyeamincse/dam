<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RoutersController extends Controller
{
    public function index()
    {
        return Inertia::render('Routers/Index');
    }
}
