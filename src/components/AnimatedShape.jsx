import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

/**
 * AnimatedShape — Reusable placeholder component for future 3D visual selection
 * Supports 4 visual directions:
 *   1. 'orb'       — Neon glass orb
 *   2. 'mobius'    — Chrome Möbius loop
 *   3. 'wireframe' — Orbital wireframe
 *   4. 'crystal'   — Geometric crystal
 */
export default function AnimatedShape({ variant = 'orb', className = '', size = 140 }) {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className={`animated-shape-container ${className}`}
      aria-hidden="true"
    >
      {variant === 'orb' && (
        <div 
          className="animated-shape--orb" 
          style={{ width: size, height: size }}
        />
      )}

      {variant === 'mobius' && (
        <div 
          className="animated-shape--mobius"
          style={{ width: size, height: size }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
            <defs>
              <linearGradient id="mobiusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isDark ? '#38bdf8' : '#0284c7'} />
                <stop offset="50%" stopColor={isDark ? '#e2e8f0' : '#475569'} />
                <stop offset="100%" stopColor={isDark ? '#818cf8' : '#6366f1'} />
              </linearGradient>
            </defs>
            <path
              d="M30,50 C30,30 50,30 50,50 C50,70 70,70 70,50 C70,30 50,30 50,50 C50,70 30,70 30,50 Z"
              fill="none"
              stroke="url(#mobiusGrad)"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}

      {variant === 'wireframe' && (
        <div 
          className="animated-shape--wireframe"
          style={{ width: size, height: size }}
        >
          <div className="wireframe-ring wireframe-ring--1" />
          <div className="wireframe-ring wireframe-ring--2" />
          <div className="wireframe-ring wireframe-ring--3" />
        </div>
      )}

      {variant === 'crystal' && (
        <div 
          className="animated-shape--crystal"
          style={{ width: size, height: size }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="crystalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isDark ? '#38bdf8' : '#0ea5e9'} stopOpacity="0.8" />
                <stop offset="50%" stopColor={isDark ? '#c084fc' : '#a855f7'} stopOpacity="0.7" />
                <stop offset="100%" stopColor={isDark ? '#34d399' : '#10b981'} stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <polygon
              points="50,10 85,35 70,85 30,85 15,35"
              fill="url(#crystalGrad)"
              stroke={isDark ? '#38bdf8' : '#0284c7'}
              strokeWidth="2"
            />
            <line x1="50" y1="10" x2="50" y2="85" stroke={isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.2)'} strokeWidth="1.5" />
            <line x1="15" y1="35" x2="85" y2="35" stroke={isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.2)'} strokeWidth="1.5" />
          </svg>
        </div>
      )}
    </motion.div>
  );
}
