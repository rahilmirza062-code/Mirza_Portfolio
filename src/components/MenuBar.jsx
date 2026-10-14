import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Github, Terminal, Sparkles, Battery, Wifi, Monitor } from 'lucide-react';
import { sound } from '../audio/soundEngine';
import { PROFILE, THEMES } from '../data/portfolioData';

export default function MenuBar({ activeWindow, currentTheme = 'midnight', onSelectTheme, openApp, onToggleMode }) {
  const [time, setTime] = useState('');
  const [isMuted, setIsMuted] = useState(sound.isMuted());
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) +
        '  ' +
        now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    return sound.subscribe((muted) => setIsMuted(muted));
  }, []);

  const handleMuteToggle = () => {
    sound.toggleMute();
  };

  return (
    <header className="h-8 w-full bg-[#0d0f18]/85 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-3 text-xs text-slate-300 z-50 select-none">
      {/* Left side: System & App Status */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => { sound.playOpen(); openApp('about'); }}
          className="flex items-center gap-1.5 font-bold text-white hover:text-cyan-400 transition-colors px-1.5 py-0.5 rounded hover:bg-white/5"
          title="Open About RahilOS"
        >
          <img 
            src={PROFILE.avatar} 
            alt={PROFILE.name} 
            className="w-4 h-4 rounded-full object-cover object-top ring-1 ring-cyan-400/60" 
          />
          <span className="tracking-wide">RahilOS</span>
          <span className="text-[10px] px-1 py-0.2 bg-cyan-500/20 text-cyan-400 rounded font-mono">v2.0</span>
        </button>

        <div className="h-3 w-[1px] bg-white/10 hidden sm:block"></div>

        <div className="hidden sm:flex items-center gap-2 text-slate-400">
          <span className="text-white font-medium">{PROFILE.name}</span>
          <span className="text-slate-500">/</span>
          <span className="text-cyan-400/90 font-mono text-[11px]">{PROFILE.title}</span>
        </div>

        {activeWindow && (
          <div className="hidden md:flex items-center gap-1.5 text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300 font-mono capitalize">{activeWindow}.app</span>
          </div>
        )}
      </div>

      {/* Right side: Controls, Visualizer, Clock, Links */}
      <div className="flex items-center gap-3">
        {/* Audio Equalizer & Mute Switch */}
        <div className="flex items-center gap-2 bg-white/5 px-2 py-0.5 rounded border border-white/5">
          {/* Animated Equalizer Waveform */}
          <div className="flex items-end gap-0.5 h-3 w-4">
            <span className={`w-0.5 bg-cyan-400 rounded-full transition-all duration-300 ${isMuted ? 'h-1 opacity-30' : 'h-3 animate-pulse'}`} />
            <span className={`w-0.5 bg-cyan-400 rounded-full transition-all duration-300 ${isMuted ? 'h-1 opacity-30' : 'h-2 animate-bounce'}`} />
            <span className={`w-0.5 bg-cyan-400 rounded-full transition-all duration-300 ${isMuted ? 'h-1 opacity-30' : 'h-3.5 animate-pulse'}`} />
          </div>

          <button
            onClick={handleMuteToggle}
            className="text-slate-300 hover:text-white transition-colors flex items-center gap-1"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX size={13} className="text-rose-400" /> : <Volume2 size={13} className="text-cyan-400" />}
            <span className="hidden lg:inline text-[10px] font-mono">{isMuted ? 'Muted' : 'SFX ON'}</span>
          </button>
        </div>

        {/* Theme Picker */}
        <div className="relative">
          <button
            onClick={() => { sound.playClick(); setShowThemeMenu(!showThemeMenu); }}
            className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-transparent hover:border-white/10"
            title="Switch Theme"
          >
            <Sparkles size={12} className="text-amber-400" />
            <span className="hidden md:inline font-mono text-[11px] capitalize">{currentTheme}</span>
          </button>

          {showThemeMenu && (
            <div className="absolute right-0 top-8 w-44 bg-[#141724] border border-white/10 rounded-lg shadow-xl p-1.5 z-50 backdrop-blur-xl">
              <div className="text-[10px] font-mono text-slate-400 px-2 py-1 uppercase tracking-wider">Aesthetic Theme</div>
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectTheme(theme.id);
                    setShowThemeMenu(false);
                  }}
                  className={`w-full text-left px-2 py-1.5 rounded flex items-center justify-between text-xs transition-colors ${
                    currentTheme === theme.id ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span>{theme.name}</span>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.accent }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Switch to Web Mode Button */}
        {onToggleMode && (
          <button
            onClick={() => { sound.playClick(); onToggleMode(); }}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 transition-all border border-cyan-500/40 font-mono text-[11px]"
            title="Switch back to Web Portfolio Mode"
          >
            <Monitor size={12} className="text-cyan-400" />
            <span className="hidden sm:inline">Web Mode</span>
          </button>
        )}

        {/* GitHub Shortcut */}
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playClick()}
          className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white transition-all border border-white/5 hover:border-white/20 font-mono text-[11px]"
          title="Visit GitHub: rahilmirza062-code"
        >
          <Github size={12} />
          <span className="hidden md:inline">{PROFILE.githubUsername || PROFILE.githubUser}</span>
        </a>

        {/* Live Clock */}
        <div className="font-mono text-[11px] text-slate-300 tracking-tight pl-1 font-medium">
          {time}
        </div>
      </div>
    </header>
  );
}
