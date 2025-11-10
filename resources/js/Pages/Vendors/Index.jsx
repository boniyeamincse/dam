import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus, Search, Edit, Eye, Trash2 } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import SectionPanel from '@/Components/SectionPanel';
import StatusBadge from '@/Components/StatusBadge';
import KpiCard from '@/Components/KpiCard';

export default function Index({ vendors, filters }) {
    const { url } = usePage();

    const handleDelete = (vendorId) => {
        if (confirm('Are you sure you want to delete this vendor?')) {
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = `/vendors/${vendorId}`;
            form.innerHTML = '<input type="hidden" name="_method" value="DELETE"><input type="hidden" name="_token" value="' + document.querySelector('meta[name="csrf-token"]').getAttribute('content') + '">';
            document.body.appendChild(form);
            form.submit();
        }
    };

    return (
        <AppLayout>
            <Head title="Vendors" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-foreground">Vendors</h1>
                    {can?.create && (
                        <Link
                            href="/vendors/create"
                            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Vendor
                        </Link>
                    )}
                </div>

                {/* Filters */}
                <SectionPanel>
                    <form method="GET" action="/vendors" className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <input
                                type="text"
                                name="search"
                                placeholder="Search vendors..."
                                defaultValue={filters.search}
                                className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                            />
                        </div>
                        <div>
                            <select
                                name="category"
                                defaultValue={filters.category}
                                className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                            >
                                <option value="">All Categories</option>
                                <option value="ISP">ISP</option>
                                <option value="Hardware">Hardware</option>
                                <option value="Software">Software</option>
                                <option value="CCTV">CCTV</option>
                                <option value="Cloud">Cloud</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <select
                                name="status"
                                defaultValue={filters.status}
                                className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                            >
                                <option value="">All Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                            >
                                <Search className="w-4 h-4 mr-2 inline" />
                                Filter
                            </button>
                        </div>
                    </form>
                </SectionPanel>

                {/* Vendors Table */}
                <SectionPanel>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-border">
                                <tr>
                                    <th className="text-left py-3 px-4 font-medium">Vendor</th>
                                    <th className="text-left py-3 px-4 font-medium">Category</th>
                                    <th className="text-left py-3 px-4 font-medium">AM Contact</th>
                                    <th className="text-left py-3 px-4 font-medium">Status</th>
                                    <th className="text-left py-3 px-4 font-medium">Active Contracts</th>
                                    <th className="text-left py-3 px-4 font-medium">SLA Hours</th>
                                    <th className="text-right py-3 px-4 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vendors.data.map((vendor) => (
                                    <tr key={vendor.id} className="border-b border-border hover:bg-muted/50">
                                        <td className="py-3 px-4">
                                            <div>
                                                <div className="font-medium">{vendor.name}</div>
                                                {vendor.code && (
                                                    <div className="text-sm text-muted-foreground">{vendor.code}</div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                {vendor.category}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="text-sm">
                                                {vendor.account_manager_name && (
                                                    <div className="font-medium">{vendor.account_manager_name}</div>
                                                )}
                                                {vendor.account_manager_email && (
                                                    <div className="text-muted-foreground">{vendor.account_manager_email}</div>
                                                )}
                                                {!vendor.account_manager_name && !vendor.account_manager_email && (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <StatusBadge status={vendor.status} />
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                {vendor.active_contracts_count}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            {vendor.sla_hours ? `${vendor.sla_hours}h` : '-'}
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <div className="flex justify-end space-x-2">
                                                <Link
                                                    href={`/vendors/${vendor.id}`}
                                                    className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                                                    title="View"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                {can?.update && (
                                                    <Link
                                                        href={`/vendors/${vendor.id}/edit`}
                                                        className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                )}
                                                {can?.delete && (
                                                    <button
                                                        onClick={() => handleDelete(vendor.id)}
                                                        className="p-1 text-muted-foreground hover:text-red-500 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {vendors.links && (
                        <div className="mt-4 flex justify-center">
                            {vendors.links.map((link, index) => (
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