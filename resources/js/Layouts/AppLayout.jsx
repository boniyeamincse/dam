import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import { Menu } from 'lucide-react';

export default function AppLayout({ title, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-gray-50">
                {/* Mobile menu button */}
                <div className="lg:hidden fixed top-4 left-4 z-50">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                </div>

                <div className="lg:grid lg:grid-cols-[260px_1fr] min-h-screen">
                    {/* Sidebar */}
                    <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

                    {/* Main content */}
                    <div className="lg:col-start-2">
                        {/* Content area */}
                        <main className="flex-1">
                            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                                {children}
                            </div>
                        </main>

                        {/* Footer */}
                        <footer className="bg-white border-t border-gray-200 mt-12">
                            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
                                © 2025 Akij Group. All rights reserved.
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}