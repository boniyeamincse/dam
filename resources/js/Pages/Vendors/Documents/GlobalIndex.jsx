import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { FileText, Download, Building, Eye, Trash2, Calendar, User } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import SectionPanel from '@/Components/SectionPanel';

export default function GlobalIndex({ documents }) {
    const [filterType, setFilterType] = useState('');

    const handleDelete = (docId) => {
        if (confirm('Are you sure you want to delete this document?')) {
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = `/vendors/documents/${docId}`;
            form.innerHTML = '<input type="hidden" name="_method" value="DELETE"><input type="hidden" name="_token" value="' + document.querySelector('meta[name="csrf-token"]').getAttribute('content') + '">';
            document.body.appendChild(form);
            form.submit();
        }
    };

    return (
        <AppLayout>
            <Head title="All Documents" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-foreground">All Documents</h1>
                </div>

                {/* Filters */}
                <SectionPanel>
                    <div className="flex space-x-4">
                        <div>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                            >
                                <option value="">All Types</option>
                                <option value="NDA">NDA</option>
                                <option value="PO">PO</option>
                                <option value="Invoice">Invoice</option>
                                <option value="SOW">SOW</option>
                                <option value="MSA">MSA</option>
                                <option value="Certificate">Certificate</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                </SectionPanel>

                {/* Documents Table */}
                <SectionPanel>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-border">
                                <tr>
                                    <th className="text-left py-3 px-4 font-medium">Document</th>
                                    <th className="text-left py-3 px-4 font-medium">Vendor</th>
                                    <th className="text-left py-3 px-4 font-medium">Type</th>
                                    <th className="text-left py-3 px-4 font-medium">Contract</th>
                                    <th className="text-left py-3 px-4 font-medium">Size</th>
                                    <th className="text-left py-3 px-4 font-medium">Uploaded</th>
                                    <th className="text-right py-3 px-4 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.data
                                    .filter(doc => !filterType || doc.type === filterType)
                                    .map((doc) => (
                                    <tr key={doc.id} className="border-b border-border hover:bg-muted/50">
                                        <td className="py-3 px-4">
                                            <div className="flex items-center space-x-3">
                                                <FileText className="w-8 h-8 text-muted-foreground flex-shrink-0" />
                                                <div>
                                                    <div className="font-medium">{doc.name}</div>
                                                    <div className="text-sm text-muted-foreground">{doc.filename}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            {doc.contract?.vendor ? (
                                                <Link
                                                    href={`/vendors/${doc.contract.vendor.id}`}
                                                    className="text-primary hover:underline"
                                                >
                                                    {doc.contract.vendor.name}
                                                </Link>
                                            ) : (
                                                <span className="text-muted-foreground">-</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                {doc.type}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            {doc.contract ? (
                                                <Link
                                                    href={`/vendors/${doc.contract.vendor.id}/contracts/${doc.contract.id}/edit`}
                                                    className="text-primary hover:underline"
                                                >
                                                    {doc.contract.title}
                                                </Link>
                                            ) : (
                                                <span className="text-muted-foreground">-</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4">
                                            {(doc.size_bytes / 1024 / 1024).toFixed(2)} MB
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="text-sm">
                                                <div>{doc.uploaded_at ? new Date(doc.uploaded_at).toLocaleDateString() : '-'}</div>
                                                {doc.uploaded_by && (
                                                    <div className="text-muted-foreground">by User #{doc.uploaded_by}</div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <div className="flex justify-end space-x-2">
                                                <Link
                                                    href={`/vendors/${doc.contract?.vendor?.id}`}
                                                    className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                                                    title="View Vendor"
                                                >
                                                    <Building className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => window.open(`/vendors/documents/${doc.id}/download`, '_blank')}
                                                    className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                                                    title="Download"
                                                >
                                                    <Download className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(doc.id)}
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
                    {documents.links && (
                        <div className="mt-4 flex justify-center">
                            {documents.links.map((link, index) => (
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