import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import ThemeToggle from '@/Components/ThemeToggle';
import { Menu, User, Settings, LogOut } from 'lucide-react';

const AppLayout = ({ children, title }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { auth } = usePage().props;

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
                    {/* Header */}
                    <header className="bg-card border-b border-border sticky top-0 z-10">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                {/* Page Title */}
                                <div className="flex-1">
                                    <h1 className="text-xl font-semibold text-foreground truncate">
                                        {title}
                                    </h1>
                                </div>

                                {/* Right side actions */}
                                <div className="flex items-center space-x-4">
                                    {/* Theme Toggle */}
                                    <ThemeToggle />

                                    {/* User Menu */}
                                    <div className="relative">
                                        <div className="flex items-center space-x-3">
                                            <div className="hidden md:block text-right">
                                                <p className="text-sm font-medium text-foreground">
                                                    {auth.user?.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {auth.user?.email}
                                                </p>
                                            </div>
                                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                                <User className="w-4 h-4 text-primary-foreground" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

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