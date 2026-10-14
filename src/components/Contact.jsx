import React, { useState } from 'react';
import { Mail, Github, Copy, Check, ExternalLink, MapPin } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { sound } from '../audio/soundEngine';
import { useTheme } from '../context/ThemeContext';
import AnimateOnScroll from './AnimateOnScroll';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const { isDark } = useTheme();

  const handleCopyEmail = () => {
    sound.playSuccess();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(PROFILE.email);
    }
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <section 
      id="contact" 
      className={`py-24 relative border-t transition-colors duration-300 ${
        isDark ? 'border-white/5 bg-[#080911]' : 'border-slate-200 bg-slate-50/70'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-12">
        {/* Section Headline */}
        <AnimateOnScroll variant="fadeUp" className="space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>Collaboration & Inquiries</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Have an idea?{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
              Let's build something useful.
            </span>
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            I am actively exploring summer internships, software engineering apprenticeships, hackathon teams, and collaborative web projects. Let's connect.
          </p>
        </AnimateOnScroll>

        {/* Central Contact Card */}
        <AnimateOnScroll variant="scaleUp" delay={0.1}>
          <div className={`p-8 sm:p-10 rounded-3xl border shadow-2xl space-y-8 relative overflow-hidden ${
            isDark ? 'bg-[#0c101c] border-cyan-500/30' : 'bg-white border-slate-200 shadow-slate-900/5'
          }`}>
            {/* Subtle Ambient Radial Lighting */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Email Callout Box */}
            <div className="space-y-3">
              <span className={`text-xs font-mono uppercase tracking-wider block ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Direct Primary Channel
              </span>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`mailto:${PROFILE.email}`}
                  onClick={() => sound.playClick()}
                  className={`px-6 py-3.5 rounded-2xl font-mono text-sm sm:text-base border transition-all flex items-center gap-2.5 group ${
                    isDark
                      ? 'bg-white/[0.04] hover:bg-white/[0.08] text-white border-white/10 hover:border-cyan-500/40'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-900 border-slate-200 hover:border-cyan-400'
                  }`}
                >
                  <Mail size={16} className="text-cyan-500 group-hover:scale-110 transition-transform" />
                  <span>{PROFILE.email}</span>
                </a>

                {/* Functional Copy Email Button */}
                <button
                  onClick={handleCopyEmail}
                  className={`px-5 py-3.5 rounded-2xl font-mono text-xs sm:text-sm font-semibold border transition-all flex items-center gap-2 shadow-lg ${
                    copied
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-emerald-500/30'
                      : isDark
                        ? 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border-cyan-500/40 shadow-cyan-500/20'
                        : 'bg-cyan-600 hover:bg-cyan-500 text-white border-cyan-600 shadow-cyan-600/20'
                  }`}
                  title="Copy email address to clipboard"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check size={16} className="text-slate-950 stroke-[2.5]" />
                      <span>Email Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={15} />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* GitHub & Campus Dossier Grid */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t text-left ${
              isDark ? 'border-white/10' : 'border-slate-200'
            }`}>
              {/* GitHub Card */}
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className={`p-4 rounded-xl border transition-all flex items-center justify-between group ${
                  isDark
                    ? 'bg-white/[0.02] hover:bg-white/[0.05] border-white/5 hover:border-cyan-500/30'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-cyan-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg transition-colors ${
                    isDark ? 'bg-white/5 text-slate-200 group-hover:text-cyan-300' : 'bg-white text-slate-700 group-hover:text-cyan-600 border border-slate-200'
                  }`}>
                    <Github size={18} />
                  </div>
                  <div>
                    <div className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Open Source</div>
                    <div className={`text-sm font-bold transition-colors ${
                      isDark ? 'text-white group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-cyan-600'
                    }`}>
                      github.com/{PROFILE.githubUsername}
                    </div>
                  </div>
                </div>
                <ExternalLink size={14} className={isDark ? 'text-slate-500 group-hover:text-cyan-300' : 'text-slate-400 group-hover:text-cyan-600'} />
              </a>

              {/* Academic Base Card */}
              <div className={`p-4 rounded-xl border flex items-center gap-3 ${
                isDark ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className={`p-2.5 rounded-lg ${
                  isDark ? 'bg-white/5 text-cyan-400' : 'bg-white text-cyan-600 border border-slate-200'
                }`}>
                  <MapPin size={18} />
                </div>
                <div>
                  <div className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Academic Base</div>
                  <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    R. C. Patel Institute of Technology
                  </div>
                  <div className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Shirpur, Maharashtra • CDS 2029
                  </div>
                </div>
              </div>
            </div>

            {/* Sincere Collaboration Pitch */}
            <div className={`p-4 rounded-xl border text-xs font-mono ${
              isDark 
                ? 'bg-gradient-to-r from-cyan-950/30 via-slate-900 to-emerald-950/30 border-white/10 text-slate-300' 
                : 'bg-gradient-to-r from-cyan-50 via-slate-50 to-emerald-50 border-slate-200 text-slate-700'
            }`}>
              <span className="text-cyan-600 dark:text-cyan-300 font-bold">Looking for: </span>
              <span>Internship opportunities, project feedback, and mentorship from senior developers.</span>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
