import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Search, Download, Upload, BarChart3, Eye, Edit, Trash2 } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import SectionPanel from '@/Components/SectionPanel';
import Toolbar from '@/Components/Toolbar';
import StatusBadge from '@/Components/StatusBadge';

export default function Index({ switches, filters, query }) {
    const { data, setData, get, processing } = useForm({
        q: query.q || '',
        status: query.status || '',
        location_id: query.location_id || '',
        vendor_id: query.vendor_id || '',
        model: query.model || '',
        os_firmware: query.os_firmware || '',
        with_alerts: query.with_alerts || false,
        sort_by: query.sort_by || 'name',
        sort_dir: query.sort_dir || 'asc',
    });

    const handleFilterChange = (field, value) => {
        setData(field, value);
        get(route('switches.index'), { preserveState: true });
    };

    const handleSort = (column) => {
        const newDir = data.sort_by === column && data.sort_dir === 'asc' ? 'desc' : 'asc';
        setData({ sort_by: column, sort_dir: newDir });
        get(route('switches.index'), { preserveState: true });
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case 'in_service': return 'green';
            case 'spare': return 'slate';
            case 'rma': return 'amber';
            case 'retired': return 'gray';
            default: return 'gray';
        }
    };

    return (
        <AppLayout title="Switches">
            <Head title="Switches" />

            <div className="space-y-6">
                <SectionPanel>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Switches</h1>
                        <div className="flex gap-3">
                            <Link
                                href={route('switches.report')}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <BarChart3 className="w-4 h-4 mr-2" />
                                Reports
                            </Link>
                            <Link
                                href={route('switches.import')}
                                className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                                <Upload className="w-4 h-4 mr-2" />
                                Import
                            </Link>
                            <Link
                                href={route('switches.create')}
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Switch
                            </Link>
                        </div>
                    </div>

                    <Toolbar
                        searchValue={data.q}
                        onSearchChange={(value) => handleFilterChange('q', value)}
                        filters={[
                            {
                                key: 'status',
                                value: data.status,
                                onChange: (value) => handleFilterChange('status', value),
                                options: [
                                    { value: '', label: 'All Status' },
                                    { value: 'in_service', label: 'In Service' },
                                    { value: 'spare', label: 'Spare' },
                                    { value: 'rma', label: 'RMA' },
                                    { value: 'retired', label: 'Retired' },
                                ]
                            },
                            {
                                key: 'location_id',
                                value: data.location_id,
                                onChange: (value) => handleFilterChange('location_id', value),
                                options: [
                                    { value: '', label: 'All Locations' },
                                    ...filters.locations.map(loc => ({ value: loc.id, label: loc.name }))
                                ]
                            },
                            {
                                key: 'vendor_id',
                                value: data.vendor_id,
                                onChange: (value) => handleFilterChange('vendor_id', value),
                                options: [
                                    { value: '', label: 'All Vendors' },
                                    ...filters.vendors.map(vendor => ({ value: vendor.id, label: vendor.name }))
                                ]
                            },
                            {
                                key: 'model',
                                value: data.model,
                                onChange: (value) => handleFilterChange('model', value),
                                options: [
                                    { value: '', label: 'All Models' },
                                    ...filters.models.map(model => ({ value: model, label: model }))
                                ]
                            }
                        ]}
                        actions={[
                            {
                                label: 'Export CSV',
                                href: route('switches.report.export', data),
                                icon: Download,
                                variant: 'secondary'
                            }
                        ]}
                    />

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0">
                                <tr>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('tag')}
                                    >
                                        Tag {data.sort_by === 'tag' && (data.sort_dir === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('name')}
                                    >
                                        Name {data.sort_by === 'name' && (data.sort_dir === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Model
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('location')}
                                    >
                                        Location {data.sort_by === 'location' && (data.sort_dir === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('status')}
                                    >
                                        Status {data.sort_by === 'status' && (data.sort_dir === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Management IP
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {switches.data.map((asset) => (
                                    <tr key={asset.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {asset.tag}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {asset.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {asset.model}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {asset.location?.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge variant={getStatusVariant(asset.status)}>
                                                {asset.status.replace('_', ' ')}
                                            </StatusBadge>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {asset.network?.mgmt_ip || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={route('switches.show', asset.id)}
                                                    className="text-indigo-600 hover:text-indigo-900 p-1"
                                                    title="View"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={route('switches.edit', asset.id)}
                                                    className="text-blue-600 hover:text-blue-900 p-1"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    className="text-red-600 hover:text-red-900 p-1"
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

                    {switches.data.length === 0 && (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-10 h-10 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No switches found</h3>
                            <p className="text-gray-500 mb-4">Get started by adding your first switch.</p>
                            <Link
                                href={route('switches.create')}
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Switch
                            </Link>
                        </div>
                    )}

                    {switches.data.length > 0 && (
                        <div className="flex items-center justify-between mt-6">
                            <div className="text-sm text-gray-700">
                                Showing {switches.from} to {switches.to} of {switches.total} results
                            </div>
                            <div className="flex gap-2">
                                {switches.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`px-3 py-2 text-sm border rounded-lg ${
                                            link.active
                                                ? 'bg-indigo-50 border-indigo-500 text-indigo-600'
                                                : 'border-gray-300 text-gray-500 hover:bg-gray-50'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </SectionPanel>
            </div>
        </AppLayout>
    );
}