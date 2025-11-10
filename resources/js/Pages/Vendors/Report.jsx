import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Download, TrendingUp, DollarSign, Calendar, AlertTriangle } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import SectionPanel from '@/Components/SectionPanel';
import KpiCard from '@/Components/KpiCard';

export default function Report({ stats, topSpend, expiringContracts }) {
    return (
        <AppLayout>
            <Head title="Vendor Reports" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-foreground">Vendor Reports</h1>
                    <Link
                        href="/vendors/report/export"
                        className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                    </Link>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <KpiCard
                        title="Total Vendors"
                        value={stats.total_vendors}
                        icon={TrendingUp}
                    />
                    <KpiCard
                        title="Active Vendors"
                        value={stats.active_vendors}
                        icon={TrendingUp}
                    />
                    <KpiCard
                        title="Active Contracts"
                        value={stats.active_contracts}
                        icon={Calendar}
                    />
                    <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Contracts Expiring Soon</p>
                                <div className="flex space-x-4 mt-2">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-orange-600">{stats.expiring_30}</p>
                                        <p className="text-xs text-muted-foreground">≤30 days</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-yellow-600">{stats.expiring_60}</p>
                                        <p className="text-xs text-muted-foreground">≤60 days</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-red-600">{stats.expiring_90}</p>
                                        <p className="text-xs text-muted-foreground">≤90 days</p>
                                    </div>
                                </div>
                            </div>
                            <AlertTriangle className="w-8 h-8 text-orange-500" />
                        </div>
                    </div>
                </div>

                {/* Top Spend by Vendor */}
                <SectionPanel title="Top Spend by Vendor">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-border">
                                <tr>
                                    <th className="text-left py-3 px-4 font-medium">Vendor</th>
                                    <th className="text-left py-3 px-4 font-medium">Total Amount</th>
                                    <th className="text-left py-3 px-4 font-medium">Contract Count</th>
                                    <th className="text-left py-3 px-4 font-medium">Avg per Contract</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topSpend.map((vendor, index) => (
                                    <tr key={index} className="border-b border-border hover:bg-muted/50">
                                        <td className="py-3 px-4">
                                            <Link
                                                href={`/vendors/${vendor.id || ''}`}
                                                className="text-primary hover:underline font-medium"
                                            >
                                                {vendor.name}
                                            </Link>
                                        </td>
                                        <td className="py-3 px-4 font-medium">
                                            {vendor.total_amount ? `${vendor.total_amount.toLocaleString()} BDT` : 'N/A'}
                                        </td>
                                        <td className="py-3 px-4">
                                            {vendor.contract_count}
                                        </td>
                                        <td className="py-3 px-4">
                                            {vendor.contract_count > 0 && vendor.total_amount
                                                ? `${(vendor.total_amount / vendor.contract_count).toLocaleString()} BDT`
                                                : 'N/A'
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </SectionPanel>

                {/* Contracts Expiring Soon */}
                <SectionPanel title="Contracts Expiring Soon">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-border">
                                <tr>
                                    <th className="text-left py-3 px-4 font-medium">Vendor</th>
                                    <th className="text-left py-3 px-4 font-medium">Contract Title</th>
                                    <th className="text-left py-3 px-4 font-medium">Amount</th>
                                    <th className="text-left py-3 px-4 font-medium">End Date</th>
                                    <th className="text-left py-3 px-4 font-medium">Days Left</th>
                                    <th className="text-left py-3 px-4 font-medium">Priority</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expiringContracts.map((contract, index) => (
                                    <tr key={index} className="border-b border-border hover:bg-muted/50">
                                        <td className="py-3 px-4">
                                            <Link
                                                href={`/vendors/${contract.vendor_id || ''}`}
                                                className="text-primary hover:underline"
                                            >
                                                {contract.vendor_name}
                                            </Link>
                                        </td>
                                        <td className="py-3 px-4">
                                            <Link
                                                href={`/vendors/${contract.vendor_id || ''}/contracts/${contract.id}/edit`}
                                                className="text-primary hover:underline"
                                            >
                                                {contract.title}
                                            </Link>
                                        </td>
                                        <td className="py-3 px-4">
                                            {contract.amount ? `${contract.amount.toLocaleString()} ${contract.currency}` : 'N/A'}
                                        </td>
                                        <td className="py-3 px-4">
                                            {contract.end_on}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                contract.days_left <= 30
                                                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                    : contract.days_left <= 60
                                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                    : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                                            }`}>
                                                {contract.days_left} days
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                contract.days_left <= 30
                                                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                    : contract.days_left <= 60
                                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                    : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                                            }`}>
                                                {contract.days_left <= 30 ? 'High' : contract.days_left <= 60 ? 'Medium' : 'Low'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </SectionPanel>

                {/* Spend by Contract Type */}
                <SectionPanel title="Spend by Contract Type">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* This would be populated with actual data from backend */}
                        <div className="bg-card p-4 rounded-lg border border-border">
                            <h4 className="font-medium mb-2">AMC Contracts</h4>
                            <p className="text-2xl font-bold text-primary">
                                {topSpend.reduce((total, vendor) => total + (vendor.total_amount || 0), 0).toLocaleString()} BDT
                            </p>
                            <p className="text-sm text-muted-foreground">Total spend</p>
                        </div>
                        <div className="bg-card p-4 rounded-lg border border-border">
                            <h4 className="font-medium mb-2">Subscriptions</h4>
                            <p className="text-2xl font-bold text-primary">0 BDT</p>
                            <p className="text-sm text-muted-foreground">Total spend</p>
                        </div>
                        <div className="bg-card p-4 rounded-lg border border-border">
                            <h4 className="font-medium mb-2">Other Types</h4>
                            <p className="text-2xl font-bold text-primary">0 BDT</p>
                            <p className="text-sm text-muted-foreground">Total spend</p>
                        </div>
                    </div>
                </SectionPanel>
            </div>
        </AppLayout>
    );
}