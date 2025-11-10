import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AppLayout from '@/Layouts/AppLayout';
import KpiCard from '@/Components/KpiCard';
import StatusBar from '@/Components/StatusBar';
import StatBadge from '@/Components/StatBadge';
import SectionPanel from '@/Components/SectionPanel';
import Toolbar from '@/Components/Toolbar';
import QuickList from '@/Components/QuickList';
import {
    Monitor,
    Router,
    Cpu,
    Camera,
    Server,
    AlertTriangle,
    Clock,
    Activity,
    CheckCircle,
    XCircle,
    AlertCircle
} from 'lucide-react';

export default function Index({ user, stats }) {
    const { auth } = usePage().props;

    // Mock data for demonstration
    const kpiData = [
        { title: 'Total Assets', value: '1,247', icon: Monitor, trend: 'up', trendValue: '+12%', color: 'primary' },
        { title: 'Routers', value: '89', icon: Router, trend: 'up', trendValue: '+5%', color: 'success' },
        { title: 'Switches', value: '156', icon: Cpu, trend: 'down', trendValue: '-2%', color: 'warning' },
        { title: 'Cameras', value: '342', icon: Camera, color: 'info' },
        { title: 'Servers', value: '23', icon: Server, color: 'primary' },
        { title: 'Open Alerts', value: '7', icon: AlertTriangle, color: 'danger' },
        { title: 'Expiring Soon', value: '12', icon: Clock, color: 'warning' },
    ];

    const statusSegments = [
        { label: 'Healthy', value: 85, color: 'bg-green-500' },
        { label: 'Warning', value: 10, color: 'bg-yellow-500' },
        { label: 'Critical', value: 5, color: 'bg-red-500' },
    ];

    const alertsData = [
        {
            icon: AlertTriangle,
            title: 'Router R1 Connection Lost',
            meta: '2 hours ago',
            badge: <StatBadge variant="danger">Critical</StatBadge>
        },
        {
            icon: AlertCircle,
            title: 'SSL Certificate Expiring',
            meta: 'domain.akij.com - 7 days',
            badge: <StatBadge variant="warning">Warning</StatBadge>
        },
        {
            icon: XCircle,
            title: 'Server S3 High CPU Usage',
            meta: '15 minutes ago',
            badge: <StatBadge variant="danger">Critical</StatBadge>
        },
    ];

    const expiringData = [
        {
            icon: Clock,
            title: 'Domain: akij.com',
            meta: 'Expires in 15 days',
            badge: <StatBadge variant="warning">15 days</StatBadge>
        },
        {
            icon: Clock,
            title: 'SSL: api.akij.com',
            meta: 'Expires in 7 days',
            badge: <StatBadge variant="danger">7 days</StatBadge>
        },
        {
            icon: Clock,
            title: 'Domain: portal.akij.com',
            meta: 'Expires in 30 days',
            badge: <StatBadge variant="info">30 days</StatBadge>
        },
    ];

    const activityData = [
        {
            icon: CheckCircle,
            title: 'Router R2 Firmware Updated',
            meta: '1 hour ago',
            badge: <StatBadge variant="success">Success</StatBadge>
        },
        {
            icon: Activity,
            title: 'New Server S4 Added',
            meta: '3 hours ago',
            badge: <StatBadge variant="info">Info</StatBadge>
        },
        {
            icon: AlertCircle,
            title: 'Switch SW1 Config Backup',
            meta: '5 hours ago',
            badge: <StatBadge variant="neutral">System</StatBadge>
        },
    ];

    return (
        <AppLayout title="Dashboard">
            <div className="space-y-8">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        Akij Group Assets Management
                    </h1>
                    <p className="text-muted-foreground">
                        Welcome back, {auth.user?.name || 'User'}! Here's your asset overview.
                    </p>
                </motion.div>

                {/* KPI Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {kpiData.map((kpi, index) => (
                        <KpiCard
                            key={index}
                            title={kpi.title}
                            value={kpi.value}
                            trend={kpi.trend}
                            trendValue={kpi.trendValue}
                            icon={kpi.icon}
                            color={kpi.color}
                        />
                    ))}
                </motion.div>

                {/* Status Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <SectionPanel title="System Health Overview">
                        <div className="space-y-4">
                            <StatusBar segments={statusSegments} />
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-green-600">85%</div>
                                    <div className="text-sm text-muted-foreground">Healthy</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-yellow-600">10%</div>
                                    <div className="text-sm text-muted-foreground">Warning</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-red-600">5%</div>
                                    <div className="text-sm text-muted-foreground">Critical</div>
                                </div>
                            </div>
                        </div>
                    </SectionPanel>
                </motion.div>

                {/* Panels Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                    {/* Open Alerts */}
                    <SectionPanel
                        title="Open Alerts"
                        actions={
                            <StatBadge variant="danger">7 Active</StatBadge>
                        }
                    >
                        <QuickList items={alertsData} />
                    </SectionPanel>

                    {/* Expiring Soon */}
                    <SectionPanel
                        title="Expiring Soon"
                        actions={
                            <StatBadge variant="warning">12 Items</StatBadge>
                        }
                    >
                        <QuickList items={expiringData} />
                    </SectionPanel>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <SectionPanel title="Recent Activity">
                        <QuickList items={activityData} />
                    </SectionPanel>
                </motion.div>
            </div>
        </AppLayout>
    );
}