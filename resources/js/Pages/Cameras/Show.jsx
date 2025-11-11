import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, Eye, Activity } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import SectionPanel from '@/Components/SectionPanel';
import StatusBadge from '@/Components/StatusBadge';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Show({ camera }) {
    const formatDate = (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString();
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

    const getLastSeenColor = (lastSeen) => {
        if (!lastSeen) return 'text-red-600 font-medium';
        const date = new Date(lastSeen);
        const now = new Date();
        const diffHours = (now - date) / (1000 * 60 * 60);

        if (diffHours > 24) return 'text-red-600 font-medium';
        if (diffHours > 1) return 'text-yellow-600';
        return 'text-green-600';
    };

    return (
        <AppLayout title={`Camera: ${camera.name}`}>
            <Head title={`Camera: ${camera.name}`} />

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
                        <h1 className="text-2xl font-bold text-gray-900">{camera.name}</h1>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('cameras.edit', camera.id)}>
                            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </button>
                        </Link>
                        <Link href={route('cameras.health', camera.id)}>
                            <PrimaryButton className="flex items-center">
                                <Activity className="w-4 h-4 mr-2" />
                                Health Check
                            </PrimaryButton>
                        </Link>
                    </div>
                </div>

                {/* Camera Details */}
                <SectionPanel>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-500">Asset Tag</label>
                            <p className="mt-1 text-lg font-medium text-gray-900">{camera.tag}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Model</label>
                            <p className="mt-1 text-lg font-medium text-gray-900">{camera.model}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Serial Number</label>
                            <p className="mt-1 text-lg font-medium text-gray-900">{camera.serial}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Vendor</label>
                            <p className="mt-1 text-lg font-medium text-gray-900">{camera.vendor?.name || 'Unknown'}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Status</label>
                            <div className="mt-1">
                                <StatusBadge status={camera.status} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Location</label>
                            <p className="mt-1 text-lg font-medium text-gray-900">{camera.location?.name || 'Unknown'}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Management IP</label>
                            <p className="mt-1 text-lg font-medium text-gray-900">{camera.network?.mgmt_ip || 'N/A'}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Hostname</label>
                            <p className="mt-1 text-lg font-medium text-gray-900">{camera.network?.hostname || 'N/A'}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">OS/Firmware</label>
                            <p className="mt-1 text-lg font-medium text-gray-900">{camera.network?.os_firmware || 'N/A'}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Purchase Date</label>
                            <p className="mt-1 text-lg font-medium text-gray-900">{formatDate(camera.purchase_date)}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Warranty End</label>
                            <p className="mt-1 text-lg font-medium text-gray-900">{formatDate(camera.warranty_end)}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Last Seen</label>
                            <p className={`mt-1 text-lg font-medium ${getLastSeenColor(camera.last_seen)}`}>
                                {formatLastSeen(camera.last_seen)}
                            </p>
                        </div>
                    </div>

                    {camera.notes && (
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-500">Notes</label>
                            <p className="mt-2 text-gray-700 whitespace-pre-line">{camera.notes}</p>
                        </div>
                    )}
                </SectionPanel>

                {/* Network Information */}
                {camera.network && (
                    <SectionPanel>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Network Configuration</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Management IP</label>
                                <p className="mt-1 text-lg font-mono text-gray-900">{camera.network.mgmt_ip}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500">Hostname</label>
                                <p className="mt-1 text-lg font-mono text-gray-900">{camera.network.hostname || 'N/A'}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500">OS/Firmware Version</label>
                                <p className="mt-1 text-lg font-mono text-gray-900">{camera.network.os_firmware || 'N/A'}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500">VLAN</label>
                                <p className="mt-1 text-lg font-mono text-gray-900">{camera.network.vlan || 'N/A'}</p>
                            </div>
                        </div>
                    </SectionPanel>
                )}

                {/* Alerts */}
                {camera.alerts && camera.alerts.length > 0 && (
                    <SectionPanel>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Alerts</h3>
                        <div className="space-y-3">
                            {camera.alerts.filter(alert => alert.status === 'active').map((alert) => (
                                <div key={alert.id} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <div>
                                        <h4 className="text-sm font-medium text-red-800">{alert.title}</h4>
                                        <p className="text-sm text-red-600">{alert.description}</p>
                                    </div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        {alert.severity}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </SectionPanel>
                )}

                {/* Documents */}
                {camera.documents && camera.documents.length > 0 && (
                    <SectionPanel>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>
                        <div className="space-y-2">
                            {camera.documents.map((document) => (
                                <div key={document.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">{document.filename}</h4>
                                        <p className="text-xs text-gray-500">{document.description}</p>
                                    </div>
                                    <a
                                        href={route('documents.download', document.id)}
                                        className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                                    >
                                        Download
                                    </a>
                                </div>
                            ))}
                        </div>
                    </SectionPanel>
                )}

                {/* Audit Log */}
                {camera.auditLogs && camera.auditLogs.length > 0 && (
                    <SectionPanel>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                            {camera.auditLogs.map((log) => (
                                <div key={log.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{log.action}</p>
                                        <p className="text-xs text-gray-500">
                                            by {log.user?.name || 'System'} on {new Date(log.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SectionPanel>
                )}
            </div>
        </AppLayout>
    );
}