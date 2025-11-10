import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Calendar, DollarSign, Building, FileText, Eye, Edit, Trash2 } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import SectionPanel from '@/Components/SectionPanel';
import StatusBadge from '@/Components/StatusBadge';

export default function GlobalIndex({ contracts }) {
    const [filterStatus, setFilterStatus] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterExpiring, setFilterExpiring] = useState('');

    const handleDelete = (contractId) => {
        if (confirm('Are you sure you want to delete this contract?')) {
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = `/vendors/contracts/${contractId}`;
            form.innerHTML = '<input type="hidden" name="_method" value="DELETE"><input type="hidden" name="_token" value="' + document.querySelector('meta[name="csrf-token"]').getAttribute('content') + '">';
            document.body.appendChild(form);
            form.submit();
        }
    };

    return (
        <AppLayout>
            <Head title="All Contracts" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-foreground">All Contracts</h1>
                </div>

                {/* Filters */}
                <SectionPanel>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                            >
                                <option value="">All Status</option>
                                <option value="Active">Active</option>
                                <option value="Expired">Expired</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                            >
                                <option value="">All Types</option>
                                <option value="AMC">AMC</option>
                                <option value="Warranty">Warranty</option>
                                <option value="Subscription">Subscription</option>
                                <option value="Lease">Lease</option>
                                <option value="Support">Support</option>
                            </select>
                        </div>
                        <div>
                            <select
                                value={filterExpiring}
                                onChange={(e) => setFilterExpiring(e.target.value)}
                                className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                            >
                                <option value="">All Expirations</option>
                                <option value="30">Expiring ≤ 30 days</option>
                                <option value="60">Expiring ≤ 60 days</option>
                                <option value="90">Expiring ≤ 90 days</option>
                            </select>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                            >
                                Filter
                            </button>
                        </div>
                    </div>
                </SectionPanel>

                {/* Contracts Table */}
                <SectionPanel>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-border">
                                <tr>
                                    <th className="text-left py-3 px-4 font-medium">Contract</th>
                                    <th className="text-left py-3 px-4 font-medium">Vendor</th>
                                    <th className="text-left py-3 px-4 font-medium">Type</th>
                                    <th className="text-left py-3 px-4 font-medium">Amount</th>
                                    <th className="text-left py-3 px-4 font-medium">End Date</th>
                                    <th className="text-left py-3 px-4 font-medium">Days Left</th>
                                    <th className="text-left py-3 px-4 font-medium">Status</th>
                                    <th className="text-right py-3 px-4 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contracts.data
                                    .filter(contract => {
                                        if (filterStatus && contract.status !== filterStatus) return false;
                                        if (filterType && contract.type !== filterType) return false;
                                        if (filterExpiring && contract.days_until_expiry > parseInt(filterExpiring)) return false;
                                        return true;
                                    })
                                    .map((contract) => (
                                    <tr key={contract.id} className="border-b border-border hover:bg-muted/50">
                                        <td className="py-3 px-4">
                                            <div>
                                                <div className="font-medium">{contract.title}</div>
                                                {contract.contract_no && (
                                                    <div className="text-sm text-muted-foreground">#{contract.contract_no}</div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <Link
                                                href={`/vendors/${contract.vendor.id}`}
                                                className="text-primary hover:underline"
                                            >
                                                {contract.vendor.name}
                                            </Link>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                {contract.type}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            {contract.amount ? `${contract.amount.toLocaleString()} ${contract.currency}` : '-'}
                                        </td>
                                        <td className="py-3 px-4">
                                            {contract.end_on}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                contract.days_until_expiry < 0
                                                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                    : contract.days_until_expiry <= 30
                                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            }`}>
                                                {contract.days_until_expiry < 0 ? 'Expired' : `${contract.days_until_expiry} days`}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <StatusBadge status={contract.status} />
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <div className="flex justify-end space-x-2">
                                                <Link
                                                    href={`/vendors/${contract.vendor.id}`}
                                                    className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                                                    title="View Vendor"
                                                >
                                                    <Building className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/vendors/${contract.vendor.id}/contracts/${contract.id}/edit`}
                                                    className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(contract.id)}
                                                    className="p-1 text-muted-foreground hover:text-red-500 transition-colors"
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
                    {contracts.links && (
                        <div className="mt-4 flex justify-center">
                            {contracts.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`px-3 py-2 mx-1 rounded-lg text-sm ${
                                        link.active
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-muted-foreground hover:bg-muted'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </SectionPanel>
            </div>
        </AppLayout>
    );
}