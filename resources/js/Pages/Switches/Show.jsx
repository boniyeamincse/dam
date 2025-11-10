import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, Eye, FileText, Clock } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import SectionPanel from '@/Components/SectionPanel';
import StatusBadge from '@/Components/StatusBadge';

export default function Show({ asset }) {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', name: 'Overview', icon: Eye },
        { id: 'network', name: 'Network', icon: FileText },
        { id: 'documents', name: 'Documents', icon: FileText },
        { id: 'audit', name: 'Audit', icon: Clock },
    ];

    const getStatusVariant = (status) => {
        switch (status) {
            case 'in_service': return 'green';
            case 'spare': return 'slate';
            case 'rma': return 'amber';
            case 'retired': return 'gray';
            default: return 'gray';
        }
    };

    const renderOverviewTab = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SectionPanel>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Asset Information</h3>
                    <dl className="space-y-3">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Name</dt>
                            <dd className="text-sm text-gray-900">{asset.name}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Tag</dt>
                            <dd className="text-sm text-gray-900">{asset.tag}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Model</dt>
                            <dd className="text-sm text-gray-900">{asset.model || 'N/A'}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Serial</dt>
                            <dd className="text-sm text-gray-900">{asset.serial || 'N/A'}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Status</dt>
                            <dd className="mt-1">
                                <StatusBadge variant={getStatusVariant(asset.status)}>
                                    {asset.status.replace('_', ' ')}
                                </StatusBadge>
                            </dd>
                        </div>
                    </dl>
                </SectionPanel>

                <SectionPanel>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Location & Vendor</h3>
                    <dl className="space-y-3">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Location</dt>
                            <dd className="text-sm text-gray-900">{asset.location?.name || 'N/A'}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Vendor</dt>
                            <dd className="text-sm text-gray-900">{asset.vendor?.name || 'N/A'}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Purchase Date</dt>
                            <dd className="text-sm text-gray-900">
                                {asset.purchase_date ? new Date(asset.purchase_date).toLocaleDateString() : 'N/A'}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Warranty End</dt>
                            <dd className="text-sm text-gray-900">
                                {asset.warranty_end ? new Date(asset.warranty_end).toLocaleDateString() : 'N/A'}
                            </dd>
                        </div>
                    </dl>
                </SectionPanel>
            </div>

            {asset.notes && (
                <SectionPanel>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Notes</h3>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{asset.notes}</p>
                </SectionPanel>
            )}
        </div>
    );

    const renderNetworkTab = () => (
        <SectionPanel>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Network Configuration</h3>
            {asset.network ? (
                <dl className="space-y-3">
                    <div>
                        <dt className="text-sm font-medium text-gray-500">Management IP</dt>
                        <dd className="text-sm text-gray-900">{asset.network.mgmt_ip || 'N/A'}</dd>
                    </div>
                    <div>
                        <dt className="text-sm font-medium text-gray-500">Hostname</dt>
                        <dd className="text-sm text-gray-900">{asset.network.hostname || 'N/A'}</dd>
                    </div>
                    <div>
                        <dt className="text-sm font-medium text-gray-500">OS/Firmware</dt>
                        <dd className="text-sm text-gray-900">{asset.network.os_firmware || 'N/A'}</dd>
                    </div>
                    <div>
                        <dt className="text-sm font-medium text-gray-500">VLAN</dt>
                        <dd className="text-sm text-gray-900">{asset.network.vlan || 'N/A'}</dd>
                    </div>
                </dl>
            ) : (
                <p className="text-sm text-gray-500">No network configuration available.</p>
            )}
        </SectionPanel>
    );

    const renderDocumentsTab = () => (
        <SectionPanel>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Documents</h3>
            <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Document management coming soon...</p>
                <p className="text-sm text-gray-400 mt-2">
                    Configuration backups, manuals, and other documents will be available here.
                </p>
            </div>
        </SectionPanel>
    );

    const renderAuditTab = () => (
        <SectionPanel>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Audit Log</h3>
            <div className="space-y-4">
                {asset.auditLogs?.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p className="text-sm font-medium text-gray-900">{log.action}</p>
                            <p className="text-sm text-gray-500">{log.details}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-900">{log.user?.name || 'System'}</p>
                            <p className="text-sm text-gray-500">
                                {new Date(log.created_at).toLocaleString()}
                            </p>
                        </div>
                    </div>
                )) || (
                    <div className="text-center py-8">
                        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No audit entries found.</p>
                    </div>
                )}
            </div>
        </SectionPanel>
    );

    return (
        <AppLayout title={asset.name}>
            <Head title={asset.name} />

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
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{asset.name}</h1>
                            <p className="text-sm text-gray-500">Tag: {asset.tag}</p>
                        </div>
                    </div>
                    <Link
                        href={route('switches.edit', asset.id)}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                    </Link>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === tab.id
                                            ? 'border-indigo-500 text-indigo-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <Icon className="w-4 h-4 mr-2" />
                                    {tab.name}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="mt-6">
                    {activeTab === 'overview' && renderOverviewTab()}
                    {activeTab === 'network' && renderNetworkTab()}
                    {activeTab === 'documents' && renderDocumentsTab()}
                    {activeTab === 'audit' && renderAuditTab()}
                </div>
            </div>
        </AppLayout>
    );
}