import React, { useState } from 'react';
import { Code, Terminal, Database, Wrench, Sparkles, Layers } from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';
import { sound } from '../audio/soundEngine';
import { useTheme } from '../context/ThemeContext';
import AnimateOnScroll, { StaggerContainer, StaggerItem } from './AnimateOnScroll';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { isDark } = useTheme();

  const categories = ['All', 'Frontend', 'Programming', 'Tools & Platforms', 'Database', 'Development Approach'];

  const filteredCategories = activeCategory === 'All'
    ? SKILLS_DATA
    : SKILLS_DATA.filter(c => c.category === activeCategory);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Frontend': return Code;
      case 'Programming': return Terminal;
      case 'Database': return Database;
      case 'Tools & Platforms': return Wrench;
      case 'Development Approach': return Sparkles;
      default: return Layers;
    }
  };

  return (
    <section 
      id="skills" 
      className={`py-24 relative border-t transition-colors duration-300 ${
        isDark ? 'border-white/5 bg-[#08090f]' : 'border-slate-200 bg-slate-100/60'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <AnimateOnScroll variant="fadeUp" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>Capabilities Matrix</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Skills & technical foundations.
            </h2>
            <p className={`text-xs sm:text-sm font-mono max-w-xl ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Transparent assessment: distinguishing actively used technologies in projects from emerging areas of study. No arbitrary percentage bars.
            </p>
          </div>

          {/* Legend Badges */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${
              isDark 
                ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300' 
                : 'bg-cyan-50 border-cyan-300 text-cyan-700'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              Used in Projects
            </span>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${
              isDark 
                ? 'bg-purple-500/15 border-purple-500/30 text-purple-300' 
                : 'bg-purple-50 border-purple-300 text-purple-700'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              Currently Learning
            </span>
          </div>
        </AnimateOnScroll>

        {/* Category Filter Pills */}
        <AnimateOnScroll variant="fadeIn" delay={0.1} className={`flex flex-wrap gap-2 mb-10 pb-4 border-b ${
          isDark ? 'border-white/5' : 'border-slate-200'
        }`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setActiveCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeCategory === cat
                  ? isDark
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-semibold shadow-sm shadow-cyan-500/20'
                    : 'bg-cyan-600 text-white border border-cyan-600 font-semibold shadow-sm shadow-cyan-600/20'
                  : isDark
                    ? 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-transparent'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </AnimateOnScroll>

        {/* Categorized Skills Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((group) => {
            const IconComponent = getCategoryIcon(group.category);
            return (
              <StaggerItem key={group.category}>
                <div className={`p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-5 h-full ${
                  isDark
                    ? 'bg-[#0d101c] border-white/10 hover:border-cyan-500/30'
                    : 'bg-white border-slate-200 hover:border-cyan-400 shadow-sm'
                }`}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-lg border ${
                          isDark ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-cyan-50 text-cyan-600 border-cyan-200'
                        }`}>
                          <IconComponent size={17} />
                        </div>
                        <h3 className={`font-bold text-base tracking-tight ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          {group.category}
                        </h3>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        isDark ? 'text-slate-400 bg-white/5 border-white/5' : 'text-slate-500 bg-slate-100 border-slate-200'
                      }`}>
                        {group.skills.length} items
                      </span>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {group.desc}
                    </p>
                  </div>

                  {/* Skill Badges List */}
                  <div className="space-y-2">
                    {group.skills.map((skill) => {
                      const isLearning = skill.status === 'learning';
                      return (
                        <div
                          key={skill.name}
                          onMouseEnter={() => sound.playHover()}
                          className={`p-2.5 rounded-xl border transition-all flex items-center justify-between text-xs ${
                            isLearning
                              ? isDark
                                ? 'bg-purple-950/20 border-purple-500/20 hover:border-purple-400/40 text-purple-200'
                                : 'bg-purple-50 border-purple-200 hover:border-purple-300 text-purple-800'
                              : isDark
                                ? 'bg-white/[0.02] border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.04] text-slate-200'
                                : 'bg-slate-50 border-slate-200 hover:border-cyan-400 hover:bg-white text-slate-800'
                          }`}
                        >
                          <div className="flex items-center gap-2 font-medium">
                            <span className={`w-1.5 h-1.5 rounded-full ${isLearning ? 'bg-purple-400' : 'bg-cyan-400'}`} />
                            <span>{skill.name}</span>
                          </div>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                              isLearning
                                ? isDark
                                  ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                                  : 'bg-purple-100 text-purple-700 border-purple-200'
                                : isDark
                                  ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                                  : 'bg-cyan-50 text-cyan-700 border-cyan-200'
                            }`}
                          >
                            {skill.level}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
