import React from 'react';
import { Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    const themes = [
        { key: 'light', label: 'Akij Light', icon: Sun },
        { key: 'slate', label: 'Akij Slate', icon: Moon },
    ];

    return (
        <div className="relative">
            <div className="flex items-center space-x-1">
                {themes.map(({ key, label, icon: Icon }) => (
                    <button
                        key={key}
                        onClick={() => setTheme(key)}
                        className={`p-2 rounded-lg transition-colors ${
                            theme === key
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                        }`}
                        aria-label={`Switch to ${label} theme`}
                        title={label}
                    >
                        <Icon className="w-4 h-4" />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ThemeToggle;