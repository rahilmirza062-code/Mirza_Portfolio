import React from 'react';
import { GraduationCap, MapPin, Calendar, Hammer, Target, Compass, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { PROFILE, EDUCATION } from '../data/portfolioData';
import { sound } from '../audio/soundEngine';
import { useTheme } from '../context/ThemeContext';
import AnimateOnScroll, { StaggerContainer, StaggerItem } from './AnimateOnScroll';

export default function About() {
  const { isDark } = useTheme();

  const getDriveIcon = (iconName) => {
    switch (iconName) {
      case 'Hammer': return Hammer;
      case 'Target': return Target;
      case 'Compass': return Compass;
      case 'RefreshCw': return RefreshCw;
      default: return Sparkles;
    }
  };

  return (
    <section 
      id="about" 
      className={`py-24 relative border-t transition-colors duration-300 ${
        isDark ? 'border-white/5 bg-[#080a11]' : 'border-slate-200 bg-slate-50/70'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <AnimateOnScroll variant="fadeUp" className="space-y-2 mb-14 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-500 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>Profile & Mindset</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            The person behind the projects.
          </h2>
          <p className={`text-sm font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            "{PROFILE.supportingStatement}"
          </p>
        </AnimateOnScroll>

        {/* 2-Column Core Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Authentic Bio & Philosophy */}
          <AnimateOnScroll variant="fadeRight" delay={0.1} className="lg:col-span-7 space-y-6">
            <div className={`p-6 sm:p-8 rounded-2xl border space-y-5 shadow-xl transition-all ${
              isDark ? 'bg-[#0d111d] border-white/10' : 'bg-white border-slate-200 shadow-slate-900/5'
            }`}>
              <h3 className={`text-lg font-bold flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                <span className="text-cyan-500 font-mono text-base">&gt;</span>
                Engineering Journey in Progress
              </h3>

              <div className={`space-y-4 text-sm sm:text-base leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                <p>
                  I am a second-year undergraduate pursuing a <strong className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>B.Tech in Computer & Data Science</strong> at <strong className="text-cyan-600 dark:text-cyan-300 font-semibold">R. C. Patel Institute of Technology</strong>.
                </p>
                <p>
                  Rather than waiting for senior year to begin engineering, I dive head-first into software and web development through active building. My workflow integrates computer science foundations with independent documentation research, rapid experimentation, and AI-assisted developer workflows to prototype and refine practical solutions.
                </p>
                <p>
                  Whether addressing farmer grain procurement queues in <span className="text-emerald-600 dark:text-emerald-300 font-mono text-sm">Kisan Connect</span> or architecting transparent student housing discovery in <span className="text-sky-600 dark:text-sky-300 font-mono text-sm">Nivasa Hub</span>, my goal is straightforward: build software that solves real friction and continuously raises my engineering ceiling.
                </p>
              </div>

              {/* Core Tenets Checklist */}
              <div className={`pt-4 border-t grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono ${
                isDark ? 'border-white/10 text-slate-300' : 'border-slate-200 text-slate-600'
              }`}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-cyan-500 shrink-0" />
                  <span>Transparent, honest capabilities</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-cyan-500 shrink-0" />
                  <span>Hands-on project validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-cyan-500 shrink-0" />
                  <span>AI-augmented developer workflows</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-cyan-500 shrink-0" />
                  <span>Eager to collaborate & grow</span>
                </div>
              </div>
            </div>

            {/* Small Anime Identity Banner Strip */}
            <div className={`p-4 rounded-xl border flex items-center justify-between ${
              isDark 
                ? 'bg-gradient-to-r from-cyan-950/40 via-[#0e1424] to-emerald-950/40 border-cyan-500/20' 
                : 'bg-gradient-to-r from-cyan-50 via-sky-50 to-emerald-50 border-cyan-300'
            }`}>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className={`text-xs font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Campus Chronicle • B.Tech Computer & Data Science
                </span>
              </div>
              <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${
                isDark 
                  ? 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' 
                  : 'text-cyan-700 bg-cyan-100 border-cyan-300'
              }`}>
                Class of 2029
              </span>
            </div>
          </AnimateOnScroll>

          {/* Right Column: Academic Credential Card */}
          <AnimateOnScroll variant="fadeLeft" delay={0.2} className="lg:col-span-5 space-y-6">
            <div className={`p-6 sm:p-7 rounded-2xl border shadow-xl relative overflow-hidden ${
              isDark 
                ? 'bg-[#0c101d] border-cyan-500/30' 
                : 'bg-white border-slate-200 shadow-slate-900/5'
            }`}>
              {/* Subtle accent glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className={`flex items-start justify-between pb-4 border-b ${
                isDark ? 'border-white/10' : 'border-slate-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border ${
                    isDark ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-cyan-50 text-cyan-700 border-cyan-200'
                  }`}>
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Education</span>
                    <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Undergraduate Degree</h4>
                  </div>
                </div>
                <span className={`text-xs font-mono px-2.5 py-1 rounded-full border ${
                  isDark 
                    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' 
                    : 'text-emerald-700 bg-emerald-50 border-emerald-300'
                }`}>
                  2025 – 2029
                </span>
              </div>

              <div className="pt-4 space-y-3">
                <div>
                  <h5 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {EDUCATION.institution}
                  </h5>
                  <p className={`text-xs font-mono flex items-center gap-1.5 mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    <MapPin size={13} className="text-cyan-500" />
                    {EDUCATION.location}
                  </p>
                </div>

                <div className={`p-3 rounded-xl border space-y-1 ${
                  isDark ? 'bg-white/[0.03] border-white/5' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Degree & Specialization:</div>
                  <div className="text-sm font-semibold text-cyan-600 dark:text-cyan-300">
                    {EDUCATION.degree}
                  </div>
                  <div className={`text-xs font-mono flex items-center gap-2 pt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    <Calendar size={12} className="text-cyan-500" />
                    <span>Expected Graduation: <strong className={isDark ? 'text-white' : 'text-slate-900'}>{EDUCATION.expectedGraduation}</strong></span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className={`text-[11px] font-mono uppercase tracking-wider block mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Foundational Curriculum:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {EDUCATION.coursework.map((course) => (
                      <span
                        key={course}
                        className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                          isDark 
                            ? 'bg-white/5 text-slate-300 border-white/5' 
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* "What Drives Me" Section */}
        <div className={`mt-16 pt-12 border-t ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
          <AnimateOnScroll variant="fadeUp" className="mb-8">
            <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">Internal Philosophy</span>
            <h3 className={`text-2xl font-bold tracking-tight mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              What drives me
            </h3>
          </AnimateOnScroll>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROFILE.whatDrivesMe.map((item, index) => {
              const IconComponent = getDriveIcon(item.icon);
              return (
                <StaggerItem key={item.title}>
                  <div
                    onMouseEnter={() => sound.playHover()}
                    className={`p-5 rounded-xl border transition-all group duration-200 h-full ${
                      isDark
                        ? 'bg-[#0c101c] border-white/10 hover:border-cyan-500/40 hover:bg-[#111728]'
                        : 'bg-white border-slate-200 hover:border-cyan-400 hover:bg-slate-50 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg border group-hover:scale-110 transition-transform ${
                        isDark ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-cyan-50 text-cyan-600 border-cyan-200'
                      }`}>
                        <IconComponent size={18} />
                      </div>
                      <span className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>0{index + 1}</span>
                    </div>
                    <h4 className={`text-sm font-bold mb-1.5 transition-colors ${
                      isDark ? 'text-white group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-cyan-600'
                    }`}>
                      {item.title}
                    </h4>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {item.desc}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
