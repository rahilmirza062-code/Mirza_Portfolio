import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Github, ArrowUpRight, Sparkles, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../audio/soundEngine';
import { PROFILE } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onToggleMode, viewMode = 'web' } = {}) {
  const [isMuted, setIsMuted] = useState(sound.isMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const unsubscribe = sound.subscribe((muted) => setIsMuted(muted));
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSoundToggle = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Terminal', href: '#terminal' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    sound.playClick();
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isDark
            ? 'bg-[#080a10]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40 py-2.5'
            : 'bg-white/85 backdrop-blur-md border-b border-slate-200 shadow-lg shadow-slate-900/10 py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={() => sound.playClick()}
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
        >
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-sm tracking-wider transition-colors ${
            isDark
              ? 'bg-gradient-to-tr from-cyan-500/20 via-sky-500/10 to-transparent border border-cyan-500/30 text-cyan-400 group-hover:border-cyan-400'
              : 'bg-gradient-to-tr from-cyan-500/30 via-sky-500/20 to-transparent border border-cyan-600/30 text-cyan-600 group-hover:border-cyan-500'
          }`}>
            RM
          </div>
          <div className="flex flex-col">
            <span className={`font-bold text-sm tracking-tight transition-colors ${
              isDark ? 'text-white group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-cyan-600'
            }`}>
              {PROFILE.name}
            </span>
            <span className={`text-[10px] font-mono flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              CDS • 2029
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className={`hidden md:flex items-center gap-1 backdrop-blur-md rounded-full px-4 py-1.5 shadow-inner ${
          isDark
            ? 'bg-[#0e121d]/70 border border-white/10'
            : 'bg-slate-100/80 border border-slate-200/80'
        }`}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleLinkClick}
              onMouseEnter={() => sound.playHover()}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                isDark
                  ? 'text-slate-300 hover:text-white hover:bg-white/5'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Controls: Mode Switcher + Theme Toggle + Sound Icon + GitHub */}
        <div className="hidden sm:flex items-center gap-2">
          {onToggleMode && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { sound.playSuccess(); onToggleMode(); }}
              onMouseEnter={() => sound.playHover()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono shadow-sm transition-all ${
                isDark
                  ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 hover:from-purple-500/30 hover:to-cyan-500/30 text-cyan-300 border border-cyan-500/40'
                  : 'bg-gradient-to-r from-purple-500/15 to-cyan-500/15 hover:from-purple-500/25 hover:to-cyan-500/25 text-cyan-700 border border-cyan-500/40'
              }`}
              title="Switch between Modern Web and Retro OS Desktop"
            >
              <Sparkles size={13} className={isDark ? 'text-cyan-400' : 'text-cyan-600'} />
              <span className="hidden lg:inline">{viewMode === 'os' ? 'Web Mode' : 'Desktop OS'}</span>
            </motion.button>
          )}

          {/* Theme Toggle Button — Sun/Moon */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { sound.playClick(); toggleTheme(); }}
            onMouseEnter={() => sound.playHover()}
            className={`p-2 rounded-full transition-all ${
              isDark
                ? 'bg-white/5 hover:bg-amber-500/15 text-slate-300 hover:text-amber-300 border border-white/10 hover:border-amber-500/40'
                : 'bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-600 border border-slate-200 hover:border-indigo-400/40'
            }`}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun size={15} />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon size={15} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Sound Toggle — Clean small icon button only, NO pill/text */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSoundToggle}
            onMouseEnter={() => sound.playHover()}
            className={`p-2 rounded-full transition-all ${
              !isMuted
                ? isDark
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                  : 'bg-cyan-100 text-cyan-700 border border-cyan-400/50 shadow-sm shadow-cyan-500/10'
                : isDark
                  ? 'bg-white/5 text-slate-400 border border-white/10 hover:text-white hover:bg-white/10'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 hover:text-slate-600 hover:bg-slate-200'
            }`}
            title={!isMuted ? 'Mute sound effects' : 'Enable subtle UI sound effects'}
            aria-label={!isMuted ? 'Sound is on. Click to mute.' : 'Sound is muted. Click to enable sound.'}
          >
            {!isMuted ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </motion.button>

          {/* GitHub Icon Link */}
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            onMouseEnter={() => sound.playHover()}
            className={`p-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
              isDark
                ? 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
            title="GitHub Profile (@rahilmirza062-code)"
            aria-label="GitHub Profile"
          >
            <Github size={15} />
          </motion.a>
        </div>

        {/* Mobile: Theme + Sound + Hamburger */}
        <div className="flex sm:hidden items-center gap-1.5">
          {/* Mobile Theme Toggle */}
          <button
            onClick={() => { sound.playClick(); toggleTheme(); }}
            className={`p-2 rounded-lg border text-xs ${
              isDark
                ? 'bg-white/5 text-amber-300 border-white/10'
                : 'bg-slate-100 text-indigo-600 border-slate-200'
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Mobile Sound Toggle — Just icon */}
          <button
            onClick={handleSoundToggle}
            className={`p-2 rounded-lg border text-xs ${
              !isMuted
                ? isDark
                  ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
                  : 'bg-cyan-100 text-cyan-700 border-cyan-400/50'
                : isDark
                  ? 'bg-white/5 text-slate-400 border-white/10'
                  : 'bg-slate-100 text-slate-400 border-slate-200'
            }`}
            aria-label="Toggle Sound"
          >
            {!isMuted ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className={`p-2 rounded-lg border focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
              isDark
                ? 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/10'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`sm:hidden backdrop-blur-xl border-b px-6 py-5 space-y-3 ${
              isDark
                ? 'bg-[#0c0f18]/95 border-white/10'
                : 'bg-white/95 border-slate-200'
            }`}
          >
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isDark
                      ? 'text-slate-200 hover:text-cyan-300 hover:bg-white/5'
                      : 'text-slate-700 hover:text-cyan-600 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {onToggleMode && (
              <button
                onClick={() => {
                  sound.playSuccess();
                  onToggleMode();
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-mono transition-colors ${
                  isDark
                    ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-gradient-to-r from-purple-500/10 to-cyan-500/10 text-cyan-700 border border-cyan-500/40'
                }`}
              >
                <Sparkles size={13} className={isDark ? 'text-cyan-400' : 'text-cyan-600'} />
                <span>{viewMode === 'os' ? 'Switch to Web Portfolio' : 'Switch to Desktop OS Mode'}</span>
              </button>
            )}

            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className={`flex items-center justify-center gap-2 w-full py-2.5 mt-2 rounded-lg text-xs font-mono border transition-colors ${
                isDark
                  ? 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/10'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <Github size={14} />
              <span>github.com/rahilmirza062-code</span>
              <ArrowUpRight size={12} className={isDark ? 'text-slate-400' : 'text-slate-500'} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
