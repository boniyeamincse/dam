@extends('layouts.app')

@section('content')
<div class="mb-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-2">Akij Group Assets Management</h1>
    <p class="text-gray-600">Welcome to your asset management dashboard.</p>
</div>

<!-- Placeholder Cards -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div class="text-center py-12">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Domains</h3>
            <p class="text-gray-600">Manage your domains</p>
        </div>
    </div>

    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div class="text-center py-12">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Routers</h3>
            <p class="text-gray-600">Monitor your routers</p>
        </div>
    </div>

    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div class="text-center py-12">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Switches</h3>
            <p class="text-gray-600">Control your switches</p>
        </div>
    </div>

    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div class="text-center py-12">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Servers</h3>
            <p class="text-gray-600">Manage your servers</p>
        </div>
    </div>

    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div class="text-center py-12">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Settings</h3>
            <p class="text-gray-600">Configure your preferences</p>
        </div>
    </div>
</div>
@endsection
