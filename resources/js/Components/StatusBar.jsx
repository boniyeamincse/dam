import React from 'react';

const StatusBar = ({ segments, height = 'h-3', className = '' }) => {
    const total = segments.reduce((sum, segment) => sum + segment.value, 0);

    return (
        <div className={`flex ${height} rounded-full overflow-hidden bg-muted ${className}`}>
            {segments.map((segment, index) => {
                const percentage = (segment.value / total) * 100;
                return (
                    <div
                        key={index}
                        className={`${segment.color} transition-all duration-300`}
                        style={{ width: `${percentage}%` }}
                        title={`${segment.label}: ${segment.value} (${percentage.toFixed(1)}%)`}
                    />
                );
            })}
        </div>
    );
};

export default StatusBar;