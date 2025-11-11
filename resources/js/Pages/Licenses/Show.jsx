import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, Eye, Activity, FileText, AlertTriangle, Users, DollarSign } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import SectionPanel from '@/Components/SectionPanel';
import StatusBadge from '@/Components/StatusBadge';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Show({ license }) {
    const formatDate = (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString();
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount || 0);
    };

    const getExpirationStatus = (license) => {
        if (!license.expiration_date) return null;

        const days = Math.ceil((new Date(license.expiration_date) - new Date()) / (1000 * 60 * 60 * 24));

        if (days < 0) return { status: 'expired', color: 'text-red-600', text: 'Expired' };
        if (days <= 30) return { status: 'expiring', color: 'text-yellow-600', text: `${days} days` };
        return null;
    };

    const getComplianceColor = (status) => {
        switch (status) {
            case 'Licensed':
                return 'text-green-600';
            case 'Unlicensed':
            case 'Nulled':
                return 'text-red-600';
            case 'Trial':
            case 'Evaluation':
                return 'text-yellow-600';
            default:
                return 'text-gray-600';
        }
    };

    const expirationStatus = getExpirationStatus(license);

    return (
        <AppLayout title={`License: ${license.name}`}>
            <Head title={`License: ${license.name}`} />

            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('licenses.index')}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Licenses
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">{license.name}</h1>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('licenses.edit', license.id)}>
                            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </button>
                        </Link>
                        <Link href={route('licenses.report')}>
                            <PrimaryButton className="flex items-center">
                                <Activity className="w-4 h-4 mr-2" />
                                View Reports
                            </PrimaryButton>
                        </Link>
                    </div>
                </div>

                {/* License Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                        <div className="flex items-center">
                            <FileText className="w-8 h-8 text-blue-600 mr-4" />
                            <div>
                                <p className="text-sm font-medium text-blue-600">License Status</p>
                                <p className="text-lg font-bold text-blue-900">{license.status}</p>
                            </div>
                        </div>
                    </div>

                    <div className={`bg-gradient-to-br rounded-lg p-6 border ${license.compliance_status === 'Licensed' ? 'from-green-50 to-green-100 border-green-200' : 'from-red-50 to-red-100 border-red-200'}`}>
                        <div className="flex items-center">
                            <AlertTriangle className="w-8 h-8 text-red-600 mr-4" />
                            <div>
                                <p className="text-sm font-medium text-red-600">Compliance</p>
                                <p className={`text-lg font-bold ${getComplianceColor(license.compliance_status)}`}>
                                    {license.compliance_status}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                        <div className="flex items-center">
                            <Users className="w-8 h-8 text-purple-600 mr-4" />
                            <div>
                                <p className="text-sm font-medium text-purple-600">Installations</p>
                                <p className="text-lg font-bold text-purple-900">
                                    {license.installations_count}/{license.quantity}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={`bg-gradient-to-br rounded-lg p-6 border ${expirationStatus?.status === 'expired' ? 'from-red-50 to-red-100 border-red-200' : 'from-yellow-50 to-yellow-100 border-yellow-200'}`}>
                        <div className="flex items-center">
                            <Activity className="w-8 h-8 text-yellow-600 mr-4" />
                            <div>
                                <p className="text-sm font-medium text-yellow-600">Expiration</p>
                                <p className={`text-lg font-bold ${expirationStatus?.color || 'text-gray-900'}`}>
                                    {expirationStatus?.text || formatDate(license.expiration_date)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* License Details */}
                <SectionPanel>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-500">Software Name</label>
                            <p className="mt-1 text-lg font-medium text-gray-900">{license.name}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Vendor</label>
                            <p className="mt-1 text-lg font-medium text-gray-900">{license.vendor?.name || 'Unknown'}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Version</label>
                            <p className="mt-1 text-lg font-medium text-gray-900">{license.version || 'N/A'}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Product Key</label>
                            <p className="mt-1 text-lg font-mono text-gray-900">{license.product_key || 'N/A'}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">License Key</label>
                            <p className="mt-1 text-lg font-mono text-gray-900">{license.license_key || 'N/A'}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">License Status</label>
                            <div className="mt-1">
                                <StatusBadge status={license.status} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Compliance Status</label>
                            <p className={`mt-1 text-lg font-medium ${getComplianceColor(license.compliance_status)}`}>
                                {license.compliance_status}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Quantity</label>
                            <p className="mt-1 text-lg font-medium text-gray-900">{license.quantity}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Cost</label>
                            <p className="mt-1 text-lg font-medium text-gray-900">
                                {license.cost ? formatCurrency(license.cost) : 'N/A'}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Purchase Date</label>
                            <p className="mt-1 text-lg font-medium text-gray-900">{formatDate(license.purchase_date)}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Expiration Date</label>
                            <p className={`mt-1 text-lg font-medium ${expirationStatus?.color || 'text-gray-900'}`}>
                                {formatDate(license.expiration_date)}
                                {expirationStatus && (
                                    <span className="block text-sm text-gray-500">({expirationStatus.text})</span>
                                )}
                            </p>
                        </div>
                    </div>

                    {license.notes && (
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-500">Notes</label>
                            <p className="mt-2 text-gray-700 whitespace-pre-line">{license.notes}</p>
                        </div>
                    )}
                </SectionPanel>

                {/* Installations */}
                {license.installations && license.installations.length > 0 && (
                    <SectionPanel>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">License Installations</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Hostname
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            IP Address
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Department
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Installed
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Last Used
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {license.installations.map((installation) => (
                                        <tr key={installation.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {installation.hostname || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {installation.ip_address || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {installation.user || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {installation.department || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <StatusBadge status={installation.status} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(installation.installed_date)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(installation.last_used)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </SectionPanel>
                )}

                {/* Documents */}
                {license.documents && license.documents.length > 0 && (
                    <SectionPanel>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Documents</h3>
                        <div className="space-y-2">
                            {license.documents.map((document) => (
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
                {license.auditLogs && license.auditLogs.length > 0 && (
                    <SectionPanel>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                            {license.auditLogs.map((log) => (
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