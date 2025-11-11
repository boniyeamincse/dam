import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Home, Globe, Router, Cpu, Server, Settings, FilePlus, Search, BarChart3, Activity, Network, Clock, Upload, Building, FileText, Camera, Shield, MapPin, AlertTriangle, User, Palette, Mail, Database, Info } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { url } = usePage();
    const { auth } = usePage().props;
    const userRoles = auth.roles || [];
    const [expandedMenus, setExpandedMenus] = useState({ 'Domain Asset Management': false, 'Switch': true, 'Vendor': false });

    const menuItems = [
        {
            name: 'Dashboard',
            icon: Home,
            submenu: [
                { name: 'Overview (KPIs & quick links)', href: '/dashboard', icon: Home },
                { name: 'Open Alerts', href: '/dashboard/alerts', icon: AlertTriangle },
                { name: 'Expiring Soon', href: '/dashboard/expiring', icon: Clock },
            ]
        },
        {
            name: 'Domain Asset Management',
            icon: Globe,
            submenu: [
                { name: 'Add Domain', href: '/domains/create', icon: FilePlus },
                { name: 'View / Search Domains', href: '/domains', icon: Search },
                { name: 'Reports (expiry, registrar, environment)', href: '/domains/report', icon: BarChart3 },
            ]
        },
        {
            name: 'Router',
            icon: Router,
            submenu: [
                { name: 'Add Router', href: '/routers/create', icon: FilePlus },
                { name: 'View Routers', href: '/routers', icon: Search },
                { name: 'Report', href: '/routers/report', icon: BarChart3 },
                // Advanced placeholders
                // { name: 'Health', href: '/routers/{id}/health', icon: Activity },
                // { name: 'Interfaces', href: '/routers/{id}/interfaces', icon: Network },
                // { name: 'VLANs', href: '/routers/{id}/vlans', icon: Network },
                // { name: 'Neighbors', href: '/routers/{id}/neighbors', icon: Network },
                // { name: 'Configs', href: '/routers/{id}/configs', icon: Network },
            ]
        },
        {
            name: 'Switch Inventory',
            icon: Cpu,
            submenu: [
                { name: 'Add Switch', href: '/switches/create', icon: FilePlus },
                { name: 'View / Search Switches', href: '/switches', icon: Search },
                { name: 'Ports & VLANs (placeholder)', href: '/switches/ports', icon: Network },
                { name: 'Reports', href: '/switches/report', icon: BarChart3 },
                { name: 'Import / Export', href: '/switches/import', icon: Upload },
            ]
        },
        {
            name: 'Server Inventory',
            icon: Server,
            submenu: [
                { name: 'Add Server', href: '/servers/create', icon: FilePlus },
                { name: 'View / Search Servers', href: '/servers', icon: Search },
                { name: 'Health (placeholder)', href: '/servers/health', icon: Activity },
                { name: 'Reports', href: '/servers/report', icon: BarChart3 },
                { name: 'Import / Export', href: '/servers/import', icon: Upload },
            ]
        },
        {
            name: 'Camera / CCTV',
            icon: Camera,
            submenu: [
                { name: 'Add Camera', href: '/cameras/create', icon: FilePlus },
                { name: 'View / Search Cameras', href: '/cameras', icon: Search },
                { name: 'Health (stale feeds)', href: '/cameras/health', icon: Activity },
                { name: 'Reports', href: '/cameras/report', icon: BarChart3 },
                { name: 'Import / Export', href: '/cameras/import', icon: Upload },
            ]
        },
        {
            name: 'Vendor Management',
            icon: Building,
            submenu: [
                { name: 'Add Vendor', href: '/vendors/create', icon: FilePlus },
                { name: 'View Vendors', href: '/vendors', icon: Search },
                { name: 'Contracts', href: '/vendors/contracts', icon: FileText },
                { name: 'Documents', href: '/vendors/documents', icon: FileText },
                { name: 'Reports', href: '/vendors/report', icon: BarChart3 },
            ]
        },
        {
            name: 'License Compliance',
            icon: Shield,
            submenu: [
                { name: 'Add Software / License', href: '/licenses/create', icon: FilePlus },
                { name: 'Installed Software Inventory', href: '/licenses/inventory', icon: Search },
                { name: 'Compliance Status', href: '/licenses/compliance', icon: Activity },
                { name: 'Renewals & Calendar', href: '/licenses/calendar', icon: Clock },
                { name: 'Evidence & Documents', href: '/licenses/documents', icon: FileText },
                { name: 'Vendors & Contracts', href: '/licenses/vendors', icon: Building },
                { name: 'Alerts & Remediation', href: '/licenses/alerts', icon: AlertTriangle },
                { name: 'Reports', href: '/licenses/report', icon: BarChart3 },
                { name: 'Import / Discovery', href: '/licenses/import', icon: Upload },
            ]
        },
        {
            name: 'Documents',
            icon: FileText,
            submenu: [
                { name: 'Upload / Library', href: '/documents', icon: Upload },
                { name: 'Linked to Asset', href: '/documents/assets', icon: Server },
                { name: 'Linked to Vendor / Contract', href: '/documents/vendors', icon: Building },
                { name: 'Linked to License', href: '/documents/licenses', icon: Shield },
            ]
        },
        {
            name: 'Locations & Network',
            icon: MapPin,
            submenu: [
                { name: 'Locations', href: '/locations', icon: MapPin },
                { name: 'Subnets & VLANs', href: '/locations/subnets', icon: Network },
                { name: 'Asset Relations / Topology', href: '/locations/topology', icon: Globe },
            ]
        },
        {
            name: 'Reports',
            icon: BarChart3,
            submenu: [
                { name: 'Asset Inventory Summary', href: '/reports/assets', icon: BarChart3 },
                { name: 'Compliance Summary', href: '/reports/compliance', icon: Shield },
                { name: 'Warranty / Contract Expiries', href: '/reports/expiries', icon: Clock },
                { name: 'Custom CSV Exports', href: '/reports/exports', icon: Upload },
            ]
        },
        {
            name: 'Alerts',
            icon: AlertTriangle,
            submenu: [
                { name: 'Open / Acknowledged / Closed', href: '/alerts', icon: AlertTriangle },
                { name: 'Schedules & Jobs', href: '/alerts/schedules', icon: Clock },
            ]
        },
        {
            name: 'Settings',
            icon: Settings,
            role: 'Org Admin',
            submenu: [
                { name: 'User Preferences', href: '/settings', icon: Settings },
                { name: 'Users & Roles', href: '/settings/users', icon: User },
                { name: 'Branding & Logo', href: '/settings/branding', icon: Palette },
                { name: 'Email (SMTP)', href: '/settings/email', icon: Mail },
                { name: 'Backup', href: '/settings/backup', icon: Database },
                { name: 'Audit Log', href: '/settings/audit', icon: FileText },
                { name: 'Theme Defaults', href: '/settings/themes', icon: Palette },
                { name: 'API/Integrations', href: '/settings/api', icon: Globe },
                { name: 'About', href: '/settings/about', icon: Info },
            ]
        },
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
                                ? 'bg-primary text-primary-foreground'
                                : 'text-foreground hover:bg-muted'
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
                                                ? 'bg-primary text-primary-foreground'
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
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
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