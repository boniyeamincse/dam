import React from 'react';
import AppLayout from '@/Layouts/AppLayout';

export default function Index() {
    return (
        <AppLayout title="Settings">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Settings</h1>
                <div className="text-center py-12">
                    <p className="text-gray-600">Coming soon...</p>
                </div>
            </div>
        </AppLayout>
    );
}