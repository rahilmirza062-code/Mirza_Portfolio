import React, { useState } from 'react';
import { ExternalLink, Github, CheckCircle2, Clock, Sprout, Home, Cpu, Ticket, ShieldCheck, MapPin } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { sound } from '../audio/soundEngine';
import { useTheme } from '../context/ThemeContext';
import AnimateOnScroll from './AnimateOnScroll';

export default function Projects() {
  const { isDark } = useTheme();

  // Interactive states for project previews
  const [simulatedToken, setSimulatedToken] = useState('KC-408');
  const [tokenCounter, setTokenCounter] = useState(408);
  const [selectedAmenity, setSelectedAmenity] = useState('wifi');
  const [neuralQuery] = useState('DSA Unit 3 Quiz');

  const generateNewToken = () => {
    sound.playClick();
    const nextNum = tokenCounter + 1;
    setTokenCounter(nextNum);
    setSimulatedToken(`KC-${nextNum}`);
  };

  const getStatusBadge = (statusType, statusText) => {
    switch (statusType) {
      case 'live':
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono border ${
            isDark 
              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' 
              : 'bg-emerald-50 text-emerald-700 border-emerald-300'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            {statusText}
          </span>
        );
      case 'progress':
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono border ${
            isDark 
              ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30' 
              : 'bg-cyan-50 text-cyan-700 border-cyan-300'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            {statusText}
          </span>
        );
      case 'concept':
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono border ${
            isDark 
              ? 'bg-purple-500/15 text-purple-300 border-purple-500/30' 
              : 'bg-purple-50 text-purple-700 border-purple-300'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
            {statusText}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section 
      id="projects" 
      className={`py-24 relative border-t transition-colors duration-300 ${
        isDark ? 'border-white/5 bg-[#090b12]' : 'border-slate-200 bg-slate-50/80'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <AnimateOnScroll variant="fadeUp" className="space-y-2 mb-14 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>Real Engineering & Problem Solving</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Featured project showcase.
          </h2>
          <p className={`text-sm font-mono max-w-2xl ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Real software built to address genuine friction: agricultural supply chains, student campus living, and contextual AI study tools.
          </p>
        </AnimateOnScroll>

        {/* Projects Cards Container */}
        <div className="space-y-12">
          {PROJECTS.map((project, idx) => (
            <AnimateOnScroll key={project.id} variant="fadeUp" delay={idx * 0.1}>
              <article
                className={`rounded-2xl border overflow-hidden shadow-2xl transition-all duration-300 ${
                  isDark 
                    ? `bg-[#0c101c] ${project.borderColor}` 
                    : 'bg-white border-slate-200 shadow-slate-900/5'
                }`}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x ${
                  isDark ? 'divide-white/10' : 'divide-slate-200'
                }`}>
                  {/* Left Column: Project Documentation */}
                  <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Header Row */}
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-mono font-bold px-2 py-1 rounded ${
                            isDark ? 'text-slate-400 bg-white/5' : 'text-slate-600 bg-slate-100'
                          }`}>
                            PROJECT {project.number}
                          </span>
                          {getStatusBadge(project.statusType, project.statusText)}
                        </div>
                        <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {project.badge}
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <div>
                        <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          {project.name}
                        </h3>
                        <p className={`text-sm font-mono mt-1 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                          {project.tagline}
                        </p>
                      </div>

                      {/* Problem & Solution Dossier */}
                      <div className="space-y-3 pt-2">
                        <div className={`p-3.5 rounded-xl border text-xs sm:text-sm ${
                          isDark 
                            ? 'bg-red-950/15 border-red-500/20 text-slate-300' 
                            : 'bg-rose-50 border-rose-200 text-rose-900'
                        }`}>
                          <span className="font-mono text-rose-500 font-bold block mb-1">
                            [ PROBLEM CONTEXT ]
                          </span>
                          {project.problem}
                        </div>

                        <div className={`p-3.5 rounded-xl border text-xs sm:text-sm ${
                          isDark 
                            ? 'bg-emerald-950/15 border-emerald-500/20 text-slate-300' 
                            : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        }`}>
                          <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold block mb-1">
                            [ IMPLEMENTED / PROPOSED SOLUTION ]
                          </span>
                          {project.solution}
                        </div>
                      </div>

                      {/* Features List */}
                      <div className="pt-2 space-y-2">
                        <span className={`text-xs font-mono uppercase tracking-wider block ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          {project.featuresImplemented ? 'Key Functional Modules:' : 'Verified Platform Features:'}
                        </span>
                        <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs ${
                          isDark ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          {(project.features || project.featuresImplemented).map((feat, fidx) => (
                            <li key={fidx} className="flex items-start gap-2">
                              <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>

                        {/* For Neuronix, clearly show planned features */}
                        {project.featuresPlanned && (
                          <div className={`mt-3 pt-3 border-t space-y-1.5 ${
                            isDark ? 'border-white/5' : 'border-slate-200'
                          }`}>
                            <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 uppercase tracking-wider block">
                              Architecture Roadmap (Planned):
                            </span>
                            <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs ${
                              isDark ? 'text-slate-400' : 'text-slate-500'
                            }`}>
                              {project.featuresPlanned.map((pfeat, pidx) => (
                                <li key={pidx} className="flex items-start gap-2">
                                  <Clock size={12} className="text-purple-500 mt-0.5 shrink-0" />
                                  <span>{pfeat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Engineering Contribution Note */}
                      <div className={`p-3 rounded-lg border text-xs ${
                        isDark 
                          ? 'bg-white/[0.03] border-white/5 text-slate-300' 
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}>
                        <strong className="text-cyan-600 dark:text-cyan-300 font-mono">My Engineering Contribution: </strong>
                        <span>{project.myContribution}</span>
                      </div>
                    </div>

                    {/* Tech Stack Chips & Action Links */}
                    <div className={`pt-4 border-t space-y-4 ${
                      isDark ? 'border-white/10' : 'border-slate-200'
                    }`}>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className={`text-[11px] font-mono mr-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Stack:</span>
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className={`text-[11px] font-mono px-2.5 py-0.5 rounded border ${
                              isDark 
                                ? 'bg-white/5 border-white/10 text-slate-300' 
                                : 'bg-slate-100 border-slate-200 text-slate-700'
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => sound.playClick()}
                            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-emerald-500/20"
                          >
                            <span>Open Live Portal</span>
                            <ExternalLink size={13} />
                          </a>
                        )}

                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sound.playClick()}
                          className={`px-4 py-2 rounded-xl font-medium text-xs border flex items-center gap-2 transition-all ${
                            isDark
                              ? 'bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border-white/10'
                              : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-200 shadow-sm'
                          }`}
                        >
                          <Github size={14} />
                          <span>Inspect Repository</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Unique Interactive Visual Preview */}
                  <div className={`lg:col-span-5 p-6 sm:p-8 flex flex-col justify-center ${
                    isDark ? 'bg-[#080b14]' : 'bg-slate-50'
                  }`}>
                    {/* PREVIEW 1: KISAN CONNECT TOKEN GENERATOR */}
                    {project.previewType === 'kisan-queue' && (
                      <div className="space-y-4">
                        <div className={`flex items-center justify-between text-xs font-mono pb-2 border-b ${
                          isDark ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-600'
                        }`}>
                          <span className="flex items-center gap-1.5 text-emerald-500 font-bold">
                            <Sprout size={14} />
                            <span>Mandi Queue Engine</span>
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded border ${
                            isDark 
                              ? 'text-emerald-400/80 bg-emerald-950/60 border-emerald-500/20' 
                              : 'text-emerald-700 bg-emerald-100 border-emerald-300'
                          }`}>
                            LIVE SIMULATOR
                          </span>
                        </div>

                        {/* Digital Token Ticket UI */}
                        <div className={`p-5 rounded-2xl border shadow-xl relative overflow-hidden ${
                          isDark 
                            ? 'bg-gradient-to-br from-[#0e171b] to-[#081110] border-emerald-500/40' 
                            : 'bg-white border-emerald-300 shadow-emerald-500/5'
                        }`}>
                          <div className={`flex items-start justify-between pb-4 border-b border-dashed ${
                            isDark ? 'border-emerald-500/30' : 'border-emerald-300'
                          }`}>
                            <div>
                              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
                                Grain Procurement Token
                              </span>
                              <h4 className={`text-xl font-mono font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {simulatedToken}
                              </h4>
                            </div>
                            <div className="text-right">
                              <span className={`text-[10px] font-mono block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Center #12</span>
                              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-300 font-bold">Slot: 10:30 AM</span>
                            </div>
                          </div>

                          <div className={`py-4 space-y-2 text-xs font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            <div className="flex justify-between">
                              <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Crop Category:</span>
                              <span className="font-semibold">Wheat (Grade A)</span>
                            </div>
                            <div className="flex justify-between">
                              <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Queue Ahead:</span>
                              <span className="text-emerald-500 font-bold">3 Farmers</span>
                            </div>
                            <div className="flex justify-between">
                              <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Est. Wait:</span>
                              <span className="font-semibold">~18 mins</span>
                            </div>
                          </div>

                          <button
                            onClick={generateNewToken}
                            className={`w-full py-2.5 rounded-xl border font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                              isDark 
                                ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/40' 
                                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-300'
                            }`}
                          >
                            <Ticket size={13} />
                            <span>Generate Next Queue Token</span>
                          </button>
                        </div>

                        <div className={`text-[11px] font-mono text-center ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                          Deployed portal: kisan-connect-portal.netlify.app
                        </div>
                      </div>
                    )}

                    {/* PREVIEW 2: NIVASA HUB ACCOMMODATION DISCOVERY */}
                    {project.previewType === 'nivasa-map' && (
                      <div className="space-y-4">
                        <div className={`flex items-center justify-between text-xs font-mono pb-2 border-b ${
                          isDark ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-600'
                        }`}>
                          <span className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 font-bold">
                            <Home size={14} />
                            <span>Campus Housing Inspector</span>
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded border ${
                            isDark 
                              ? 'text-cyan-400/80 bg-cyan-950/60 border-cyan-500/20' 
                              : 'text-cyan-700 bg-cyan-100 border-cyan-300'
                          }`}>
                            PROTOTYPE UI
                          </span>
                        </div>

                        {/* Accommodation Card Mockup */}
                        <div className={`p-5 rounded-2xl border shadow-xl space-y-4 ${
                          isDark ? 'bg-[#0c1220] border-cyan-500/30' : 'bg-white border-slate-200'
                        }`}>
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest block">
                                Verified Student Listing
                              </span>
                              <h4 className={`text-base font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                Greenfield Student Residencies
                              </h4>
                              <p className={`text-xs flex items-center gap-1 mt-0.5 font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                <MapPin size={12} className="text-cyan-500" />
                                350m from RCPIT Campus Gate
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-bold text-cyan-600 dark:text-cyan-300 font-mono">₹4,500</span>
                              <span className={`text-[10px] block font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>/month</span>
                            </div>
                          </div>

                          {/* Interactive Amenities Selector */}
                          <div className="space-y-2">
                            <span className={`text-[10px] font-mono uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Verified Amenities:</span>
                            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                              {[
                                { id: 'wifi', label: 'High-Speed Wi-Fi' },
                                { id: 'meals', label: 'Nutritious 3x Meals' },
                                { id: 'power', label: '24/7 Power Backup' },
                                { id: 'ro', label: 'RO Drinking Water' },
                              ].map((amenity) => (
                                <div
                                  key={amenity.id}
                                  onClick={() => {
                                    sound.playClick();
                                    setSelectedAmenity(amenity.id);
                                  }}
                                  className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                                    selectedAmenity === amenity.id
                                      ? isDark
                                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                                        : 'bg-cyan-100 border-cyan-400 text-cyan-800 font-semibold'
                                      : isDark
                                        ? 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                                        : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                                  }`}
                                >
                                  <span className="block text-[11px] font-medium">{amenity.label}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className={`pt-2 flex items-center justify-between text-[11px] font-mono border-t ${
                            isDark ? 'border-white/5 text-slate-400' : 'border-slate-200 text-slate-600'
                          }`}>
                            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                              <ShieldCheck size={13} /> Direct Owner • Zero Brokerage
                            </span>
                            <span>Rating: 4.8/5</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* PREVIEW 3: NEURONIX AI CAMPUS KNOWLEDGE ENGINE */}
                    {project.previewType === 'neuronix-neural' && (
                      <div className="space-y-4">
                        <div className={`flex items-center justify-between text-xs font-mono pb-2 border-b ${
                          isDark ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-600'
                        }`}>
                          <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-bold">
                            <Cpu size={14} />
                            <span>AI Study Companion</span>
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded border ${
                            isDark 
                              ? 'text-purple-400/80 bg-purple-950/60 border-purple-500/20' 
                              : 'text-purple-700 bg-purple-100 border-purple-300'
                          }`}>
                            CONCEPT ARCHITECTURE
                          </span>
                        </div>

                        {/* Neural Study Node Console */}
                        <div className={`p-5 rounded-2xl border shadow-xl space-y-4 font-mono ${
                          isDark ? 'bg-[#110d1f] border-purple-500/30' : 'bg-white border-purple-200'
                        }`}>
                          <div className={`flex items-center justify-between pb-3 border-b text-xs ${
                            isDark ? 'border-purple-500/20' : 'border-purple-200'
                          }`}>
                            <span className="text-purple-600 dark:text-purple-300 font-bold">NEURONIX // PROMPT QUERY</span>
                            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                          </div>

                          {/* Query Input simulation */}
                          <div className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                            isDark 
                              ? 'bg-black/40 border-purple-500/20 text-purple-200' 
                              : 'bg-purple-50 border-purple-200 text-purple-900'
                          }`}>
                            <span>&gt; {neuralQuery}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded ${
                              isDark ? 'text-purple-400 bg-purple-950/80' : 'text-purple-700 bg-purple-200'
                            }`}>
                              GEN_MODE
                            </span>
                          </div>

                          {/* Synthesized Response Mock */}
                          <div className={`space-y-2 text-xs p-3 rounded-xl border ${
                            isDark 
                              ? 'bg-purple-950/20 border-purple-500/10 text-slate-300' 
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}>
                            <div className="text-[10px] text-purple-600 dark:text-purple-400 uppercase tracking-widest font-bold">
                              Synthesized Knowledge Card:
                            </div>
                            <p className="text-[11px] leading-relaxed">
                              <strong>Topic:</strong> Binary Search Trees vs AVL Trees
                              <br />
                              <strong>Balance Factor:</strong> Height difference in AVL strictly bounded to &#123;-1, 0, +1&#125; via rotations.
                            </p>
                            <div className="pt-1 flex gap-2">
                              <span className={`text-[10px] px-2 py-0.5 rounded ${
                                isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-800'
                              }`}>
                                3 Practice Questions Ready
                              </span>
                            </div>
                          </div>

                          <div className={`text-[10px] text-center ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                            Roadmap: UI layout prototyped; PDF parser engine in active design.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
