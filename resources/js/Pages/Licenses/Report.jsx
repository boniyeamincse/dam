import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Download, BarChart3, TrendingUp, AlertTriangle, FileText, Calendar, CheckCircle, XCircle, Clock, DollarSign } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Report({ stats }) {
    const getPercentage = (value, total) => {
        return total > 0 ? Math.round((value / total) * 100) : 0;
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount || 0);
    };

    const handleDownloadCSV = () => {
        router.get(route('licenses.export'), {}, {
            onStart: () => {
                // Optional: Show loading state
            },
            onFinish: () => {
                // Optional: Hide loading state
            }
        });
    };

    return (
        <AppLayout title="License Reports">
            <Head title="License Reports" />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">License Reports</h1>
                            <p className="text-gray-600 mt-1">Comprehensive overview of your software licenses</p>
                        </div>
                        <PrimaryButton
                            onClick={handleDownloadCSV}
                            className="flex items-center"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download CSV
                        </PrimaryButton>
                    </div>

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Total Licenses */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                            <div className="flex items-center">
                                <div className="p-3 bg-blue-500 rounded-full">
                                    <FileText className="w-6 h-6 text-white" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-blue-600">Total Licenses</p>
                                    <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
                                </div>
                            </div>
                        </div>

                        {/* Active Licenses */}
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                            <div className="flex items-center">
                                <div className="p-3 bg-green-500 rounded-full">
                                    <CheckCircle className="w-6 h-6 text-white" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-green-600">Active Licenses</p>
                                    <p className="text-2xl font-bold text-green-900">{stats.active}</p>
                                    <p className="text-xs text-green-600">
                                        {getPercentage(stats.active, stats.total)}% of total
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Expired Licenses */}
                        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 border border-red-200">
                            <div className="flex items-center">
                                <div className="p-3 bg-red-500 rounded-full">
                                    <XCircle className="w-6 h-6 text-white" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-red-600">Expired Licenses</p>
                                    <p className="text-2xl font-bold text-red-900">{stats.expired}</p>
                                    <p className="text-xs text-red-600">Requires attention</p>
                                </div>
                            </div>
                        </div>

                        {/* Expiring Soon */}
                        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 border border-yellow-200">
                            <div className="flex items-center">
                                <div className="p-3 bg-yellow-500 rounded-full">
                                    <Clock className="w-6 h-6 text-white" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-yellow-600">Expiring Soon</p>
                                    <p className="text-2xl font-bold text-yellow-900">{stats.expiring_soon}</p>
                                    <p className="text-xs text-yellow-600">Next 30 days</p>
                                </div>
                            </div>
                        </div>

                        {/* Compliant Licenses */}
                        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-6 border border-emerald-200">
                            <div className="flex items-center">
                                <div className="p-3 bg-emerald-500 rounded-full">
                                    <TrendingUp className="w-6 h-6 text-white" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-emerald-600">Compliant</p>
                                    <p className="text-2xl font-bold text-emerald-900">{stats.compliant}</p>
                                    <p className="text-xs text-emerald-600">
                                        {getPercentage(stats.compliant, stats.total)}% of total
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Total Cost */}
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                            <div className="flex items-center">
                                <div className="p-3 bg-purple-500 rounded-full">
                                    <DollarSign className="w-6 h-6 text-white" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-purple-600">Total Cost</p>
                                    <p className="text-2xl font-bold text-purple-900">{formatCurrency(stats.total_cost)}</p>
                                    <p className="text-xs text-purple-600">All licenses</p>
                                </div>
                            </div>
                        </div>

                        {/* Average Cost */}
                        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-6 border border-indigo-200">
                            <div className="flex items-center">
                                <div className="p-3 bg-indigo-500 rounded-full">
                                    <BarChart3 className="w-6 h-6 text-white" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-indigo-600">Average Cost</p>
                                    <p className="text-2xl font-bold text-indigo-900">{formatCurrency(stats.average_cost)}</p>
                                    <p className="text-xs text-indigo-600">Per license</p>
                                </div>
                            </div>
                        </div>

                        {/* Compliance Rate */}
                        <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-6 border border-teal-200">
                            <div className="flex items-center">
                                <div className="p-3 bg-teal-500 rounded-full">
                                    <AlertTriangle className="w-6 h-6 text-white" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-teal-600">Compliance Rate</p>
                                    <p className="text-2xl font-bold text-teal-900">{getPercentage(stats.compliant, stats.total)}%</p>
                                    <p className="text-xs text-teal-600">Overall</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Status Distribution */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">License Status Distribution</h3>
                            <div className="space-y-4">
                                {Object.entries(stats.by_status).map(([status, count]) => (
                                    <div key={status}>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-medium text-gray-700">{status}</span>
                                            <span className="text-sm text-gray-500">{count} licenses</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className={`h-3 rounded-full ${
                                                    status === 'Active' ? 'bg-green-500' :
                                                    status === 'Expired' ? 'bg-red-500' :
                                                    status === 'Suspended' ? 'bg-yellow-500' :
                                                    'bg-gray-500'
                                                }`}
                                                style={{
                                                    width: `${getPercentage(count, stats.total)}%`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Compliance Distribution */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Status Distribution</h3>
                            <div className="space-y-4">
                                {Object.entries(stats.by_compliance).map(([compliance, count]) => (
                                    <div key={compliance}>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-medium text-gray-700">{compliance}</span>
                                            <span className="text-sm text-gray-500">{count} licenses</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className={`h-3 rounded-full ${
                                                    compliance === 'Licensed' ? 'bg-green-500' :
                                                    compliance === 'Unlicensed' ? 'bg-red-500' :
                                                    compliance === 'Nulled' ? 'bg-red-500' :
                                                    compliance === 'Trial' ? 'bg-blue-500' :
                                                    'bg-yellow-500'
                                                }`}
                                                style={{
                                                    width: `${getPercentage(count, stats.total)}%`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Vendor Distribution */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Licenses by Vendor</h3>
                            <div className="space-y-4">
                                {Object.entries(stats.by_vendor).map(([vendor, count]) => (
                                    <div key={vendor}>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-medium text-gray-700">{vendor}</span>
                                            <span className="text-sm text-gray-500">{count} licenses</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className="h-3 rounded-full bg-indigo-500"
                                                style={{
                                                    width: `${getPercentage(count, stats.total)}%`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cost Analysis */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Analysis</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">Total Investment</span>
                                    <span className="text-lg font-bold text-gray-900">{formatCurrency(stats.total_cost)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">Average Cost/License</span>
                                    <span className="text-lg font-bold text-gray-900">{formatCurrency(stats.average_cost)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">Active Licenses</span>
                                    <span className="text-lg font-bold text-green-600">{stats.active}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">Expired Licenses</span>
                                    <span className="text-lg font-bold text-red-600">{stats.expired}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-8 bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Link
                                href={route('licenses.index')}
                                className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                            >
                                <FileText className="w-8 h-8 text-blue-500 mr-3" />
                                <div>
                                    <h4 className="font-medium text-gray-900">View All Licenses</h4>
                                    <p className="text-sm text-gray-500">Browse and manage licenses</p>
                                </div>
                            </Link>

                            <Link
                                href={route('licenses.compliance')}
                                className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                            >
                                <AlertTriangle className="w-8 h-8 text-red-500 mr-3" />
                                <div>
                                    <h4 className="font-medium text-gray-900">Compliance Dashboard</h4>
                                    <p className="text-sm text-gray-500">Monitor compliance status</p>
                                </div>
                            </Link>

                            <Link
                                href={route('licenses.calendar')}
                                className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                            >
                                <Calendar className="w-8 h-8 text-yellow-500 mr-3" />
                                <div>
                                    <h4 className="font-medium text-gray-900">Expiration Calendar</h4>
                                    <p className="text-sm text-gray-500">Track renewal dates</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}