import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Index() {
    return (
        <AppLayout title="Servers">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Servers</h1>
                <p className="text-gray-600 mb-6">Coming soon...</p>
                <div className="text-center py-16">
                    <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
                        </svg>
                    </div>
                    <p className="text-lg text-gray-500">Server management features will be available soon.</p>
                </div>
            </div>
        </AppLayout>
    );
}