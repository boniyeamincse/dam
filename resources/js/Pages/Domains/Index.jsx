import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Trash2, Search, Plus } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Index({ domains, filters }) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('domains.index'), {
            ...filters,
            search: search,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleFilter = (key, value) => {
        router.get(route('domains.index'), {
            ...filters,
            [key]: value,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleDelete = (domain) => {
        if (confirm(`Are you sure you want to delete domain "${domain.asset_id}"?`)) {
            router.delete(route('domains.destroy', domain.id));
        }
    };

    const isExpiringSoon = (expiryDate) => {
        if (!expiryDate) return false;
        const expiry = new Date(expiryDate);
        const now = new Date();
        const thirtyDaysFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
        return expiry <= thirtyDaysFromNow;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-800';
            case 'Deactive':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <AppLayout title="View Domains">
            <Head title="View Domains" />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">View Domains</h1>
                            <p className="text-gray-600 mt-1">Manage and monitor your domain assets</p>
                        </div>
                        <Link href={route('domains.create')}>
                            <PrimaryButton className="flex items-center">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Domain
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
                                        placeholder="Search by asset ID, URL, registrar, or business unit..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-10 w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <select
                                    value={filters.type || ''}
                                    onChange={(e) => handleFilter('type', e.target.value)}
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                >
                                    <option value="">All Types</option>
                                    <option value="domain">Domain</option>
                                    <option value="subdomain">Subdomain</option>
                                </select>
                                <select
                                    value={filters.status || ''}
                                    onChange={(e) => handleFilter('status', e.target.value)}
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                >
                                    <option value="">All Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Deactive">Deactive</option>
                                </select>
                                <select
                                    value={filters.environment || ''}
                                    onChange={(e) => handleFilter('environment', e.target.value)}
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                >
                                    <option value="">All Environments</option>
                                    <option value="Planning">Planning</option>
                                    <option value="Development">Development</option>
                                    <option value="Testing">Testing</option>
                                    <option value="Production">Production</option>
                                </select>
                            </div>
                        </form>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Domain
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Expiry Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Registrar
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Environment
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Business Unit
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {domains.data.map((domain) => {
                                    const expiringSoon = isExpiringSoon(domain.expiry_date);
                                    return (
                                        <tr key={domain.id} className={expiringSoon ? 'bg-yellow-50' : ''}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {domain.primary_url}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {domain.asset_id}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-900 capitalize">
                                                    {domain.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(domain.status)}`}>
                                                    {domain.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`text-sm ${expiringSoon ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                                                    {new Date(domain.expiry_date).toLocaleDateString()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {domain.registrar}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {domain.environment}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {domain.business_unit}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center space-x-2">
                                                    <Link
                                                        href={route('domains.edit', domain.id)}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(domain)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {domains.last_page > 1 && (
                        <div className="mt-6">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Showing {((domains.current_page - 1) * domains.per_page) + 1} to{' '}
                                    {Math.min(domains.current_page * domains.per_page, domains.total)} of{' '}
                                    {domains.total} results
                                </div>
                                <div className="flex space-x-1">
                                    {domains.links.map((link, index) => (
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

                    {domains.data.length === 0 && (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-10 h-10 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No domains found</h3>
                            <p className="text-gray-500 mb-4">
                                {filters.search || filters.type || filters.status || filters.environment
                                    ? 'Try adjusting your search or filters.'
                                    : 'Get started by adding your first domain.'}
                            </p>
                            <Link href={route('domains.create')}>
                                <PrimaryButton>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Domain
                                </PrimaryButton>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}