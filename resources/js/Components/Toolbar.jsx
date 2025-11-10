import React from 'react';
import { Search, Filter, Calendar } from 'lucide-react';

const Toolbar = ({
    onSearch,
    onFilter,
    onDateRange,
    searchPlaceholder = "Search..."
}) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-xl border border-border">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder={searchPlaceholder}
                    onChange={(e) => onSearch?.(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
            </div>
            <div className="flex gap-2">
                <button
                    onClick={onFilter}
                    className="flex items-center gap-2 px-4 py-2 border border-input rounded-lg bg-background text-foreground hover:bg-muted transition-colors"
                >
                    <Filter className="w-4 h-4" />
                    Filter
                </button>
                <button
                    onClick={onDateRange}
                    className="flex items-center gap-2 px-4 py-2 border border-input rounded-lg bg-background text-foreground hover:bg-muted transition-colors"
                >
                    <Calendar className="w-4 h-4" />
                    Date Range
                </button>
            </div>
        </div>
    );
};

export default Toolbar;