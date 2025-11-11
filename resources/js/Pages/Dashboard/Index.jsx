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
    AlertCircle,
    FileText,
    Globe
} from 'lucide-react';

export default function Index({ user, stats, alerts, expiringSoon }) {
    const { auth } = usePage().props;

    const kpiData = [
        { title: 'Total Assets', value: stats.total_assets.toLocaleString(), icon: Monitor, color: 'primary' },
        { title: 'Routers', value: stats.routers.toLocaleString(), icon: Router, color: 'success' },
        { title: 'Switches', value: stats.switches.toLocaleString(), icon: Cpu, color: 'warning' },
        { title: 'Cameras', value: stats.cameras.toLocaleString(), icon: Camera, color: 'info' },
        { title: 'Servers', value: stats.servers.toLocaleString(), icon: Server, color: 'primary' },
        { title: 'Domains', value: stats.domains.toLocaleString(), icon: Globe, color: 'success' },
        { title: 'Software Licenses', value: (stats.licenses || 0).toLocaleString(), icon: FileText, color: 'secondary' },
        { title: 'Open Alerts', value: stats.active_alerts.toString(), icon: AlertTriangle, color: 'danger' },
        { title: 'Expiring Soon', value: (stats.expiring_soon + (stats.license_expiring_soon || 0)).toString(), icon: Clock, color: 'warning' },
    ];

    const statusSegments = [
        { label: 'Healthy', value: 85, color: 'bg-green-500' },
        { label: 'Warning', value: 10, color: 'bg-yellow-500' },
        { label: 'Critical', value: 5, color: 'bg-red-500' },
    ];

    const alertsData = alerts.map(alert => ({
        icon: alert.type === 'critical' ? AlertTriangle : AlertCircle,
        title: alert.title,
        meta: alert.timestamp ? `${alert.timestamp.diffForHumans()}` : 'Recently',
        badge: <StatBadge variant={alert.type === 'critical' ? 'danger' : 'warning'}>
            {alert.type === 'critical' ? 'Critical' : 'Warning'}
        </StatBadge>
    }));

    const expiringData = expiringSoon.map(item => ({
        icon: item.type === 'domain' ? Globe : FileText,
        title: item.title,
        meta: `${item.type === 'domain' ? 'Domain' : 'License'} expires in ${item.days_left} days`,
        badge: <StatBadge variant={
            item.days_left <= 7 ? 'danger' :
            item.days_left <= 15 ? 'warning' :
            item.type === 'license' ? 'secondary' : 'info'
        }>
            {item.days_left} days
        </StatBadge>
    }));

    const activityData = [
        {
            icon: CheckCircle,
            title: 'Router R2 Firmware Updated',
            meta: '1 hour ago',
            badge: <StatBadge variant="success">Success</StatBadge>
        },
        {
            icon: FileText,
            title: 'New License Added: Microsoft Office 365',
            meta: '2 hours ago',
            badge: <StatBadge variant="info">License</StatBadge>
        },
        {
            icon: Camera,
            title: 'Security Camera CAM-001 Configured',
            meta: '3 hours ago',
            badge: <StatBadge variant="success">Camera</StatBadge>
        },
        {
            icon: Activity,
            title: 'New Server S4 Added',
            meta: '4 hours ago',
            badge: <StatBadge variant="info">Server</StatBadge>
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
                            <StatBadge variant="warning">{expiringSoon.length} Items</StatBadge>
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