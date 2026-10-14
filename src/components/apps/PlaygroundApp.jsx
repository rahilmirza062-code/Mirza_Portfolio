import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Sparkles, RefreshCw, Zap, Touchpad } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

export default function PlaygroundApp() {
  const [stiffness, setStiffness] = useState(400);
  const [damping, setDamping] = useState(18);
  const [radius, setRadius] = useState(16);
  const [glow, setGlow] = useState(30);
  const [accentColor, setAccentColor] = useState('#06b6d4');
  const [clickCount, setClickCount] = useState(0);

  const resetDefaults = () => {
    sound.playClick();
    setStiffness(400);
    setDamping(18);
    setRadius(16);
    setGlow(30);
    setAccentColor('#06b6d4');
  };

  return (
    <div className="h-full flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10 select-text">
      {/* Left: Controls & Sliders */}
      <div className="w-full md:w-80 p-5 bg-[#0f121d]/90 flex flex-col justify-between shrink-0 overflow-y-auto">
        <div className="space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sliders size={15} className="text-cyan-400" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-white">Interaction Physics Lab</h2>
            </div>
            <button
              onClick={resetDefaults}
              className="text-[10px] font-mono text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              title="Reset Parameters"
            >
              <RefreshCw size={11} /> Reset
            </button>
          </div>

          {/* Spring Stiffness */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Spring Stiffness</span>
              <span className="text-cyan-400">{stiffness}</span>
            </div>
            <input
              type="range"
              min="100"
              max="900"
              step="20"
              value={stiffness}
              onChange={(e) => { sound.playClick(); setStiffness(Number(e.target.value)); }}
              className="w-full accent-cyan-400 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-[10px] text-slate-500 font-mono block">Controls snap-back velocity</span>
          </div>

          {/* Damping */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Damping (Friction)</span>
              <span className="text-cyan-400">{damping}</span>
            </div>
            <input
              type="range"
              min="5"
              max="45"
              step="1"
              value={damping}
              onChange={(e) => { sound.playClick(); setDamping(Number(e.target.value)); }}
              className="w-full accent-cyan-400 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-[10px] text-slate-500 font-mono block">Higher = less oscillation bounce</span>
          </div>

          {/* Corner Radius */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Border Radius</span>
              <span className="text-cyan-400">{radius}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="32"
              step="2"
              value={radius}
              onChange={(e) => { sound.playClick(); setRadius(Number(e.target.value)); }}
              className="w-full accent-cyan-400 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Glow Intensity */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Volumetric Glow</span>
              <span className="text-cyan-400">{glow}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              step="5"
              value={glow}
              onChange={(e) => { sound.playClick(); setGlow(Number(e.target.value)); }}
              className="w-full accent-cyan-400 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Accent Color */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-slate-300 block">Accent Shader Tone</span>
            <div className="flex gap-2">
              {['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'].map((col) => (
                <button
                  key={col}
                  onClick={() => { sound.playClick(); setAccentColor(col); }}
                  className={`w-6 h-6 rounded-full border-2 transition-transform ${
                    accentColor === col ? 'scale-125 border-white shadow-lg' : 'border-transparent opacity-70'
                  }`}
                  style={{ backgroundColor: col }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 text-[10px] font-mono text-slate-500">
          Reactive Framer Motion State Tokenizer
        </div>
      </div>

      {/* Right: Live Interactive Reactive Stage */}
      <div className="flex-1 p-6 md:p-10 bg-[#08090f] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background ambient radial glow */}
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700"
          style={{ backgroundColor: accentColor }}
        />

        <div className="text-center mb-6 relative z-10">
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block mb-1">
            Live Physics Sandbox
          </span>
          <h3 className="text-lg font-bold text-white">Click, Hover & Drag the Elements</h3>
          <p className="text-xs text-slate-400">Everything below calculates physics from your active slider values</p>
        </div>

        {/* The Live Interactive Card */}
        <motion.div
          drag
          dragConstraints={{ left: -100, right: 100, top: -60, bottom: 60 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness, damping }}
          style={{
            borderRadius: `${radius}px`,
            boxShadow: `0 10px 40px -10px ${accentColor}${Math.floor(glow * 2).toString(16).padStart(2, '0')}`,
            borderColor: `${accentColor}40`
          }}
          className="w-80 p-6 bg-[#131625]/90 border backdrop-blur-xl relative z-10 cursor-grab active:cursor-grabbing text-left select-none shadow-2xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: `${accentColor}25`, border: `1px solid ${accentColor}60` }}
            >
              <Touchpad size={18} style={{ color: accentColor }} />
            </div>
            <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
              Stiffness: {stiffness}
            </span>
          </div>

          <h4 className="text-sm font-bold text-white mb-1">Kinetic Micro-Interaction</h4>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Drag me around or tap to test the spring recoil dampening!
          </p>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            {/* Interactive Button */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness, damping }}
              onClick={() => {
                sound.playSuccess();
                setClickCount(c => c + 1);
              }}
              style={{
                backgroundColor: accentColor,
                borderRadius: `${Math.max(6, radius - 6)}px`,
                boxShadow: `0 0 15px ${accentColor}60`
              }}
              className="px-4 py-2 text-xs font-bold text-black flex items-center gap-1.5"
            >
              <Zap size={13} />
              <span>Tap Pulse ({clickCount})</span>
            </motion.button>

            <span className="text-[10px] font-mono text-slate-400">
              {clickCount > 0 ? '✨ Fluid Spring' : 'Try Tapping'}
            </span>
          </div>
        </motion.div>

        {/* Code Preview Pill */}
        <div className="mt-8 px-4 py-2 rounded-lg bg-black/60 border border-white/10 font-mono text-[11px] text-slate-400 relative z-10">
          <code>transition: &#123; type: 'spring', stiffness: {stiffness}, damping: {damping} &#125;</code>
        </div>
      </div>
    </div>
  );
}
