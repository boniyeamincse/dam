<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name', 'Laravel') }}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@3.4.0/dist/tailwind.min.css">
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
</head>
<body class="min-h-screen bg-gray-50">
    <div class="min-h-screen flex">
        <!-- Sidebar -->
        <div class="w-64 bg-white shadow-lg flex-shrink-0">
            <!-- Logo area -->
            <div class="flex items-center justify-center h-16 px-4 border-b border-gray-200">
                <h1 class="text-xl font-bold text-gray-900">AKIJ</h1>
            </div>

            <!-- Navigation -->
            <nav class="px-4 py-6 space-y-2">
                <a href="{{ route('dashboard') }}" class="group flex items-center px-3 py-2 text-sm font-medium rounded-lg {{ request()->routeIs('dashboard') ? 'bg-indigo-50 text-indigo-700 border-l-2 border-indigo-700' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900' }}">
                    <i data-lucide="home" class="w-5 h-5 mr-3 flex-shrink-0"></i>
                    Dashboard
                </a>
                <a href="{{ route('domains') }}" class="group flex items-center px-3 py-2 text-sm font-medium rounded-lg {{ request()->routeIs('domains') ? 'bg-indigo-50 text-indigo-700 border-l-2 border-indigo-700' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900' }}">
                    <i data-lucide="globe" class="w-5 h-5 mr-3 flex-shrink-0"></i>
                    Domain
                </a>
                <a href="{{ route('routers') }}" class="group flex items-center px-3 py-2 text-sm font-medium rounded-lg {{ request()->routeIs('routers') ? 'bg-indigo-50 text-indigo-700 border-l-2 border-indigo-700' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900' }}">
                    <i data-lucide="router" class="w-5 h-5 mr-3 flex-shrink-0"></i>
                    Router
                </a>
                <a href="{{ route('switches') }}" class="group flex items-center px-3 py-2 text-sm font-medium rounded-lg {{ request()->routeIs('switches') ? 'bg-indigo-50 text-indigo-700 border-l-2 border-indigo-700' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900' }}">
                    <i data-lucide="git-merge" class="w-5 h-5 mr-3 flex-shrink-0"></i>
                    Switch
                </a>
                <a href="{{ route('servers') }}" class="group flex items-center px-3 py-2 text-sm font-medium rounded-lg {{ request()->routeIs('servers') ? 'bg-indigo-50 text-indigo-700 border-l-2 border-indigo-700' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900' }}">
                    <i data-lucide="server" class="w-5 h-5 mr-3 flex-shrink-0"></i>
                    Server
                </a>
                @role('Org Admin')
                <a href="{{ route('settings') }}" class="group flex items-center px-3 py-2 text-sm font-medium rounded-lg {{ request()->routeIs('settings') ? 'bg-indigo-50 text-indigo-700 border-l-2 border-indigo-700' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900' }}">
                    <i data-lucide="settings" class="w-5 h-5 mr-3 flex-shrink-0"></i>
                    Setting
                </a>
                @endrole
            </nav>
        </div>

        <!-- Main content -->
        <div class="flex-1 flex flex-col">
            <!-- Content area -->
            <main class="flex-1">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {{ $slot }}
                </div>
            </main>

            <!-- Footer -->
            <footer class="bg-white border-t border-gray-200">
                <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
                    © 2025 Akij Group. All rights reserved.
                </div>
            </footer>
        </div>
    </div>

    <script>
        lucide.createIcons();
    </script>
</body>
</html>