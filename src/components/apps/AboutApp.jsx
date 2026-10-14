import React, { useState } from 'react';
import { User, Sparkles, MapPin, Mail, Github, Check, Copy, Code2, Palette, Layout, Award, Terminal } from 'lucide-react';
import { PROFILE, SKILLS_MATRIX } from '../../data/portfolioData';
import { sound } from '../../audio/soundEngine';

export default function AboutApp({ openApp }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    sound.playSuccess();
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Code2': return Code2;
      case 'Palette': return Palette;
      case 'Sparkles': return Sparkles;
      case 'Layout': return Layout;
      default: return Award;
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-4xl mx-auto select-text">
      {/* Profile Header Dossier */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-6 border-b border-white/10">
        {/* Creative Avatar / Photo with Glowing Gradient Border */}
        <div className="relative group shrink-0">
          <div className="w-28 h-36 md:w-32 md:h-40 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-[2px] shadow-2xl shadow-cyan-500/25 group-hover:shadow-cyan-400/40 transition-all duration-300">
            <div className="w-full h-full bg-[#0d101a] rounded-2xl overflow-hidden relative">
              <img
                src={PROFILE.avatar}
                alt={PROFILE.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-1.5 inset-x-0 text-center">
                <span className="text-[9px] font-mono uppercase tracking-widest text-cyan-300 bg-black/60 px-2 py-0.5 rounded-full border border-cyan-500/30">
                  Mirza Rahil
                </span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 border-2 border-[#0c0e17] w-6 h-6 rounded-full flex items-center justify-center text-black shadow-lg" title="Online & Available">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          </div>
        </div>

        {/* Bio & Details */}
        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {PROFILE.name}
              </h1>
              <p className="text-cyan-400 font-mono text-sm">
                {PROFILE.title} <span className="text-slate-500">•</span> {PROFILE.subTitle}
              </p>
            </div>

            <div className="flex items-center justify-center md:justify-end gap-2">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-200 transition-all hover:border-white/20"
                title="Copy Email Address"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copied ? 'Email Copied!' : 'Copy Email'}</span>
              </button>

              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs font-mono transition-all shadow-md shadow-cyan-500/20"
              >
                <Github size={13} />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed pt-1">
            {PROFILE.bio}
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="flex items-center gap-1">
              <MapPin size={12} className="text-cyan-400" /> {PROFILE.location}
            </span>
            <span className="flex items-center gap-1">
              <Mail size={12} className="text-cyan-400" /> {PROFILE.email}
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              ● {PROFILE.status}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {PROFILE.stats.map((stat, i) => (
          <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-center">
            <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono mb-1">
              {stat.value}
            </div>
            <div className="text-xs text-slate-400 font-mono">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Philosophy Callout */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-cyan-950/30 via-slate-900/40 to-blue-950/30 border border-cyan-500/20 relative overflow-hidden">
        <div className="relative z-10 flex items-start gap-3">
          <Sparkles className="text-cyan-400 shrink-0 mt-0.5" size={18} />
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-1">
              The Creative Manifesto
            </div>
            <blockquote className="text-sm italic text-slate-200 leading-relaxed font-serif">
              "{PROFILE.quote}"
            </blockquote>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Every pixel should have intentional physics. I build websites where fluid typography, 
              interactive micro-feedback, and low-latency rendering come together to create an unforgettable brand signature.
            </p>
          </div>
        </div>
      </div>

      {/* Skills Matrix */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
            <Award size={16} className="text-cyan-400" /> Technical & Design Weaponry
          </h2>
          <span className="text-[10px] font-mono text-slate-400">Battle-tested on production apps</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SKILLS_MATRIX.map((group, idx) => {
            const Icon = getCategoryIcon(group.icon);
            return (
              <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-semibold">
                  <Icon size={14} className="text-cyan-400" />
                  <span>{group.category}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Launch Actions */}
      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <span className="text-slate-400">Want to explore the terminal or micro-interactions?</span>
        <div className="flex gap-2">
          {openApp && (
            <>
              <button
                onClick={() => { sound.playClick(); openApp('terminal'); }}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 flex items-center gap-1.5 transition-colors"
              >
                <Terminal size={13} className="text-cyan-400" /> Open Terminal.sh
              </button>
              <button
                onClick={() => { sound.playClick(); openApp('projects'); }}
                className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 transition-colors"
              >
                <Award size={13} className="text-cyan-400" /> View 4 Projects
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
