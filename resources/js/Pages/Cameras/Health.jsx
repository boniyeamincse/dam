import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Activity, Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import SectionPanel from '@/Components/SectionPanel';
import StatusBadge from '@/Components/StatusBadge';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Health({ camera, health }) {
    const getStatusIcon = (status) => {
        switch (status) {
            case 'online': return <Wifi className="w-4 h-4 text-green-600" />;
            case 'offline': return <WifiOff className="w-4 h-4 text-red-600" />;
            default: return <Activity className="w-4 h-4 text-gray-600" />;
        }
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case 'online': return 'green';
            case 'offline': return 'red';
            default: return 'gray';
        }
    };

    const formatLastSeen = (lastSeen) => {
        if (!lastSeen) return 'Never';

        const date = new Date(lastSeen);
        const now = new Date();
        const diffMs = now - date;
        const diffHours = diffMs / (1000 * 60 * 60);

        if (diffHours < 24) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (diffHours < 48) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString();
        }
    };

    return (
        <AppLayout title="Camera Health">
            <Head title="Camera Health" />

            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('cameras.index')}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Cameras
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Camera Health Status</h1>
                    </div>
                    <PrimaryButton>
                        <Activity className="w-4 h-4 mr-2" />
                        Check Now
                    </PrimaryButton>
                </div>

                {/* Camera Info */}
                <SectionPanel>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">{camera.name}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Management IP</label>
                                <p className="text-lg font-medium text-gray-900">{camera.network?.mgmt_ip || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Model</label>
                                <p className="text-lg font-medium text-gray-900">{camera.model}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Vendor</label>
                                <p className="text-lg font-medium text-gray-900">{camera.vendor?.name || 'Unknown'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Health Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                            <div className="flex items-center">
                                <div className="p-3 bg-green-500 rounded-full">
                                    {getStatusIcon(health.status)}
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-green-600">Status</p>
                                    <p className="text-2xl font-bold text-green-900 capitalize">{health.status}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                            <div className="flex items-center">
                                <div className="p-3 bg-blue-500 rounded-full">
                                    <Activity className="w-6 h-6 text-white" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-blue-600">Latency</p>
                                    <p className="text-2xl font-bold text-blue-900">{health.latency_ms}ms</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                            <div className="flex items-center">
                                <div className="p-3 bg-purple-500 rounded-full">
                                    <AlertTriangle className="w-6 h-6 text-white" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-purple-600">Uptime</p>
                                    <p className="text-2xl font-bold text-purple-900">{health.uptime}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
                            <div className="flex items-center">
                                <div className="p-3 bg-orange-500 rounded-full">
                                    <Activity className="w-6 h-6 text-white" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-orange-600">Last Seen</p>
                                    <p className="text-lg font-bold text-orange-900">{formatLastSeen(health.last_ping)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">CPU Usage</label>
                                <div className="w-full bg-gray-200 rounded-full h-4">
                                    <div
                                        className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                                        style={{ width: `${health.cpu_usage}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{health.cpu_usage}%</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Memory Usage</label>
                                <div className="w-full bg-gray-200 rounded-full h-4">
                                    <div
                                        className="bg-green-600 h-4 rounded-full transition-all duration-300"
                                        style={{ width: `${health.memory_usage}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{health.memory_usage}%</p>
                            </div>
                        </div>
                    </div>
                </SectionPanel>
            </div>
        </AppLayout>
    );
}