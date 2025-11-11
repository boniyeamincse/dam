import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AppLayout from '@/Layouts/AppLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import ThemeToggle from '@/Components/ThemeToggle';
import SectionPanel from '@/Components/SectionPanel';
import { Settings, User, Palette, Database, Shield, Bell, Globe } from 'lucide-react';

export default function Index({ user, roles }) {
    const [activeTab, setActiveTab] = useState('user-preferences');
    const isOrgAdmin = roles?.includes('Org Admin');

    const { data, setData, post, processing, errors, reset } = useForm({
        theme: user.theme || 'light',
        density: user.density || 'comfortable',
        date_format: user.date_format || 'DD/MM/YYYY',
        page_size: user.page_size || 25,
        notifications_enabled: user.notifications_enabled ?? true,
        email_alerts: user.email_alerts ?? true,
        system_alerts: user.system_alerts ?? true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('settings.update'), {
            onFinish: () => reset(),
        });
    };

    const tabs = [
        { id: 'user-preferences', label: 'User Preferences', icon: User },
        { id: 'appearance', label: 'Appearance', icon: Palette },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        ...(isOrgAdmin ? [
            { id: 'system-config', label: 'System Configuration', icon: Database },
            { id: 'security', label: 'Security & Access', icon: Shield },
            { id: 'branding', label: 'Branding & Logo', icon: Settings },
        ] : []),
    ];

    return (
        <AppLayout title="Settings">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
            >
                {/* Page Header */}
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
                    <p className="text-muted-foreground">Customize your experience and manage system preferences</p>
                </div>

                {/* Settings Tabs */}
                <div className="bg-card border border-border rounded-lg">
                    <div className="border-b border-border">
                        <nav className="flex space-x-8 px-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === tab.id
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="p-6">
                        {/* User Preferences */}
                        {activeTab === 'user-preferences' && (
                            <div className="space-y-6">
                                <SectionPanel title="Data & Display">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <InputLabel htmlFor="date_format" value="Language & Date Format" />
                                            <select
                                                id="date_format"
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                value={data.date_format}
                                                onChange={(e) => setData('date_format', e.target.value)}
                                            >
                                                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                            </select>
                                            <InputError message={errors.date_format} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="page_size" value="Default Page Size" />
                                            <select
                                                id="page_size"
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                value={data.page_size}
                                                onChange={(e) => setData('page_size', e.target.value)}
                                            >
                                                <option value="10">10 items per page</option>
                                                <option value="25">25 items per page</option>
                                                <option value="50">50 items per page</option>
                                            </select>
                                            <InputError message={errors.page_size} className="mt-2" />
                                        </div>
                                    </div>
                                </SectionPanel>
                            </div>
                        )}

                        {/* Appearance */}
                        {activeTab === 'appearance' && (
                            <div className="space-y-6">
                                <SectionPanel title="Theme & Layout">
                                    <div className="space-y-6">
                                        <div>
                                            <InputLabel htmlFor="theme" value="Theme Mode" />
                                            <p className="text-sm text-muted-foreground mb-3">
                                                Choose your preferred theme. Changes apply immediately.
                                            </p>
                                            <ThemeToggle />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="density" value="Layout Density" />
                                            <p className="text-sm text-muted-foreground mb-3">
                                                Adjust the spacing and size of UI elements.
                                            </p>
                                            <select
                                                id="density"
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                value={data.density}
                                                onChange={(e) => setData('density', e.target.value)}
                                            >
                                                <option value="comfortable">Comfortable</option>
                                                <option value="compact">Compact</option>
                                            </select>
                                            <InputError message={errors.density} className="mt-2" />
                                        </div>
                                    </div>
                                </SectionPanel>
                            </div>
                        )}

                        {/* Notifications */}
                        {activeTab === 'notifications' && (
                            <div className="space-y-6">
                                <SectionPanel title="Notification Preferences">
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                id="notifications_enabled"
                                                type="checkbox"
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                checked={data.notifications_enabled}
                                                onChange={(e) => setData('notifications_enabled', e.target.checked)}
                                            />
                                            <label htmlFor="notifications_enabled" className="ml-2 block text-sm text-foreground">
                                                Enable notifications
                                            </label>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                id="email_alerts"
                                                type="checkbox"
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                checked={data.email_alerts}
                                                onChange={(e) => setData('email_alerts', e.target.checked)}
                                                disabled={!data.notifications_enabled}
                                            />
                                            <label htmlFor="email_alerts" className="ml-2 block text-sm text-foreground">
                                                Email alerts for critical issues
                                            </label>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                id="system_alerts"
                                                type="checkbox"
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                checked={data.system_alerts}
                                                onChange={(e) => setData('system_alerts', e.target.checked)}
                                                disabled={!data.notifications_enabled}
                                            />
                                            <label htmlFor="system_alerts" className="ml-2 block text-sm text-foreground">
                                                System alerts and notifications
                                            </label>
                                        </div>
                                    </div>
                                </SectionPanel>
                            </div>
                        )}

                        {/* System Configuration (Admin Only) */}
                        {activeTab === 'system-config' && isOrgAdmin && (
                            <div className="space-y-6">
                                <SectionPanel title="System Configuration">
                                    <div className="text-center py-16">
                                        <Database className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-foreground mb-2">System Configuration</h3>
                                        <p className="text-muted-foreground">
                                            Advanced system settings, backup configuration, and database health monitoring.
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-2">
                                            Coming soon in future updates.
                                        </p>
                                    </div>
                                </SectionPanel>
                            </div>
                        )}

                        {/* Security & Access (Admin Only) */}
                        {activeTab === 'security' && isOrgAdmin && (
                            <div className="space-y-6">
                                <SectionPanel title="Security & Access">
                                    <div className="text-center py-16">
                                        <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-foreground mb-2">Security Settings</h3>
                                        <p className="text-muted-foreground">
                                            User role management, 2FA configuration, and access control policies.
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-2">
                                            Coming soon in future updates.
                                        </p>
                                    </div>
                                </SectionPanel>
                            </div>
                        )}

                        {/* Branding & Logo (Admin Only) */}
                        {activeTab === 'branding' && isOrgAdmin && (
                            <div className="space-y-6">
                                <SectionPanel title="Branding & Logo">
                                    <div className="text-center py-16">
                                        <Settings className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-foreground mb-2">Branding Settings</h3>
                                        <p className="text-muted-foreground">
                                            Logo setup, color palette customization, and brand identity management.
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-2">
                                            Coming soon in future updates.
                                        </p>
                                    </div>
                                </SectionPanel>
                            </div>
                        )}

                        {/* Save Button */}
                        {activeTab !== 'system-config' && activeTab !== 'security' && activeTab !== 'branding' && (
                            <div className="flex justify-end pt-6 border-t border-border">
                                <PrimaryButton disabled={processing} onClick={submit}>
                                    {processing ? 'Saving...' : 'Save Settings'}
                                </PrimaryButton>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </AppLayout>
    );
}