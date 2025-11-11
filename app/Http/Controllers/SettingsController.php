<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();

        return Inertia::render('Settings/Index', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'theme' => $user->theme,
                'density' => $user->density,
                'date_format' => $user->date_format,
                'page_size' => $user->page_size,
                'notifications_enabled' => $user->notifications_enabled ?? true,
                'email_alerts' => $user->email_alerts ?? true,
                'system_alerts' => $user->system_alerts ?? true,
            ],
            'roles' => Auth::user()->roles->pluck('name')->toArray(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'theme' => 'required|in:light,slate',
            'density' => 'required|in:comfortable,compact',
            'date_format' => 'required|string|max:20',
            'page_size' => 'required|integer|min:10|max:100',
            'notifications_enabled' => 'boolean',
            'email_alerts' => 'boolean',
            'system_alerts' => 'boolean',
        ]);

        Auth::user()->update($validated);

        return redirect()->back()->with('message', 'Settings updated successfully.');
    }

    public function updateTheme(Request $request): RedirectResponse
    {
        $request->validate([
            'theme' => 'required|in:light,slate',
        ]);

        Auth::user()->update(['theme' => $request->theme]);

        return response()->json(['success' => true]);
    }
}
