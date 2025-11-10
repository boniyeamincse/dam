import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Trash2, Search, Plus, Router as RouterIcon, Copy, Archive, Download, Upload } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Index({ routers, filters }) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('routers.index'), {
            ...filters,
            search: search,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleFilter = (key, value) => {
        router.get(route('routers.index'), {
            ...filters,
            [key]: value,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleDelete = (router) => {
        if (confirm(`Are you sure you want to delete router "${router.name}"?`)) {
            router.delete(route('routers.destroy', router.id));
        }
    };

    const handleDuplicate = (router) => {
        if (confirm(`Are you sure you want to duplicate router "${router.name}"?`)) {
            router.post(route('routers.duplicate', router.id));
        }
    };

    const handleRetire = (router) => {
        if (confirm(`Are you sure you want to retire router "${router.name}"?`)) {
            router.post(route('routers.retire', router.id));
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

    const filteredRouters = routers.filter(router =>
        router.name.toLowerCase().includes(search.toLowerCase()) ||
        router.asset_tag.toLowerCase().includes(search.toLowerCase()) ||
        router.vendor.toLowerCase().includes(search.toLowerCase()) ||
        router.model.toLowerCase().includes(search.toLowerCase()) ||
        router.mgmt_ip.includes(search) ||
        router.location.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AppLayout title="Routers">
            <Head title="Routers" />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Routers</h1>
                            <p className="text-gray-600 mt-1">Manage and monitor your router assets</p>
                        </div>
                        <Link href={route('routers.create')}>
                            <PrimaryButton className="flex items-center">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Router
                            </PrimaryButton>
                        </Link>
                    </div>

                    {/* Filters and Search */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <TextInput
                                        type="text"
                                        placeholder="Search by name, asset tag, vendor, model, IP, or location..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-10 w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <select
                                    value={filters.status || ''}
                                    onChange={(e) => handleFilter('status', e.target.value)}
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                >
                                    <option value="">All Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Spare">Spare</option>
                                    <option value="RMA">RMA</option>
                                    <option value="Retired">Retired</option>
                                </select>
                                <select
                                    value={filters.location || ''}
                                    onChange={(e) => handleFilter('location', e.target.value)}
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                >
                                    <option value="">All Locations</option>
                                    {/* We'll populate this dynamically in the future */}
                                </select>
                                <select
                                    value={filters.vendor || ''}
                                    onChange={(e) => handleFilter('vendor', e.target.value)}
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                >
                                    <option value="">All Vendors</option>
                                    {/* We'll populate this dynamically in the future */}
                                </select>
                                <select
                                    value={filters.model || ''}
                                    onChange={(e) => handleFilter('model', e.target.value)}
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                >
                                    <option value="">All Models</option>
                                    {/* We'll populate this dynamically in the future */}
                                </select>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={filters.alerts_only || false}
                                        onChange={(e) => handleFilter('alerts_only', e.target.checked ? '1' : '')}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Alerts Only</span>
                                </label>
                            </div>
                        </form>
                    </div>

                    {/* Bulk Actions */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex gap-2">
                            <Link href={route('routers.export')} className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
                            {routers.data.length > 0 && (
                                <caption className="bg-gray-50 px-6 py-3 text-left text-sm font-medium text-gray-500">
                                    Showing {((routers.current_page - 1) * routers.per_page) + 1} to{' '}
                                    {Math.min(routers.current_page * routers.per_page, routers.total)} of{' '}
                                    {routers.total} routers
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
                                {routers.data.map((router) => (
                                    <tr key={router.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {router.name}
                                            </div>
                                            {router.hostname && (
                                                <div className="text-sm text-gray-500">
                                                    {router.hostname}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {router.asset_tag}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {router.vendor}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {router.model}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {router.mgmt_ip}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {router.location}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(router.status)}`}>
                                                {router.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {router.os_firmware || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={getLastSeenColor(router.last_seen)}>
                                                {formatLastSeen(router.last_seen)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center space-x-2">
                                                <Link
                                                    href={route('routers.show', router.id)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    title="View"
                                                >
                                                    <RouterIcon className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={route('routers.edit', router.id)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDuplicate(router)}
                                                    className="text-green-600 hover:text-green-900"
                                                    title="Duplicate"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                </button>
                                                {router.status !== 'Retired' && (
                                                    <button
                                                        onClick={() => handleRetire(router)}
                                                        className="text-yellow-600 hover:text-yellow-900"
                                                        title="Retire"
                                                    >
                                                        <Archive className="w-4 h-4" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(router)}
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
                    {routers.last_page > 1 && (
                        <div className="mt-6">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Showing {((routers.current_page - 1) * routers.per_page) + 1} to{' '}
                                    {Math.min(routers.current_page * routers.per_page, routers.total)} of{' '}
                                    {routers.total} results
                                </div>
                                <div className="flex space-x-1">
                                    {routers.links.map((link, index) => (
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

                    {routers.data.length === 0 && (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <RouterIcon className="w-10 h-10 text-green-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {routers.length === 0 ? 'No routers found' : 'No matching routers'}
                            </h3>
                            <p className="text-gray-500 mb-4">
                                {Object.keys(filters).some(key => filters[key] && filters[key] !== '')
                                    ? 'No routers match your current filters.'
                                    : 'Get started by adding your first router.'}
                            </p>
                            <Link href={route('routers.create')}>
                                <PrimaryButton>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Router
                                </PrimaryButton>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}