import React from 'react';
import { motion } from 'framer-motion';

const SectionPanel = ({
    title,
    children,
    actions,
    className = ''
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-card rounded-2xl border border-border shadow-sm ${className}`}
        >
            {(title || actions) && (
                <div className="flex items-center justify-between p-6 pb-4">
                    {title && (
                        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                    )}
                    {actions && (
                        <div className="flex items-center gap-2">
                            {actions}
                        </div>
                    )}
                </div>
            )}
            <div className="px-6 pb-6">
                {children}
            </div>
        </motion.div>
    );
};

export default SectionPanel;