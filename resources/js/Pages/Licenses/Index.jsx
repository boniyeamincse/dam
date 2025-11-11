import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Trash2, Search, Plus, FileText, AlertTriangle, Calendar, Users, BarChart3, Download, Upload } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import StatusBadge from '@/Components/StatusBadge';

export default function Index({ licenses, filters }) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('licenses.index'), {
            ...filters,
            search: search,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleFilter = (key, value) => {
        router.get(route('licenses.index'), {
            ...filters,
            [key]: value,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleDelete = (license) => {
        if (confirm(`Are you sure you want to delete license "${license.name}"?`)) {
            router.delete(route('licenses.destroy', license.id));
        }
    };

    const formatDate = (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString();
    };

    const getComplianceColor = (status) => {
        switch (status) {
            case 'Licensed':
                return 'text-green-600';
            case 'Unlicensed':
            case 'Nulled':
                return 'text-red-600';
            case 'Trial':
            case 'Evaluation':
                return 'text-yellow-600';
            default:
                return 'text-gray-600';
        }
    };

    const getExpirationStatus = (license) => {
        if (!license.expiration_date) return null;

        const days = Math.ceil((new Date(license.expiration_date) - new Date()) / (1000 * 60 * 60 * 24));

        if (days < 0) return { status: 'expired', color: 'text-red-600', text: 'Expired' };
        if (days <= 30) return { status: 'expiring', color: 'text-yellow-600', text: `${days} days` };
        return null;
    };

    return (
        <AppLayout title="License Compliance">
            <Head title="License Compliance" />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">License Compliance</h1>
                            <p className="text-gray-600 mt-1">Manage software licenses and compliance</p>
                        </div>
                        <div className="flex gap-2">
                            <Link href={route('licenses.import')}>
                                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <Upload className="w-4 h-4 mr-2" />
                                    Import CSV
                                </button>
                            </Link>
                            <Link href={route('licenses.create')}>
                                <PrimaryButton className="flex items-center">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add License
                                </PrimaryButton>
                            </Link>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                        <Link href={route('licenses.inventory')} className="flex flex-col items-center p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                            <FileText className="w-6 h-6 text-blue-600 mb-2" />
                            <span className="text-xs font-medium text-blue-900">Inventory</span>
                        </Link>
                        <Link href={route('licenses.compliance')} className="flex flex-col items-center p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                            <BarChart3 className="w-6 h-6 text-green-600 mb-2" />
                            <span className="text-xs font-medium text-green-900">Compliance</span>
                        </Link>
                        <Link href={route('licenses.calendar')} className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition-colors">
                            <Calendar className="w-6 h-6 text-yellow-600 mb-2" />
                            <span className="text-xs font-medium text-yellow-900">Calendar</span>
                        </Link>
                        <Link href={route('licenses.evidence')} className="flex flex-col items-center p-4 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors">
                            <FileText className="w-6 h-6 text-purple-600 mb-2" />
                            <span className="text-xs font-medium text-purple-900">Evidence</span>
                        </Link>
                        <Link href={route('licenses.vendors')} className="flex flex-col items-center p-4 bg-indigo-50 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-colors">
                            <Users className="w-6 h-6 text-indigo-600 mb-2" />
                            <span className="text-xs font-medium text-indigo-900">Vendors</span>
                        </Link>
                        <Link href={route('licenses.report')} className="flex flex-col items-center p-4 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors">
                            <AlertTriangle className="w-6 h-6 text-red-600 mb-2" />
                            <span className="text-xs font-medium text-red-900">Alerts</span>
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
                                        placeholder="Search by name, product key, license key, version..."
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
                                    <option value="Expired">Expired</option>
                                    <option value="Suspended">Suspended</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                                <select
                                    value={filters.compliance_status || ''}
                                    onChange={(e) => handleFilter('compliance_status', e.target.value)}
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-sm"
                                >
                                    <option value="">All Compliance</option>
                                    <option value="Licensed">Licensed</option>
                                    <option value="Unlicensed">Unlicensed</option>
                                    <option value="Nulled">Nulled</option>
                                    <option value="Trial">Trial</option>
                                    <option value="Evaluation">Evaluation</option>
                                </select>
                                <label className="flex items-center text-sm">
                                    <input
                                        type="checkbox"
                                        checked={filters.expiring_soon || false}
                                        onChange={(e) => handleFilter('expiring_soon', e.target.checked ? '1' : '')}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mr-2"
                                    />
                                    Expiring Soon
                                </label>
                                <label className="flex items-center text-sm">
                                    <input
                                        type="checkbox"
                                        checked={filters.expired || false}
                                        onChange={(e) => handleFilter('expired', e.target.checked ? '1' : '')}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mr-2"
                                    />
                                    Expired
                                </label>
                            </div>
                        </form>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            {licenses.data.length > 0 && (
                                <caption className="bg-gray-50 px-6 py-3 text-left text-sm font-medium text-gray-500">
                                    Showing {((licenses.current_page - 1) * licenses.per_page) + 1} to{' '}
                                    {Math.min(licenses.current_page * licenses.per_page, licenses.total)} of{' '}
                                    {licenses.total} licenses
                                </caption>
                            )}
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Software
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Vendor
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Version
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        License Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Compliance
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Installations
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Expiration
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {licenses.data.map((license) => {
                                    const expirationStatus = getExpirationStatus(license);
                                    return (
                                        <tr key={license.id} className={expirationStatus ? 'bg-yellow-50' : ''}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {license.name}
                                                </div>
                                                {license.product_key && (
                                                    <div className="text-sm text-gray-500">
                                                        Key: {license.product_key}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {license.vendor?.name || 'Unknown'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {license.version || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <StatusBadge status={license.status} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`text-sm font-medium ${getComplianceColor(license.compliance_status)}`}>
                                                    {license.compliance_status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {license.installations_count}/{license.quantity}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className={expirationStatus ? expirationStatus.color : 'text-gray-900'}>
                                                    {formatDate(license.expiration_date)}
                                                </div>
                                                {expirationStatus && (
                                                    <div className="text-xs text-gray-500">
                                                        {expirationStatus.text}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center space-x-2">
                                                    <Link
                                                        href={route('licenses.show', license.id)}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                        title="View Details"
                                                    >
                                                        <FileText className="w-4 h-4" />
                                                    </Link>
                                                    <Link
                                                        href={route('licenses.edit', license.id)}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(license)}
                                                        className="text-red-600 hover:text-red-900"
                                                        title="Delete"
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
                    {licenses.last_page > 1 && (
                        <div className="mt-6">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Showing {((licenses.current_page - 1) * licenses.per_page) + 1} to{' '}
                                    {Math.min(licenses.current_page * licenses.per_page, licenses.total)} of{' '}
                                    {licenses.total} results
                                </div>
                                <div className="flex space-x-1">
                                    {licenses.links.map((link, index) => (
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

                    {licenses.data.length === 0 && (
                        <div className="text-center py-16">
                            <FileText className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {licenses.length === 0 ? 'No licenses found' : 'No matching licenses'}
                            </h3>
                            <p className="text-gray-500 mb-4">
                                {Object.keys(filters).some(key => filters[key] && filters[key] !== '')
                                    ? 'No licenses match your current filters.'
                                    : 'Get started by adding your first software license.'}
                            </p>
                            <Link href={route('licenses.create')}>
                                <PrimaryButton>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add License
                                </PrimaryButton>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}