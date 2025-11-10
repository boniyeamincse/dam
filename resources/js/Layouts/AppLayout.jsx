import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import ThemeToggle from '@/Components/ThemeToggle';
import { Menu } from 'lucide-react';

const AppLayout = ({ children, title }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-background text-foreground">
                {/* Mobile hamburger button */}
                <div className="lg:hidden fixed top-4 left-4 z-40">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 bg-card rounded-lg shadow-sm border border-border hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                {/* Sidebar */}
                <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

                {/* Main content */}
                <div className="lg:pl-64">
                    <main className="py-8">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {children}
                        </div>
                    </main>

                    {/* Footer */}
                    <footer className="bg-card border-t border-border mt-16">
                        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                            <p className="text-center text-sm text-muted-foreground">
                                © 2025 Akij Group. All rights reserved.
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default AppLayout;