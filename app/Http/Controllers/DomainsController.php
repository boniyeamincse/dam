<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DomainsController extends Controller
{
    public function index()
    {
        return Inertia::render('Domains/Index');
    }
}
