import React, { useState, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Minus, Square, Minimize2 } from 'lucide-react';
import { sound } from '../audio/soundEngine';

/**
 * Calculates responsive, centered initial window geometry
 * Respects top navigation/menubar and bottom dock
 */
export function getInitialGeometry(id) {
  if (typeof window === 'undefined') {
    return { x: 40, y: 70, width: 640, height: 460 };
  }
  const screenW = window.innerWidth;
  const screenH = window.innerHeight;

  const targetSizes = {
    terminal: { w: 680, h: 480 },
    contact: { w: 660, h: 540 },
    playground: { w: 780, h: 520 },
    about: { w: 780, h: 560 },
    projects: { w: 840, h: 580 },
  };

  const target = targetSizes[id] || { w: 660, h: 480 };
  const width = Math.min(target.w, Math.max(300, screenW - 24));
  const height = Math.min(target.h, Math.max(320, screenH - 156));

  const x = Math.max(10, Math.round((screenW - width) / 2));
  const y = Math.max(68, Math.round((screenH - height - 88) / 2));

  return { x, y, width, height };
}

/**
 * Calculates maximized geometry that fills the desktop workspace cleanly
 * Respects top navigation/menubar (68px) and bottom dock (88px)
 */
export function getMaximizedGeometry() {
  if (typeof window === 'undefined') {
    return { x: 12, y: 68, width: 800, height: 500 };
  }
  const screenW = window.innerWidth;
  const screenH = window.innerHeight;

  const topOffset = 68; // Clears sticky navbar / menubar
  const bottomMargin = 88; // Clears bottom dock cleanly
  const x = 12;
  const width = Math.max(300, screenW - 24);
  const height = Math.max(320, screenH - topOffset - bottomMargin);

  return { x, y: topOffset, width, height };
}

