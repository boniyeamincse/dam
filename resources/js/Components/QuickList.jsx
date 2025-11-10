import React from 'react';

const QuickList = ({ items }) => {
    return (
        <div className="space-y-3">
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    {item.icon && (
                        <div className="flex-shrink-0">
                            <item.icon className="w-5 h-5 text-muted-foreground" />
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                            {item.title}
                        </p>
                        {item.meta && (
                            <p className="text-xs text-muted-foreground">
                                {item.meta}
                            </p>
                        )}
                    </div>
                    {item.badge && (
                        <div className="flex-shrink-0">
                            {item.badge}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default QuickList;