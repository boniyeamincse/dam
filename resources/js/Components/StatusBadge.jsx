import React from 'react';

export default function StatusBadge({ variant = 'gray', children, className = '' }) {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';

    const variantClasses = {
        green: 'bg-green-100 text-green-800',
        red: 'bg-red-100 text-red-800',
        amber: 'bg-amber-100 text-amber-800',
        blue: 'bg-blue-100 text-blue-800',
        slate: 'bg-slate-100 text-slate-800',
        gray: 'bg-gray-100 text-gray-800',
    };

    return (
        <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
            {children}
        </span>
    );
}