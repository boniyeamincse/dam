import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Network } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import SectionPanel from '@/Components/SectionPanel';
import StatusBadge from '@/Components/StatusBadge';

export default function Ports({ ports }) {
    const getStatusVariant = (status) => {
        switch (status) {
            case 'up': return 'green';
            case 'down': return 'red';
            default: return 'gray';
        }
    };

    return (
        <AppLayout title="Switch Ports">
            <Head title="Switch Ports" />

            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Link
                        href={route('switches.index')}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Switches
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Switch Ports</h1>
                </div>

                <SectionPanel>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Switch
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Port
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        VLAN
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Admin Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Oper Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        PoE
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Speed
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Description
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {ports.data.map((port) => (
                                    <tr key={port.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{port.switch_name}</div>
                                                <div className="text-sm text-gray-500">{port.switch_tag}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {port.port_name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {port.vlan_ids || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge variant={port.admin_up ? 'green' : 'gray'}>
                                                {port.admin_up ? 'Up' : 'Down'}
                                            </StatusBadge>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge variant={port.oper_up ? 'green' : 'red'}>
                                                {port.oper_up ? 'Up' : 'Down'}
                                            </StatusBadge>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge variant={port.poe ? 'blue' : 'gray'}>
                                                {port.poe ? 'Yes' : 'No'}
                                            </StatusBadge>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {port.speed_mbps ? `${port.speed_mbps} Mbps` : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {port.description || 'N/A'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {ports.data.length === 0 && (
                        <div className="text-center py-12">
                            <Network className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No ports to display</h3>
                            <p className="text-gray-500 mb-4">Port information will appear here once switches are added.</p>
                        </div>
                    )}

                    {ports.data.length > 0 && (
                        <div className="flex items-center justify-between mt-6">
                            <div className="text-sm text-gray-700">
                                Showing {ports.from} to {ports.to} of {ports.total} ports
                            </div>
                            <div className="flex gap-2">
                                {ports.links.map((link, index) => (
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