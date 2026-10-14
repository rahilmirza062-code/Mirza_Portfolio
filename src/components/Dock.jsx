import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, User, Terminal, Sliders, Mail, Github } from 'lucide-react';
import { sound } from '../audio/soundEngine';
import { PROFILE } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export default function Dock({ openWindows = {}, onOpenApp, activeWindow, onDockClick }) {
  const [hoveredApp, setHoveredApp] = useState(null);
  const { isDark } = useTheme();

  const apps = [
    { id: 'projects', label: 'Projects.app', icon: Layers, color: 'from-cyan-500 to-blue-600' },
    { id: 'about', label: 'About_Rahil.app', icon: User, color: 'from-purple-500 to-pink-600' },
    { id: 'terminal', label: 'Terminal.sh', icon: Terminal, color: 'from-emerald-500 to-teal-600' },
    { id: 'playground', label: 'Interaction_Lab.app', icon: Sliders, color: 'from-amber-500 to-orange-600' },
    { id: 'contact', label: 'Contact_Dispatch.app', icon: Mail, color: 'from-blue-500 to-indigo-600' },
    { 
      id: 'github', 
      label: 'GitHub Profile', 
      icon: Github, 
      color: 'from-slate-700 to-slate-900',
      isExternal: true,
      url: PROFILE.github
    }
  ];

  const handleAppClick = (app) => {
    if (app.isExternal) {
      sound.playClick();
      window.open(app.url, '_blank');
      return;
    }
    if (onDockClick) {
      onDockClick(app.id);
    } else if (onOpenApp) {
      onOpenApp(app.id);
    }
  };

  return (
    <div className="fixed bottom-3 inset-x-0 flex justify-center items-center z-40 pointer-events-none">
      <motion.nav 
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 260, delay: 0.2 }}
        className={`pointer-events-auto flex items-end gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-2xl backdrop-blur-2xl border shadow-2xl transition-all ${
          isDark 
            ? 'bg-[#0e111d]/85 border-white/10 shadow-black/60' 
            : 'bg-white/90 border-slate-300 shadow-slate-900/15'
        }`}
        role="toolbar"
        aria-label="Application Dock"
      >
        {apps.map((app) => {
          const Icon = app.icon;
          const isOpen = openWindows[app.id]?.isOpen;
          const isMinimized = openWindows[app.id]?.isMinimized;
          const isActive = activeWindow === app.id && isOpen && !isMinimized;

          return (
            <div key={app.id} className="relative flex flex-col items-center">
              {/* Tooltip Label on Hover */}
              {hoveredApp === app.id && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: -12 }}
                  exit={{ opacity: 0 }}
                  className={`absolute bottom-full mb-1 px-2.5 py-1 rounded-md text-[11px] font-mono whitespace-nowrap border shadow-xl pointer-events-none z-50 ${
                    isDark 
                      ? 'bg-black/95 text-white border-white/10' 
                      : 'bg-slate-900 text-white border-slate-700'
                  }`}
                >
                  <span>{app.label}</span>
                  {isMinimized && <span className="ml-1 text-amber-400 text-[10px]">• Minimized (click to restore)</span>}
                  {isActive && <span className="ml-1 text-cyan-400 text-[10px]">• Active</span>}
                </motion.div>
              )}

              {/* Magnified Dock Icon */}
              <motion.button
                id={`dock-app-${app.id}`}
                data-testid={`dock-app-${app.id}`}
                whileHover={{ scale: 1.22, y: -8 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 450, damping: 18 }}
                onMouseEnter={() => { sound.playHover(); setHoveredApp(app.id); }}
                onMouseLeave={() => setHoveredApp(null)}
                onClick={() => handleAppClick(app)}
                aria-label={
                  isMinimized
                    ? `Restore ${app.label} (Minimized)`
                    : isActive
                    ? `${app.label} (Active)`
                    : isOpen
                    ? `Bring ${app.label} to front`
                    : `Open ${app.label}`
                }
                title={isMinimized ? `Restore ${app.label}` : app.label}
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl p-0.5 bg-gradient-to-tr ${app.color} shadow-lg relative flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isActive 
                    ? 'ring-2 ring-cyan-400/80 shadow-cyan-500/30' 
                    : isMinimized
                    ? 'ring-2 ring-amber-400/80 shadow-[0_0_12px_rgba(251,191,36,0.35)]'
                    : ''
                }`}
              >
                <div className={`w-full h-full rounded-[10px] flex items-center justify-center overflow-hidden ${
                  isDark ? 'bg-[#111422] text-white/90 hover:text-white' : 'bg-slate-900 text-white'
                }`}>
                  {app.id === 'about' ? (
                    <img src={PROFILE.avatar} alt="Rahil" className="w-full h-full object-cover object-top" />
                  ) : (
                    <Icon size={20} />
                  )}
                </div>
              </motion.button>

              {/* Distinct Active/Minimized/Open Status Indicator Dot */}
              <div className="h-1.5 flex items-center justify-center mt-1">
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8] animate-pulse" />
                )}
                {!isActive && isOpen && !isMinimized && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/75" />
                )}
                {isOpen && isMinimized && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24] animate-pulse" />
                )}
              </div>
            </div>
          );
        })}
      </motion.nav>
    </div>
  );
}
