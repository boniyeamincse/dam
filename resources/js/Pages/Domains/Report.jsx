import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Download, BarChart3, TrendingUp, AlertTriangle, Globe } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Report({ stats }) {
    const totalStatusData = [
        { name: 'Active', value: stats.active_domains, color: 'bg-green-500' },
        { name: 'Inactive', value: stats.inactive_domains, color: 'bg-gray-500' },
    ];

    const maxEnvironmentValue = Math.max(...stats.by_environment.map(item => item.value));

    const getPercentage = (value, total) => {
        return total > 0 ? Math.round((value / total) * 100) : 0;
    };

    const handleDownloadCSV = () => {
        router.get(route('domains.report.download'), {}, {
            onStart: () => {
                // Optional: Show loading state
            },
            onFinish: () => {
                // Optional: Hide loading state
            }
        });
    };

    return (
        <AppLayout title="Domain Reports">
            <Head title="Domain Reports" />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Domain Reports</h1>
                            <p className="text-gray-600 mt-1">Comprehensive overview of your domain assets</p>
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
                        {/* Total Domains */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                            <div className="flex items-center">
                                <div className="p-3 bg-blue-500 rounded-full">
                                    <Globe className="w-6 h-6 text-white" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-blue-600">Total Domains</p>
                                    <p className="text-2xl font-bold text-blue-900">{stats.total_domains}</p>
                                </div>
                            </div>
                        </div>

                        {/* Active vs Inactive */}
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                            <div className="flex items-center">
                                <div className="p-3 bg-green-500 rounded-full">
                                    <TrendingUp className="w-6 h-6 text-white" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-green-600">Active Domains</p>
                                    <p className="text-2xl font-bold text-green-900">{stats.active_domains}</p>
                                    <p className="text-xs text-green-600">
                                        {getPercentage(stats.active_domains, stats.total_domains)}% of total
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Expiring This Month */}
                        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 border border-yellow-200">
                            <div className="flex items-center">
                                <div className="p-3 bg-yellow-500 rounded-full">
                                    <AlertTriangle className="w-6 h-6 text-white" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-yellow-600">Expiring This Month</p>
                                    <p className="text-2xl font-bold text-yellow-900">{stats.expiring_this_month}</p>
                                    <p className="text-xs text-yellow-600">Requires attention</p>
                                </div>
                            </div>
                        </div>

                        {/* Inactive Count */}
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200">
                            <div className="flex items-center">
                                <div className="p-3 bg-gray-500 rounded-full">
                                    <BarChart3 className="w-6 h-6 text-white" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Inactive Domains</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.inactive_domains}</p>
                                    <p className="text-xs text-gray-600">
                                        {getPercentage(stats.inactive_domains, stats.total_domains)}% of total
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Status Distribution - Bar Chart */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Domain Status Distribution</h3>
                            <div className="space-y-4">
                                {totalStatusData.map((item) => (
                                    <div key={item.name}>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-medium text-gray-700">{item.name}</span>
                                            <span className="text-sm text-gray-500">{item.value} domains</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className={`h-3 rounded-full ${item.color}`}
                                                style={{
                                                    width: `${getPercentage(item.value, stats.total_domains)}%`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Environment Distribution - Donut Chart */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Domains by Environment</h3>
                            <div className="flex items-center justify-center">
                                <div className="relative w-48 h-48">
                                    {/* Simple CSS Donut Chart */}
                                    <svg viewBox="0 0 100 100" className="w-full h-full">
                                        {stats.by_environment.map((item, index) => {
                                            const percentage = getPercentage(item.value, stats.total_domains);
                                            const startAngle = stats.by_environment
                                                .slice(0, index)
                                                .reduce((sum, env) => sum + getPercentage(env.value, stats.total_domains), 0);
                                            const endAngle = startAngle + percentage;

                                            const startAngleRad = (startAngle * 2 * Math.PI) / 100 - Math.PI / 2;
                                            const endAngleRad = (endAngle * 2 * Math.PI) / 100 - Math.PI / 2;

                                            const x1 = 50 + 40 * Math.cos(startAngleRad);
                                            const y1 = 50 + 40 * Math.sin(startAngleRad);
                                            const x2 = 50 + 40 * Math.cos(endAngleRad);
                                            const y2 = 50 + 40 * Math.sin(endAngleRad);

                                            const largeArcFlag = percentage > 50 ? 1 : 0;

                                            const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
                                            const color = colors[index % colors.length];

                                            return (
                                                <path
                                                    key={item.name}
                                                    d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                                                    fill={color}
                                                />
                                            );
                                        })}
                                        <circle cx="50" cy="50" r="25" fill="white" />
                                        <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" className="text-xs font-semibold fill-gray-700">
                                            {stats.total_domains}
                                        </text>
                                        <text x="50" y="56" textAnchor="middle" dominantBaseline="middle" className="text-xs fill-gray-500">
                                            Total
                                        </text>
                                    </svg>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-4">
                                {stats.by_environment.map((item, index) => {
                                    const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500'];
                                    const color = colors[index % colors.length];
                                    return (
                                        <div key={item.name} className="flex items-center text-sm">
                                            <div className={`w-3 h-3 rounded-full mr-2 ${color}`}></div>
                                            <span className="text-gray-700">{item.name}:</span>
                                            <span className="ml-1 font-medium">{item.value}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Recent Domains Table */}
                    <div className="mt-8 bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Link
                                href={route('domains.index')}
                                className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                            >
                                <Globe className="w-8 h-8 text-blue-500 mr-3" />
                                <div>
                                    <h4 className="font-medium text-gray-900">View All Domains</h4>
                                    <p className="text-sm text-gray-500">Browse and manage domains</p>
                                </div>
                            </Link>

                            <Link
                                href={route('domains.create')}
                                className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                            >
                                <TrendingUp className="w-8 h-8 text-green-500 mr-3" />
                                <div>
                                    <h4 className="font-medium text-gray-900">Add New Domain</h4>
                                    <p className="text-sm text-gray-500">Register a new domain</p>
                                </div>
                            </Link>

                            <button
                                onClick={handleDownloadCSV}
                                className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                            >
                                <Download className="w-8 h-8 text-purple-500 mr-3" />
                                <div>
                                    <h4 className="font-medium text-gray-900">Export Data</h4>
                                    <p className="text-sm text-gray-500">Download CSV report</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}