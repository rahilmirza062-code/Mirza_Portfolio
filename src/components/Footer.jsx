import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { sound } from '../audio/soundEngine';
import { useTheme } from '../context/ThemeContext';
import AnimateOnScroll from './AnimateOnScroll';

export default function Footer() {
  const { isDark } = useTheme();

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className={`py-12 border-t text-xs font-mono transition-colors duration-300 ${
        isDark 
          ? 'border-white/10 bg-[#06080d] text-slate-400' 
          : 'border-slate-200 bg-white text-slate-600'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <AnimateOnScroll variant="fadeUp" className={`flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b ${
          isDark ? 'border-white/5' : 'border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center font-bold ${
              isDark ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-cyan-50 border-cyan-300 text-cyan-700'
            }`}>
              RM
            </div>
            <div>
              <div className={`font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{PROFILE.name}</div>
              <div className={`text-[11px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>R. C. Patel Institute of Technology • Class of 2029</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <a href="#home" onClick={() => sound.playClick()} className="hover:text-cyan-500 transition-colors">Home</a>
            <a href="#about" onClick={() => sound.playClick()} className="hover:text-cyan-500 transition-colors">About</a>
            <a href="#skills" onClick={() => sound.playClick()} className="hover:text-cyan-500 transition-colors">Skills</a>
            <a href="#projects" onClick={() => sound.playClick()} className="hover:text-cyan-500 transition-colors">Projects</a>
            <a href="#terminal" onClick={() => sound.playClick()} className="hover:text-cyan-500 transition-colors">Terminal</a>
            <a href="#contact" onClick={() => sound.playClick()} className="hover:text-cyan-500 transition-colors">Contact</a>
          </div>

          <button
            onClick={scrollToTop}
            className={`p-2.5 rounded-xl border transition-colors flex items-center gap-1.5 ${
              isDark 
                ? 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/10' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border-slate-200'
            }`}
            title="Back to Top"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp size={14} />
          </button>
        </AnimateOnScroll>

        <AnimateOnScroll variant="fadeIn" delay={0.1} className={`flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] ${
          isDark ? 'text-slate-500' : 'text-slate-400'
        }`}>
          <div>
            &copy; {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>"{PROFILE.coreTheme}"</span>
          </div>
        </AnimateOnScroll>
      </div>
    </footer>
  );
}
