import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('rahil_portfolio_theme');
        if (saved === 'light' || saved === 'dark') return saved;
      } catch {}
    }
    // Default to dark mode for cyberpunk developer aesthetic
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light', 'light-mode');
      root.classList.remove('dark', 'dark-mode');
      root.style.colorScheme = 'light';
    } else {
      root.classList.add('dark', 'dark-mode');
      root.classList.remove('light', 'light-mode');
      root.style.colorScheme = 'dark';
    }
    try {
      localStorage.setItem('rahil_portfolio_theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
