import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const { userTheme } = usePage().props;
    const [theme, setTheme] = useState(userTheme || 'light');

    useEffect(() => {
        // Set initial theme from server
        setTheme(userTheme || 'light');
        document.documentElement.setAttribute('data-theme', userTheme || 'light');
    }, [userTheme]);

    const updateTheme = (newTheme) => {
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);

        // Persist to server via API call
        fetch('/settings/theme', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
            body: JSON.stringify({ theme: newTheme }),
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};