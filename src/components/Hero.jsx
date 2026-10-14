import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ExternalLink, Github, Code2, Sparkles, ChevronRight, Terminal, BookOpen, Layers } from 'lucide-react';
import { sound } from '../audio/soundEngine';
import { PROFILE } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import AnimatedShape from './AnimatedShape';

export default function Hero() {
  const { isDark } = useTheme();

  const handleScrollTo = (id) => {
    sound.playClick();
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 md:py-32 flex items-center justify-center overflow-hidden"
    >
      {/* Background Atmosphere & Decorative Grids */}
      <div className="absolute inset-0 anime-grid-bg opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Optional ambient 3D shape preview in background (subtle, non-intrusive) */}
      <div className="absolute top-20 right-10 lg:right-32 opacity-25 dark:opacity-30 pointer-events-none hidden md:block">
        <AnimatedShape variant="orb" size={130} />
      </div>

      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Storytelling & CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Academic Track Identifier */}
            <motion.div 
              whileHover={{ scale: 1.04 }}
              onMouseEnter={() => sound.playHover()}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider cursor-default shadow-sm ${
                isDark
                  ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 shadow-cyan-500/10'
                  : 'bg-cyan-50 border border-cyan-300 text-cyan-700 shadow-cyan-500/5'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>{PROFILE.tagline}</span>
              <span className="text-cyan-500/60">•</span>
              <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>CLASS OF 2029</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Building ideas into{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                  digital experiences.
                </span>
              </h1>
              
              {/* Supporting Creative Thesis */}
              <div className="flex items-center gap-2 pt-1">
                <span className="h-px w-8 bg-cyan-500/40"></span>
                <p className={`text-xs sm:text-sm font-mono tracking-wide uppercase ${
                  isDark ? 'text-cyan-400/90' : 'text-cyan-600'
                }`}>
                  "{PROFILE.coreTheme}"
                </p>
              </div>
            </div>

            {/* Supporting Paragraph */}
            <p className={`text-base sm:text-lg leading-relaxed max-w-xl ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {PROFILE.heroSupport}
            </p>

            {/* Sub-statement Quote */}
            <div className={`p-3.5 rounded-xl border max-w-lg flex items-center gap-3 ${
              isDark 
                ? 'bg-white/[0.03] border-white/10' 
                : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="w-1.5 h-10 rounded-full bg-gradient-to-b from-cyan-400 to-emerald-400 shrink-0" />
              <div className="text-xs font-mono">
                <span className="text-emerald-500 dark:text-emerald-400 font-bold block">{PROFILE.supportingStatement}</span>
                <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>R. C. Patel Institute of Technology, Shirpur</span>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => sound.playHover()}
                onClick={() => handleScrollTo('#projects')}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <span>Explore My Work</span>
                <ChevronRight size={16} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => sound.playHover()}
                onClick={() => handleScrollTo('#about')}
                className={`px-5 py-3 rounded-xl font-semibold text-sm border transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border-white/10'
                    : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200 shadow-sm'
                }`}
              >
                <span>About Me</span>
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => sound.playHover()}
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className={`px-4 py-3 rounded-xl text-sm border transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/10'
                    : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-200 shadow-sm'
                }`}
                title="GitHub Profile (@rahilmirza062-code)"
              >
                <Github size={16} />
                <span className="font-mono text-xs hidden sm:inline">GitHub</span>
                <ExternalLink size={13} className={isDark ? 'text-slate-400' : 'text-slate-500'} />
              </motion.a>
            </div>

            {/* Micro Tech Tags Bar */}
            <div className={`pt-4 flex flex-wrap items-center gap-2 text-xs font-mono ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              <span className={`text-[11px] uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Stack:</span>
              {['HTML/CSS', 'JavaScript', 'React', 'Tailwind', 'C / Java', 'MySQL'].map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.08, y: -1 }}
                  onMouseEnter={() => sound.playHover()}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-colors cursor-default border ${
                    isDark
                      ? 'bg-[#111522] border-white/5 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-cyan-400 hover:text-cyan-600 shadow-sm'
                  }`}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Asset (Campus Corridor Anime Illustration) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            whileHover={{ y: -6 }}
            onMouseEnter={() => sound.playHover()}
            className="lg:col-span-5 flex justify-center relative cursor-pointer"
          >
            {/* Outer Decorative Tech Frame */}
            <div className="relative w-full max-w-sm sm:max-w-md group">
              {/* Soft Atmospheric Glow Behind Illustration */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/25 via-sky-500/15 to-emerald-500/25 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity" />

              {/* Surrounding Tech Crosshairs & Framing Lines */}
              <div className={`absolute -top-3 -left-3 font-mono text-xs select-none ${isDark ? 'text-cyan-400/60' : 'text-cyan-600/70'}`}>┌ [01]</div>
              <div className={`absolute -top-3 -right-3 font-mono text-xs select-none ${isDark ? 'text-cyan-400/60' : 'text-cyan-600/70'}`}>[ID: RM] ┐</div>
              <div className={`absolute -bottom-3 -left-3 font-mono text-xs select-none ${isDark ? 'text-cyan-400/60' : 'text-cyan-600/70'}`}>└ STATUS</div>
              <div className={`absolute -bottom-3 -right-3 font-mono text-xs select-none ${isDark ? 'text-cyan-400/60' : 'text-cyan-600/70'}`}>2029 ┘</div>

              {/* Main Image Framing Card */}
              <div className={`relative rounded-2xl overflow-hidden border shadow-2xl ${
                isDark
                  ? 'bg-[#0c101d] border-white/15 shadow-black/80'
                  : 'bg-white border-slate-200 shadow-slate-900/15'
              }`}>
                {/* Top Frame Header */}
                <div className={`px-3.5 py-2 border-b flex items-center justify-between text-[11px] font-mono ${
                  isDark
                    ? 'bg-[#090c16]/90 border-white/10 text-slate-400'
                    : 'bg-slate-100 border-slate-200 text-slate-600'
                }`}>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500/80"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-500/80"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80"></span>
                    <span className={`ml-1.5 font-semibold tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>RAHIL_MIRZA.JPG</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${
                    isDark
                      ? 'text-cyan-400 bg-cyan-950/60 border-cyan-500/30'
                      : 'text-cyan-700 bg-cyan-100 border-cyan-300'
                  }`}>
                    CAMPUS_CHRONICLE
                  </span>
                </div>

                {/* The Illustration Container (Untouched anime portrait) */}
                <div className="relative w-full aspect-[9/15] sm:aspect-[9/14] bg-[#070913] flex items-center justify-center overflow-hidden">
                  <img
                    src={PROFILE.campusImage}
                    alt="Rahil Mirza - Anime-style illustration walking through college campus corridor"
                    className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03] transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="eager"
                  />

                  {/* Soft Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080a10] via-transparent to-transparent opacity-80 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#080a10]/40 via-transparent to-transparent opacity-60 pointer-events-none" />

                  {/* Floating Academic Badge */}
                  <div className="absolute top-4 right-4 bg-[#0a0f1c]/90 backdrop-blur-md border border-cyan-500/30 px-3 py-1 rounded-full shadow-lg pointer-events-none">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-cyan-300">
                      <Sparkles size={11} className="text-cyan-400" />
                      <span>B.TECH • 2029</span>
                    </div>
                  </div>

                  {/* Floating Technology Tag */}
                  <div className="absolute bottom-24 -left-1 hidden sm:flex items-center gap-1.5 bg-[#0a0f1c]/90 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-r-lg shadow-lg">
                    <Code2 size={12} className="text-emerald-400" />
                    <span className="text-[10px] font-mono text-slate-200">CDS Undergraduate</span>
                  </div>

                  {/* Bottom Status Card */}
                  <div className="absolute bottom-4 inset-x-4">
                    <div className="p-3 rounded-xl bg-[#090d19]/90 backdrop-blur-md border border-white/15 shadow-xl flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400 animate-pulse" />
                        <div>
                          <div className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">Current State</div>
                          <div className="text-xs font-mono font-bold text-emerald-300 tracking-wide">
                            STATUS: {PROFILE.status}
                          </div>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono text-slate-400 bg-white/5 px-2 py-1 rounded border border-white/5">
                        RCPIT
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subtle Image Footer Label */}
                <div className={`px-3 py-2 border-t flex items-center justify-between text-[10px] font-mono ${
                  isDark
                    ? 'bg-[#080b15] border-white/5 text-slate-400'
                    : 'bg-slate-100 border-slate-200 text-slate-600'
                }`}>
                  <span>R. C. Patel Institute of Technology</span>
                  <span className={isDark ? 'text-cyan-400' : 'text-cyan-600'}>Class of 2029</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Subtle Scroll Indicator */}
        <div className="pt-16 sm:pt-20 flex flex-col items-center justify-center text-center">
          <button
            onClick={() => handleScrollTo('#about')}
            className={`flex flex-col items-center gap-1.5 transition-colors group focus:outline-none ${
              isDark ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-500 hover:text-cyan-600'
            }`}
            aria-label="Scroll down to About section"
          >
            <span className="text-[11px] font-mono tracking-widest uppercase transition-colors">
              Scroll To Discover
            </span>
            <ArrowDown size={14} className="animate-bounce text-cyan-400 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