export default function WindowFrame({
  id,
  title,
  icon: Icon,
  isOpen,
  isMinimized,
  isMaximized = false,
  zIndex = 10,
  initialPosition,
  initialSize,
  onMinimize,
  onToggleMaximize,
  onFocus,
  children
}) {
  const dragControls = useDragControls();
  const [redPulse, setRedPulse] = useState(false);

  const [viewportSize, setViewportSize] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  }));

  const [geometry, setGeometry] = useState(() => {
    const geo = getInitialGeometry(id);
    return {
      x: initialPosition?.x ?? geo.x,
      y: initialPosition?.y ?? geo.y,
      width: initialSize?.width ?? geo.width,
      height: initialSize?.height ?? geo.height,
    };
  });

  // Keep window responsive on viewport resize without resetting user positioning
  useEffect(() => {
    const handleResize = () => {
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      setViewportSize({ width: screenW, height: screenH });

      setGeometry(prev => {
        const width = Math.min(prev.width, Math.max(300, screenW - 24));
        const height = Math.min(prev.height, Math.max(320, screenH - 156));
        const x = Math.min(Math.max(10, prev.x), Math.max(10, screenW - width - 10));
        const y = Math.min(Math.max(68, prev.y), Math.max(68, screenH - height - 88));
        return { x, y, width, height };
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // When window is not opened yet, do not render
  if (!isOpen) return null;

  const maxGeo = getMaximizedGeometry();

  // Red circle click handler: Harmless decorative indicator, NEVER closes or unmounts the app
  const handleRedControlClick = (e) => {
    e.stopPropagation();
    sound.playClick();
    setRedPulse(true);
    setTimeout(() => setRedPulse(false), 450);
  };

  // Yellow circle click handler: Minimize window to dock without unmounting or losing state
  const handleMinimize = (e) => {
    e.stopPropagation();
    if (onMinimize) onMinimize(id);
  };

  // Green circle click handler: Toggle expand/restore window geometry
  const handleToggleMaximize = (e) => {
    e.stopPropagation();
    if (onToggleMaximize) onToggleMaximize(id);
  };

  const currentX = isMaximized ? maxGeo.x : geometry.x;
  const currentY = isMaximized ? maxGeo.y : geometry.y;
  const currentW = isMaximized ? maxGeo.width : geometry.width;
  const currentH = isMaximized ? maxGeo.height : geometry.height;

  // Minimize targets bottom center dock position
  const targetX = isMinimized ? Math.round(viewportSize.width / 2 - currentW / 2) : currentX;
  const targetY = isMinimized ? Math.max(68, viewportSize.height - 30) : currentY;
  const targetScale = isMinimized ? 0.12 : 1;
  const targetOpacity = isMinimized ? 0 : 1;

  return (
    <motion.div
      drag={!isMaximized && !isMinimized}
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0.02}
      dragConstraints={{
        top: 68,
        left: 8,
        right: Math.max(8, viewportSize.width - 120),
        bottom: Math.max(68, viewportSize.height - 120)
      }}
      onDragEnd={(e, info) => {
        if (!isMaximized && !isMinimized) {
          setGeometry(prev => ({
            ...prev,
            x: Math.max(8, Math.min(viewportSize.width - 100, prev.x + info.offset.x)),
            y: Math.max(68, Math.min(viewportSize.height - 100, prev.y + info.offset.y)),
          }));
        }
      }}
      onMouseDown={() => onFocus && onFocus(id)}
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{
        opacity: targetOpacity,
        scale: targetScale,
        x: targetX,
        y: targetY,
        width: currentW,
        height: currentH,
      }}
      transition={{
        type: 'spring',
        damping: 27,
        stiffness: 290,
        opacity: { duration: 0.18 },
        scale: { duration: 0.22 }
      }}
      style={{
        zIndex: isMinimized ? -20 : zIndex,
        pointerEvents: isMinimized ? 'none' : 'auto',
      }}
      aria-hidden={isMinimized}
      className={`fixed top-0 left-0 flex flex-col rounded-xl overflow-hidden glass-panel shadow-2xl border border-white/10 dark:border-white/10 transition-shadow ${
        isMaximized ? 'rounded-lg shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]' : ''
      }`}
    >
      {/* Window Header / Title Bar */}
      <div 
        onPointerDown={(e) => {
          if (!isMaximized && !isMinimized && e.button === 0 && !e.target.closest('button')) {
            dragControls.start(e);
          }
        }}
        onDoubleClick={handleToggleMaximize}
        className="h-10 px-4 bg-[#0d101c]/90 dark:bg-[#0d101c]/95 border-b border-white/10 flex items-center justify-between cursor-grab active:cursor-grabbing select-none shrink-0"
      >
        {/* Left: Window Control Buttons (macOS style) */}
        <div className="flex items-center gap-2 group/controls" role="group" aria-label="Window controls">
          {/* Red Button: Decorative / Protected Indicator (Never Closes) */}
          <button
            type="button"
            id={`window-ctrl-red-${id}`}
            data-testid={`window-ctrl-red-${id}`}
            onClick={handleRedControlClick}
            aria-label="Window protected"
            title="Window protected (cannot be closed)"
            className={`w-3.5 h-3.5 rounded-full bg-rose-500/85 hover:bg-rose-500 active:bg-rose-600 flex items-center justify-center transition-all hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 text-black/70 hover:text-black cursor-pointer shadow-sm relative ${
              redPulse ? 'scale-125 ring-2 ring-rose-400/90 shadow-[0_0_10px_#f43f5e]' : ''
            }`}
          >
            {/* Harmless decorative center dot */}
            <span className="w-1.5 h-1.5 rounded-full bg-rose-950/40 opacity-0 group-hover/controls:opacity-100 transition-opacity" />
          </button>

          {/* Yellow Button: Minimize window */}
          <button
            type="button"
            id={`window-ctrl-minimize-${id}`}
            data-testid={`window-ctrl-minimize-${id}`}
            onClick={handleMinimize}
            aria-label="Minimize window"
            title="Minimize window"
            className="w-3.5 h-3.5 rounded-full bg-amber-400 hover:bg-amber-500 active:bg-amber-600 flex items-center justify-center transition-all hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 text-black/70 hover:text-black cursor-pointer shadow-sm"
          >
            <Minus size={9} className="opacity-0 group-hover/controls:opacity-100 transition-opacity stroke-[2.5]" />
          </button>

          {/* Green Button: Expand window / Restore window */}
          <button
            type="button"
            id={`window-ctrl-expand-${id}`}
            data-testid={`window-ctrl-expand-${id}`}
            onClick={handleToggleMaximize}
            aria-label={isMaximized ? "Restore window" : "Expand window"}
            title={isMaximized ? "Restore window" : "Expand window"}
            className="w-3.5 h-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 flex items-center justify-center transition-all hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 text-black/70 hover:text-black cursor-pointer shadow-sm"
          >
            {isMaximized ? (
              <Minimize2 size={8} className="opacity-0 group-hover/controls:opacity-100 transition-opacity stroke-[2.5]" />
            ) : (
              <Square size={8} className="opacity-0 group-hover/controls:opacity-100 transition-opacity stroke-[2.5]" />
            )}
          </button>
        </div>

        {/* Center: Window Title */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-200 font-medium tracking-wide truncate max-w-[60%]">
          {Icon && <Icon size={14} className="text-cyan-400 shrink-0" />}
          <span className="truncate">{title}</span>
        </div>

        {/* Right: Window Controls State Pill */}
        <div className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-white/5 border border-white/5">
          {isMaximized ? 'Expanded' : 'RahilOS'}
        </div>
      </div>

      {/* Window Body / Content Area — Preserves internal state when minimized */}
      <div className="flex-1 overflow-auto bg-[#0a0c14]/95 p-0 relative text-slate-200">
        {children}
      </div>
    </motion.div>
  );
}
