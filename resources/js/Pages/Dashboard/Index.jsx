import React from 'react';
import { motion } from 'framer-motion';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Index() {
    return (
        <AppLayout title="Dashboard">
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Akij Group Assets Management
                </h1>
                <p className="text-gray-600">
                    Welcome to your asset management dashboard.
                </p>
            </motion.div>

            {/* Placeholder Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="text-center py-12">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Domains</h3>
                        <p className="text-gray-600">Manage your domains</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="text-center py-12">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Routers</h3>
                        <p className="text-gray-600">Monitor your routers</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="text-center py-12">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Switches</h3>
                        <p className="text-gray-600">Control your switches</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="text-center py-12">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Servers</h3>
                        <p className="text-gray-600">Manage your servers</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="text-center py-12">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Settings</h3>
                        <p className="text-gray-600">Configure your preferences</p>
                    </div>
                </div>
            </motion.div>
        </AppLayout>
    );
}