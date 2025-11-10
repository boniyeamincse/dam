<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SwitchesController extends Controller
{
    public function index()
    {
        return Inertia::render('Switches/Index');
    }
}
