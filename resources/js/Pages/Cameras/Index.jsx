import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Trash2, Search, Plus, Camera as CameraIcon, Copy, Archive, Download, Upload, Eye } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import StatusBadge from '@/Components/StatusBadge';
import KpiCard from '@/Components/KpiCard';

export default function Index({ cameras, filters }) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('cameras.index'), {
            ...filters,
            search: search,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleFilter = (key, value) => {
        router.get(route('cameras.index'), {
            ...filters,
            [key]: value,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleDelete = (camera) => {
        if (confirm(`Are you sure you want to delete camera "${camera.name}"?`)) {
            router.delete(route('cameras.destroy', camera.id));
        }
    };

    const handleDuplicate = (camera) => {
        if (confirm(`Are you sure you want to duplicate camera "${camera.name}"?`)) {
            router.post(route('cameras.duplicate', camera.id));
        }
    };

    const handleRetire = (camera) => {
        if (confirm(`Are you sure you want to retire camera "${camera.name}"?`)) {
            router.post(route('cameras.retire', camera.id));
        }
    };

    const formatLastSeen = (lastSeen) => {
        if (!lastSeen) return 'Never';

        const date = new Date(lastSeen);
        const now = new Date();
        const diffMs = now - date;
        const diffHours = diffMs / (1000 * 60 * 60);

        if (diffHours < 24) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (diffHours < 48) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString();
        }
    };

    const getLastSeenColor = (lastSeen) => {
        if (!lastSeen) return 'text-red-600 font-medium';
        const date = new Date(lastSeen);
        const now = new Date();
        const diffHours = (now - date) / (1000 * 60 * 60);

        if (diffHours > 24) return 'text-red-600 font-medium';
        if (diffHours > 1) return 'text-yellow-600';
        return 'text-green-600';
    };

    const hasActiveAlerts = (camera) => {
        return camera.alerts && camera.alerts.some(alert => alert.status === 'active');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-800';
            case 'Spare':
                return 'bg-blue-100 text-blue-800';
            case 'RMA':
                return 'bg-yellow-100 text-yellow-800';
            case 'Retired':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AppLayout title="View Cameras">
            <Head title="View Cameras" />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">View Cameras</h1>
                            <p className="text-gray-600 mt-1">Manage and monitor your camera assets</p>
                        </div>
                        <div className="flex gap-2">
                            <Link href={route('cameras.export')}>
                                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <Download className="w-4 h-4 mr-2" />
                                    Export CSV
                                </button>
                            </Link>
                            <Link href={route('cameras.create')}>
                                <PrimaryButton className="flex items-center">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Camera
                                </PrimaryButton>
                            </Link>
                        </div>
                    </div>

                    {/* Filters and Search */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <TextInput
                                        type="text"
                                        placeholder="Search by name, tag, vendor, model, IP, hostname..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-10 w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <select
                                    value={filters.status || ''}
                                    onChange={(e) => handleFilter('status', e.target.value)}
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-sm"
                                >
                                    <option value="">All Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Spare">Spare</option>
                                    <option value="RMA">RMA</option>
                                    <option value="Retired">Retired</option>
                                </select>
                                <label className="flex items-center text-sm">
                                    <input
                                        type="checkbox"
                                        checked={filters.has_alerts || false}
                                        onChange={(e) => handleFilter('has_alerts', e.target.checked ? '1' : '')}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mr-2"
                                    />
                                    With Alerts
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800"
                                >
                                    {showFilters ? 'Hide' : 'More'} Filters
                                </button>
                            </div>
                        </form>

                        {showFilters && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
                                        <select
                                            value={filters.location || ''}
                                            onChange={(e) => handleFilter('location', e.target.value)}
                                            className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-sm"
                                        >
                                            <option value="">All Locations</option>
                                            {/* TODO: Load from backend */}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Vendor</label>
                                        <select
                                            value={filters.vendor || ''}
                                            onChange={(e) => handleFilter('vendor', e.target.value)}
                                            className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-sm"
                                        >
                                            <option value="">All Vendors</option>
                                            {/* TODO: Load from backend */}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Model</label>
                                        <TextInput
                                            type="text"
                                            placeholder="Filter by model..."
                                            value={filters.model || ''}
                                            onChange={(e) => handleFilter('model', e.target.value)}
                                            className="w-full text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Firmware</label>
                                        <TextInput
                                            type="text"
                                            placeholder="Filter by firmware..."
                                            value={filters.os_firmware || ''}
                                            onChange={(e) => handleFilter('os_firmware', e.target.value)}
                                            className="w-full text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bulk Actions */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex gap-2">
                            <Link href={route('cameras.export')} className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <Download className="w-4 h-4 mr-2" />
                                Export CSV
                            </Link>
                            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <Upload className="w-4 h-4 mr-2" />
                                Bulk Import
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            {cameras.data.length > 0 && (
                                <caption className="bg-gray-50 px-6 py-3 text-left text-sm font-medium text-gray-500">
                                    Showing {((cameras.current_page - 1) * cameras.per_page) + 1} to{' '}
                                    {Math.min(cameras.current_page * cameras.per_page, cameras.total)} of{' '}
                                    {cameras.total} cameras
                                </caption>
                            )}
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tag
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Vendor/Model
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Management IP
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Location
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Firmware
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Last Seen
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {cameras.data.map((camera) => (
                                    <tr key={camera.id} className={hasActiveAlerts(camera) ? 'bg-yellow-50' : ''}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {camera.name}
                                            </div>
                                            {camera.network?.hostname && (
                                                <div className="text-sm text-gray-500">
                                                    {camera.network.hostname}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {camera.tag}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {camera.vendor?.name || 'Unknown'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {camera.model}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {camera.network?.mgmt_ip || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {camera.location?.name || 'Unknown'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge status={camera.status} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {camera.network?.os_firmware || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={getLastSeenColor(camera.last_seen)}>
                                                {formatLastSeen(camera.last_seen)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center space-x-2">
                                                <Link
                                                    href={route('cameras.show', camera.id)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={route('cameras.edit', camera.id)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDuplicate(camera)}
                                                    className="text-green-600 hover:text-green-900"
                                                    title="Duplicate"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                </button>
                                                {camera.status !== 'Retired' && (
                                                    <button
                                                        onClick={() => handleRetire(camera)}
                                                        className="text-yellow-600 hover:text-yellow-900"
                                                        title="Retire"
                                                    >
                                                        <Archive className="w-4 h-4" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(camera)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {cameras.last_page > 1 && (
                        <div className="mt-6">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Showing {((cameras.current_page - 1) * cameras.per_page) + 1} to{' '}
                                    {Math.min(cameras.current_page * cameras.per_page, cameras.total)} of{' '}
                                    {cameras.total} results
                                </div>
                                <div className="flex space-x-1">
                                    {cameras.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`px-3 py-2 text-sm border rounded ${
                                                link.active
                                                    ? 'bg-indigo-50 border-indigo-500 text-indigo-600'
                                                    : 'border-gray-300 text-gray-500 hover:bg-gray-50'
                                            } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                            preserveState
                                            preserveScroll
                                        >
                                            {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {cameras.data.length === 0 && (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CameraIcon className="w-10 h-10 text-green-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {cameras.length === 0 ? 'No cameras found' : 'No matching cameras'}
                            </h3>
                            <p className="text-gray-500 mb-4">
                                {Object.keys(filters).some(key => filters[key] && filters[key] !== '')
                                    ? 'No cameras match your current filters.'
                                    : 'Get started by adding your first camera.'}
                            </p>
                            <Link href={route('cameras.create')}>
                                <PrimaryButton>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Camera
                                </PrimaryButton>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}