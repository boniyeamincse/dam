import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const KpiCard = ({
    title,
    value,
    trend,
    trendValue,
    icon: Icon,
    color = 'primary'
}) => {
    const getColorClasses = () => {
        const colors = {
            primary: 'text-primary bg-primary-100',
            success: 'text-success bg-green-100',
            warning: 'text-warning bg-yellow-100',
            danger: 'text-danger bg-red-100',
        };
        return colors[color] || colors.primary;
    };

    const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;
    const trendColor = trend === 'up' ? 'text-success' : 'text-danger';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl p-6 border border-border hover:shadow-md transition-shadow"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
                    {trend && trendValue && (
                        <div className={`flex items-center mt-2 text-sm ${trendColor}`}>
                            <TrendIcon className="w-4 h-4 mr-1" />
                            <span>{trendValue}</span>
                        </div>
                    )}
                </div>
                {Icon && (
                    <div className={`p-3 rounded-xl ${getColorClasses()}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default KpiCard;