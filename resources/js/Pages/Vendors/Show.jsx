import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Edit, Plus, FileText, Download, Trash2, Calendar, DollarSign, Building } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import SectionPanel from '@/Components/SectionPanel';
import StatusBadge from '@/Components/StatusBadge';
import KpiCard from '@/Components/KpiCard';

const TabButton = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 font-medium text-sm rounded-lg transition-colors ${
            active
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        }`}
    >
        {children}
    </button>
);

export default function Show({ vendor }) {
    const [activeTab, setActiveTab] = useState('overview');

    const handleDeleteContract = (contractId) => {
        if (confirm('Are you sure you want to delete this contract?')) {
            router.delete(`/vendors/${vendor.id}/contracts/${contractId}`);
        }
    };

    const handleDeleteDocument = (docId) => {
        if (confirm('Are you sure you want to delete this document?')) {
            router.delete(`/vendors/${vendor.id}/documents/${docId}`);
        }
    };

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'contracts', label: 'Contracts' },
        { id: 'documents', label: 'Documents' },
        { id: 'assets', label: 'Assets' },
        { id: 'notes', label: 'Notes' },
    ];

    return (
        <AppLayout>
            <Head title={vendor.name} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/vendors"
                            className="p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">{vendor.name}</h1>
                            {vendor.code && (
                                <p className="text-muted-foreground">{vendor.code}</p>
                            )}
                        </div>
                    </div>
                    {can?.update && (
                        <Link
                            href={`/vendors/${vendor.id}/edit`}
                            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Vendor
                        </Link>
                    )}
                </div>

                {/* Status and Category */}
                <div className="flex items-center space-x-4">
                    <StatusBadge status={vendor.status} />
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {vendor.category}
                    </span>
                </div>

                {/* Tabs */}
                <div className="border-b border-border">
                    <div className="flex space-x-1">
                        {tabs.map((tab) => (
                            <TabButton
                                key={tab.id}
                                active={activeTab === tab.id}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </TabButton>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="space-y-6">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Quick Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <KpiCard
                                    title="Active Contracts"
                                    value={vendor.active_contracts_count}
                                    icon={FileText}
                                />
                                <KpiCard
                                    title="Total Documents"
                                    value={vendor.documents?.length || 0}
                                    icon={FileText}
                                />
                                <KpiCard
                                    title="SLA Hours"
                                    value={vendor.sla_hours ? `${vendor.sla_hours}h` : 'N/A'}
                                    icon={Calendar}
                                />
                            </div>

                            {/* Company Info */}
                            <SectionPanel title="Company Information">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-medium mb-2">Contact Details</h4>
                                        <div className="space-y-1 text-sm">
                                            {vendor.phone && <p><strong>Phone:</strong> {vendor.phone}</p>}
                                            {vendor.contact_email && <p><strong>Email:</strong> {vendor.contact_email}</p>}
                                            {vendor.website && <p><strong>Website:</strong> <a href={vendor.website} target="_blank" className="text-primary hover:underline">{vendor.website}</a></p>}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-2">Address</h4>
                                        <div className="space-y-1 text-sm">
                                            {vendor.address && <p>{vendor.address}</p>}
                                            {(vendor.city || vendor.country) && (
                                                <p>{[vendor.city, vendor.country].filter(Boolean).join(', ')}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </SectionPanel>

                            {/* Account Manager */}
                            {vendor.account_manager_name && (
                                <SectionPanel title="Account Manager">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <strong>Name:</strong> {vendor.account_manager_name}
                                        </div>
                                        {vendor.account_manager_email && (
                                            <div>
                                                <strong>Email:</strong> {vendor.account_manager_email}
                                            </div>
                                        )}
                                        {vendor.account_manager_phone && (
                                            <div>
                                                <strong>Phone:</strong> {vendor.account_manager_phone}
                                            </div>
                                        )}
                                    </div>
                                </SectionPanel>
                            )}

                            {/* Support Info */}
                            <SectionPanel title="Support Information">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {vendor.support_email && <div><strong>Support Email:</strong> {vendor.support_email}</div>}
                                    {vendor.support_phone && <div><strong>Support Phone:</strong> {vendor.support_phone}</div>}
                                    {vendor.support_portal_url && (
                                        <div className="md:col-span-2">
                                            <strong>Support Portal:</strong> <a href={vendor.support_portal_url} target="_blank" className="text-primary hover:underline">{vendor.support_portal_url}</a>
                                        </div>
                                    )}
                                </div>
                            </SectionPanel>

                            {/* Quick Actions */}
                            <SectionPanel title="Quick Actions">
                                <div className="flex flex-wrap gap-4">
                                    {can?.create_contract && (
                                        <Link
                                            href={`/vendors/${vendor.id}/contracts/create`}
                                            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Contract
                                        </Link>
                                    )}
                                    <Link
                                        href={`/vendors/${vendor.id}/documents`}
                                        className="inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                                    >
                                        <FileText className="w-4 h-4 mr-2" />
                                        Upload Document
                                    </Link>
                                </div>
                            </SectionPanel>
                        </div>
                    )}

                    {activeTab === 'contracts' && (
                        <SectionPanel title="Contracts">
                            <div className="space-y-4">
                                {vendor.contracts?.length > 0 ? (
                                    vendor.contracts.map((contract) => (
                                        <div key={contract.id} className="border border-border rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h4 className="font-medium">{contract.title}</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        {contract.contract_no && `Contract #: ${contract.contract_no} • `}
                                                        Type: {contract.type}
                                                    </p>
                                                </div>
                                                <StatusBadge status={contract.status} />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                                                <div>
                                                    <strong>Start:</strong> {contract.start_on}
                                                </div>
                                                <div>
                                                    <strong>End:</strong> {contract.end_on}
                                                </div>
                                                <div>
                                                    <strong>Amount:</strong> {contract.amount ? `${contract.amount} ${contract.currency}` : 'N/A'}
                                                </div>
                                                <div>
                                                    <strong>Billing:</strong> {contract.billing_cycle}
                                                </div>
                                            </div>

                                            <div className="flex justify-end space-x-2 mt-4">
                                                <Link
                                                    href={`/vendors/${vendor.id}/contracts/${contract.id}/edit`}
                                                    className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteContract(contract.id)}
                                                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        No contracts found. <Link href={`/vendors/${vendor.id}/contracts/create`} className="text-primary hover:underline">Add one now</Link>.
                                    </div>
                                )}
                            </div>
                        </SectionPanel>
                    )}

                    {activeTab === 'documents' && (
                        <SectionPanel title="Documents">
                            <div className="space-y-4">
                                {vendor.documents?.length > 0 ? (
                                    vendor.documents.map((doc) => (
                                        <div key={doc.id} className="flex items-center justify-between border border-border rounded-lg p-4">
                                            <div className="flex items-center space-x-3">
                                                <FileText className="w-8 h-8 text-muted-foreground" />
                                                <div>
                                                    <p className="font-medium">{doc.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {doc.filename} • {(doc.size_bytes / 1024 / 1024).toFixed(2)} MB
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => window.open(`/vendors/documents/${doc.id}/download`, '_blank')}
                                                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                                                    title="Download"
                                                >
                                                    <Download className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteDocument(doc.id)}
                                                    className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        No documents uploaded yet.
                                    </div>
                                )}
                            </div>
                        </SectionPanel>
                    )}

                    {activeTab === 'assets' && (
                        <SectionPanel title="Assets">
                            <div className="space-y-4">
                                {vendor.assets?.length > 0 ? (
                                    vendor.assets.map((assetVendor) => (
                                        <div key={assetVendor.id} className="border border-border rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h4 className="font-medium">{assetVendor.asset?.name || 'Unknown Asset'}</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        {assetVendor.asset?.tag && `Tag: ${assetVendor.asset.tag} • `}
                                                        Type: {assetVendor.asset?.asset_type || 'N/A'} •
                                                        Relationship: {assetVendor.relationship_type}
                                                    </p>
                                                </div>
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                    {assetVendor.relationship_type}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                <div>
                                                    <strong>Model:</strong> {assetVendor.asset?.model || 'N/A'}
                                                </div>
                                                <div>
                                                    <strong>Serial:</strong> {assetVendor.asset?.serial || 'N/A'}
                                                </div>
                                                <div>
                                                    <strong>Status:</strong> {assetVendor.asset?.status || 'N/A'}
                                                </div>
                                            </div>

                                            {assetVendor.notes && (
                                                <div className="mt-2 text-sm">
                                                    <strong>Notes:</strong> {assetVendor.notes}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        <Building className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                                        <p>No assets linked to this vendor yet.</p>
                                        <p className="text-sm">Assets can be linked through the asset management interface.</p>
                                    </div>
                                )}
                            </div>
                        </SectionPanel>
                    )}

                    {activeTab === 'notes' && (
                        <SectionPanel title="Notes">
                            {vendor.notes ? (
                                <div className="whitespace-pre-wrap">{vendor.notes}</div>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    No notes available.
                                </div>
                            )}
                        </SectionPanel>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}