import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Clock, User } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import SectionPanel from '@/Components/SectionPanel';

export default function Audit({ auditEntries }) {
    return (
        <AppLayout title="Switch Audit">
            <Head title="Switch Audit" />

            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Link
                        href={route('switches.index')}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Switches
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Switch Audit Log</h1>
                </div>

                <SectionPanel>
                    <div className="space-y-4">
                        {auditEntries.map((entry) => (
                            <div key={entry.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                        <User className="w-5 h-5 text-indigo-600" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {entry.switch_name} ({entry.switch_tag})
                                            </p>
                                            <p className="text-sm text-gray-600">{entry.details}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-900">{entry.user}</p>
                                            <p className="text-sm text-gray-500 flex items-center">
                                                <Clock className="w-4 h-4 mr-1" />
                                                {entry.timestamp}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {entry.action}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {auditEntries.length === 0 && (
                            <div className="text-center py-12">
                                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No audit entries</h3>
                                <p className="text-gray-500">Audit entries will appear here when switches are modified.</p>
                            </div>
                        )}
                    </div>

                    {auditEntries.length > 0 && (
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-500">
                                Showing last {auditEntries.length} audit entries
                            </p>
                        </div>
                    )}
                </SectionPanel>
            </div>
        </AppLayout>
    );
}