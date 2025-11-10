import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Globe, Router, Cpu, Server, Settings, FilePlus, Search, BarChart3, Activity, Network, Clock, Upload, Building, FileText } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { url } = usePage();
    const { auth } = usePage().props;
    const userRoles = auth.roles || [];
    const [expandedMenus, setExpandedMenus] = useState({ 'Domain Asset Management': false, 'Switch': true, 'Vendor': false });

    const menuItems = [
        {
            name: 'Domain ',
            icon: Globe,
            submenu: [
                { name: 'Add Domain', href: '/domains/create', icon: FilePlus },
                { name: 'View Domain', href: '/domains', icon: Search },
                { name: 'Report', href: '/domains/report', icon: BarChart3 },
            ]
        },
        {
            name: 'Router',
            icon: Router,
            submenu: [
                { name: 'Add Router', href: '/routers/create', icon: FilePlus },
                { name: 'View Routers', href: '/routers', icon: Search },
                { name: 'Router Health', href: '/routers/health', icon: BarChart3 },
                { name: 'Configuration Backup', href: '/routers/configs', icon: FilePlus },
                { name: 'Firmware & Compliance', href: '/routers/compliance', icon: BarChart3 },
                { name: 'Interfaces & VLANs', href: '/routers/interfaces', icon: Search },
                { name: 'Neighbor Devices', href: '/routers/neighbors', icon: Globe },
                { name: 'Reports', href: '/routers/report', icon: BarChart3 },
                { name: 'Bulk Import / Export', href: '/routers/import', icon: FilePlus },
            ]
        },
        {
            name: 'Switch',
            icon: Cpu,
            submenu: [
                { name: 'View Switches', href: '/switches', icon: Search },
                { name: 'Add Switch', href: '/switches/create', icon: FilePlus },
                { name: 'Reports', href: '/switches/report', icon: BarChart3 },
                { name: 'Import/Export', href: '/switches/import', icon: Upload },
                { name: 'Health Status', href: '/switches/health', icon: Activity },
                { name: 'Ports & VLANs', href: '/switches/ports', icon: Network },
                { name: 'Audit Log', href: '/switches/audit', icon: Clock },
            ]
        },
        {
            name: 'Vendor',
            icon: Building,
            submenu: [
                { name: 'Add Vendor', href: '/vendors/create', icon: FilePlus },
                { name: 'View Vendors', href: '/vendors', icon: Search },
                { name: 'Contracts', href: '/vendors/contracts', icon: FileText },
                { name: 'Documents', href: '/vendors/documents', icon: FileText },
                { name: 'Reports', href: '/vendors/report', icon: BarChart3 },
            ]
        },
        { name: 'Server', href: '/servers', icon: Server },
        { name: 'Setting', href: '/settings', icon: Settings, role: 'Org Admin' },
    ];

    const isActive = (href) => url.startsWith(href);

    const toggleSubmenu = (menuName) => {
        setExpandedMenus(prev => ({ ...prev, [menuName]: !prev[menuName] }));
    };

    const renderMenuItem = (item) => {
        const Icon = item.icon;
        const showItem = !item.role || userRoles.includes(item.role);

        if (!showItem) return null;

        if (item.submenu) {
            const isExpanded = expandedMenus[item.name];
            const hasActiveSubmenu = item.submenu.some(sub => isActive(sub.href));

            return (
                <div key={item.name}>
                    <button
                        onClick={() => toggleSubmenu(item.name)}
                        className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring ${
                            hasActiveSubmenu
                                ? 'bg-primary-100 text-primary-700 border-l-4 border-primary-600 dark:bg-primary-100 dark:text-primary-700'
                                : 'text-foreground hover:bg-muted hover:text-foreground'
                        }`}
                    >
                        <div className="flex items-center">
                            <Icon className="w-5 h-5 mr-3" />
                            {item.name}
                        </div>
                        <svg
                            className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    {isExpanded && (
                        <div className="ml-6 mt-2 space-y-1">
                            {item.submenu.map((subItem) => {
                                const SubIcon = subItem.icon;
                                return (
                                    <Link
                                        key={subItem.name}
                                        href={subItem.href}
                                        className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring ${
                                            isActive(subItem.href)
                                                ? 'bg-primary-50 text-primary-600 dark:bg-primary-50 dark:text-primary-600'
                                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }`}
                                        onClick={toggleSidebar}
                                    >
                                        <SubIcon className="w-4 h-4 mr-3" />
                                        {subItem.name}
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring ${
                    isActive(item.href)
                        ? 'bg-primary-100 text-primary-700 border-l-4 border-primary-600 dark:bg-primary-100 dark:text-primary-700'
                        : 'text-foreground hover:bg-muted hover:text-foreground'
                }`}
                onClick={toggleSidebar}
            >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
            </Link>
        );
    };

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-card/95 backdrop-blur-lg shadow-xl border-r border-border transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:w-64 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-center h-16 px-4 bg-muted/50 border-b border-border">
                        <img
                            src="/logo.png"
                            alt="AKIJ"
                            className="h-8 w-auto"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'block';
                            }}
                        />
                        <span className="text-xl font-bold text-foreground hidden">AKIJ</span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {menuItems.map(renderMenuItem)}
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Sidebar;