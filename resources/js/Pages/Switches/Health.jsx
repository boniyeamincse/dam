import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Activity, Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import SectionPanel from '@/Components/SectionPanel';
import StatusBadge from '@/Components/StatusBadge';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Health({ switches }) {
    const getStatusIcon = (status) => {
        switch (status) {
            case 'up': return <Wifi className="w-4 h-4 text-green-600" />;
            case 'warn': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
            case 'down': return <WifiOff className="w-4 h-4 text-red-600" />;
            default: return <Activity className="w-4 h-4 text-gray-600" />;
        }
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case 'up': return 'green';
            case 'warn': return 'amber';
            case 'down': return 'red';
            default: return 'gray';
        }
    };

    return (
        <AppLayout title="Switch Health">
            <Head title="Switch Health" />

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
                        <h1 className="text-2xl font-bold text-gray-900">Switch Health Status</h1>
                    </div>
                    <PrimaryButton>
                        <Activity className="w-4 h-4 mr-2" />
                        Check Now
                    </PrimaryButton>
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
                                        Location
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Management IP
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Last Check
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {switches.map((switch_) => (
                                    <tr key={switch_.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{switch_.name}</div>
                                                <div className="text-sm text-gray-500">{switch_.tag}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {switch_.location}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {switch_.mgmt_ip}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {getStatusIcon(switch_.status)}
                                                <StatusBadge variant={getStatusVariant(switch_.status)} className="ml-2">
                                                    {switch_.status}
                                                </StatusBadge>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {switch_.last_check}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {switches.length === 0 && (
                        <div className="text-center py-12">
                            <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No switches to monitor</h3>
                            <p className="text-gray-500 mb-4">Add switches to start monitoring their health status.</p>
                            <Link
                                href={route('switches.create')}
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700"
                            >
                                Add Switch
                            </Link>
                        </div>
                    )}
                </SectionPanel>
            </div>
        </AppLayout>
    );
}