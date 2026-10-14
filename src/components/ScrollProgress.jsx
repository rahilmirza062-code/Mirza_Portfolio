import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress((scrollTop / docHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px]"
      style={{ pointerEvents: 'none' }}
    >
      <div
        className="h-full transition-all duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background: isDark
            ? 'linear-gradient(90deg, #06b6d4, #3b82f6, #10b981)'
            : 'linear-gradient(90deg, #0891b2, #2563eb, #059669)',
          boxShadow: isDark
            ? '0 0 12px rgba(6,182,212,0.5)'
            : '0 0 8px rgba(8,145,178,0.4)',
        }}
      />
    </div>
  );
}
