import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Download, TrendingUp } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import SectionPanel from '@/Components/SectionPanel';
import KpiCard from '@/Components/KpiCard';

export default function Report({ kpis, vendorStats, locationStats }) {
    return (
        <AppLayout title="Switch Reports">
            <Head title="Switch Reports" />

            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('switches.index')}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Switches
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Switch Reports</h1>
                    </div>
                    <Link
                        href={route('switches.report.export')}
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                    </Link>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <KpiCard
                        title="Total Switches"
                        value={kpis.total}
                        icon={TrendingUp}
                    />
                    <KpiCard
                        title="Active Switches"
                        value={kpis.active}
                        icon={TrendingUp}
                    />
                    <KpiCard
                        title="Retired Switches"
                        value={kpis.retired}
                        icon={TrendingUp}
                    />
                    <KpiCard
                        title="Expiring Warranty"
                        value={kpis.expiring_warranty}
                        icon={TrendingUp}
                        trend="warning"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Vendor Distribution */}
                    <SectionPanel>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Vendor Distribution</h3>
                        <div className="space-y-4">
                            {vendorStats.map((stat) => (
                                <div key={stat.vendor} className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-medium text-gray-900">{stat.vendor}</span>
                                            <span className="text-sm text-gray-500">{stat.count} ({stat.percentage}%)</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full"
                                                style={{ width: `${stat.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {vendorStats.length === 0 && (
                                <p className="text-sm text-gray-500 text-center py-4">No data available</p>
                            )}
                        </div>
                    </SectionPanel>

                    {/* Location Distribution */}
                    <SectionPanel>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Location Distribution</h3>
                        <div className="space-y-4">
                            {locationStats.map((stat) => (
                                <div key={stat.location} className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-medium text-gray-900">{stat.location}</span>
                                            <span className="text-sm text-gray-500">{stat.count} ({stat.percentage}%)</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-green-600 h-2 rounded-full"
                                                style={{ width: `${stat.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {locationStats.length === 0 && (
                                <p className="text-sm text-gray-500 text-center py-4">No data available</p>
                            )}
                        </div>
                    </SectionPanel>
                </div>
            </div>
        </AppLayout>
    );
}