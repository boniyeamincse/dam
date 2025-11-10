import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Globe, Router, GitMerge, Server, Settings, Menu } from 'lucide-react';

const navigation = [
    { name: 'Domain', href: '/domains', icon: Globe },
    { name: 'Router', href: '/routers', icon: Router },
    { name: 'Switch', href: '/switches', icon: GitMerge },
    { name: 'Server', href: '/servers', icon: Server },
    { name: 'Setting', href: '/settings', icon: Settings, role: 'Org Admin' },
];

export default function Sidebar({ isOpen, toggleSidebar }) {
    const { url, auth } = usePage().props;
    const userRoles = auth.roles || [];

    const isActive = (href) => url.startsWith(href);

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Logo area */}
                <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
                    <img src="/logo.png" alt="Logo" className="h-8 w-auto" onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                    }} />
                    <span className="text-xl font-bold text-gray-900 hidden">AKIJ</span>
                </div>

                {/* Navigation */}
                <nav className="px-4 py-6 space-y-2">
                    {navigation.map((item) => {
                        if (item.role && !userRoles.includes(item.role)) {
                            return null;
                        }

                        const Icon = item.icon;
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                                    active
                                        ? 'bg-indigo-50 text-indigo-700 border-l-2 border-indigo-700'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                                onClick={() => toggleSidebar()}
                            >
                                <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </>
    );
}