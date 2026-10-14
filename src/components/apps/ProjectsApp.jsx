import React, { useState } from 'react';
import { ExternalLink, Github, Sparkles, Layers, Activity, Eye, CheckCircle2, Cpu, Shirt, Home, Sprout } from 'lucide-react';
import { PROJECTS, PROFILE } from '../../data/portfolioData';
import { sound } from '../../audio/soundEngine';

export default function ProjectsApp() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProject, setActiveProject] = useState(PROJECTS[0]);
  const [interactiveMode, setInteractiveMode] = useState('overview'); // overview, simulation

  // Simulation states
  const [fabricColor, setFabricColor] = useState('#06b6d4');
  const [lightingMode, setLightingMode] = useState('day'); // day, golden, night
  const [neuralPulse, setNeuralPulse] = useState(false);
  const [voiceSpoken, setVoiceSpoken] = useState(false);

  const categories = ['All', 'Commercial & E-Commerce', 'AI & Generative UI', 'Spatial & Architecture', 'Impact & Agritech'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  const getProjectIcon = (id) => {
    switch(id) {
      case 'psm-textile': return Shirt;
      case 'neuronix-ai': return Cpu;
      case 'niwasa-hub': return Home;
      case 'kisan-connect': return Sprout;
      default: return Layers;
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10 select-text">
      {/* Sidebar: Project Navigation & Filters */}
      <div className="w-full md:w-80 p-4 flex flex-col bg-[#0f121d]/90 shrink-0 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-cyan-400" />
            <h2 className="font-bold text-white text-sm tracking-wide">Featured Works</h2>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
            {PROJECTS.length} Systems
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat);
              }}
              className={`text-[10px] font-mono px-2.5 py-1 rounded-md transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
            >
              {cat === 'All' ? 'All' : cat.split('&')[0].trim()}
            </button>
          ))}
        </div>

        {/* Project List */}
        <div className="space-y-2 flex-1">
          {filteredProjects.map((project) => {
            const Icon = getProjectIcon(project.id);
            const isSelected = activeProject.id === project.id;
            return (
              <div
                key={project.id}
                onClick={() => {
                  sound.playClick();
                  setActiveProject(project);
                  setInteractiveMode('overview');
                }}
                className={`p-3 rounded-lg cursor-pointer transition-all border text-left ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-950/40 to-blue-950/20 border-cyan-500/40 shadow-lg shadow-cyan-950/30'
                    : 'bg-white/5 border-white/5 hover:border-white/15 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded-md flex items-center justify-center text-white"
                      style={{ backgroundColor: `${project.color}25`, border: `1px solid ${project.color}60` }}
                    >
                      <Icon size={13} style={{ color: project.color }} />
                    </div>
                    <span className="font-bold text-xs text-white tracking-wide">{project.name}</span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 bg-black/40 px-1.5 py-0.5 rounded">
                    {project.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1 leading-relaxed pl-8">
                  {project.tagline}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer info in sidebar */}
        <div className="mt-4 pt-3 border-t border-white/10 text-[10px] font-mono text-slate-400 flex items-center justify-between">
          <span>Author: {PROFILE.name}</span>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 hover:underline flex items-center gap-1"
          >
            <Github size={11} /> GitHub
          </a>
        </div>
      </div>

      {/* Main Content Area: Detailed Project Showcase & Live Micro-Simulators */}
      <div className="flex-1 p-6 overflow-y-auto bg-[#0a0c14]/95 flex flex-col justify-between">
        <div>
          {/* Header Bar of Active Project */}
          <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span
                  className="w-3 h-3 rounded-full animate-ping"
                  style={{ backgroundColor: activeProject.color }}
                />
                <h1 className="text-2xl font-extrabold text-white tracking-tight">
                  {activeProject.name}
                </h1>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                  {activeProject.category}
                </span>
              </div>
              <p className="text-sm text-cyan-400/90 font-mono">
                {activeProject.tagline}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-200 hover:text-white transition-all"
              >
                <Github size={13} />
                <span>Source Code</span>
              </a>
              <button
                onClick={() => {
                  sound.playSuccess();
                  setInteractiveMode(interactiveMode === 'simulation' ? 'overview' : 'simulation');
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-xs transition-all shadow-md shadow-cyan-500/20"
              >
                <Sparkles size={13} />
                <span>{interactiveMode === 'simulation' ? 'Exit Interactive Mode' : 'Launch Interactive Lab'}</span>
              </button>
            </div>
          </div>

          {/* Conditional View: Standard Overview OR Interactive Sandbox Lab */}
          {interactiveMode === 'overview' ? (
            <div className="py-6 space-y-6">
              {/* Description */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Activity size={13} className="text-cyan-400" /> Executive Architecture
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.entries(activeProject.metrics).map(([key, val]) => (
                  <div key={key} className="p-3 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                      {key}
                    </span>
                    <span className="text-sm font-bold text-white font-mono">{val}</span>
                  </div>
                ))}
              </div>

              {/* Architectural Highlights */}
              <div>
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                  Core Engineering Milestones
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {activeProject.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex items-start gap-2.5 text-xs text-slate-300"
                    >
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Badges */}
              <div>
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5">
                  Technology Pipeline
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-3 py-1 rounded-md bg-white/5 border border-white/10 text-cyan-300/90 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* INTERACTIVE SANDBOX LAB FOR EACH PROJECT */
            <div className="py-6 space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-black/80 to-[#121524] border border-cyan-500/30 shadow-xl">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-cyan-400 animate-spin" />
                    <h3 className="text-sm font-bold text-white">Interactive Prototype Lab</h3>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                    Live UI Emulation
                  </span>
                </div>

                {/* PROJECT-SPECIFIC INTERACTIVE EXPERIENCES */}
                {activeProject.id === 'psm-textile' && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-300">
                      <strong>Interactive Fabric Weave Visualizer:</strong> Select a weave color or thread density to see live CSS/Canvas reactive texture rendering.
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-slate-400">Fabric Thread:</span>
                      {['#06b6d4', '#f43f5e', '#10b981', '#fbbf24', '#8b5cf6'].map((color) => (
                        <button
                          key={color}
                          onClick={() => { sound.playClick(); setFabricColor(color); }}
                          className={`w-7 h-7 rounded-full border-2 transition-transform ${
                            fabricColor === color ? 'scale-125 border-white shadow-lg' : 'border-transparent opacity-70'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    {/* Fabric Canvas Simulator */}
                    <div 
                      className="h-44 rounded-lg relative overflow-hidden border border-white/10 flex items-center justify-center p-4 transition-colors duration-500"
                      style={{
                        backgroundColor: `${fabricColor}15`,
                        backgroundImage: `repeating-linear-gradient(45deg, ${fabricColor}33 0, ${fabricColor}33 2px, transparent 0, transparent 10px)`
                      }}
                    >
                      <div className="bg-black/75 backdrop-blur-md p-4 rounded-lg border border-white/15 text-center max-w-xs shadow-2xl">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block mb-1">
                          PSM TEXTILE WEAVE ENGINE
                        </span>
                        <div className="text-sm font-bold text-white mb-1">High-Density Combed Cotton</div>
                        <div className="text-xs font-mono text-slate-300">Thread Count: 450 TC • Shade #{fabricColor}</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeProject.id === 'neuronix-ai' && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-300">
                      <strong>Neural Pulse & Token Stream Simulator:</strong> Trigger the neural network activation sequence to witness streaming tokens and acoustic telemetry feedback.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          sound.playOpen();
                          setNeuralPulse(true);
                          setTimeout(() => setNeuralPulse(false), 2400);
                        }}
                        className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs flex items-center gap-2 transition-all shadow-md shadow-purple-900/40"
                      >
                        <Cpu size={14} /> Send Neural Activation Pulse
                      </button>
                    </div>

                    <div className="h-44 rounded-lg bg-black/90 border border-purple-500/30 p-4 font-mono text-xs flex flex-col justify-between overflow-hidden relative">
                      <div className="flex items-center justify-between text-purple-400 border-b border-purple-500/20 pb-2">
                        <span>NEURONIX // MATRIX v4.1</span>
                        <span>LATENCY: {neuralPulse ? '3.8ms (SYNAPSE ACTIVE)' : '11.2ms (IDLE)'}</span>
                      </div>
                      <div className="space-y-1.5 my-auto text-slate-300">
                        <div className="flex items-center gap-2">
                          <span className="text-purple-400 font-bold">&gt;</span>
                          <span>Prompt: "Synthesize high-fidelity user interaction pipeline"</span>
                        </div>
                        <div className={`transition-all duration-300 ${neuralPulse ? 'text-cyan-300 font-bold' : 'text-slate-400'}`}>
                          {neuralPulse
                            ? '⚡ Streaming 248 tokens/sec | Neural Weights Adjusted | High Attention Cohesion...'
                            : '• Neural nodes in standby. Click activation to stimulate model.'}
                        </div>
                      </div>
                      <div className="h-1.5 w-full bg-purple-950 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full ${neuralPulse ? 'w-full transition-all duration-1000' : 'w-1/4'}`} />
                      </div>
                    </div>
                  </div>
                )}

                {activeProject.id === 'niwasa-hub' && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-300">
                      <strong>Spatial Lighting & Architectural Simulator:</strong> Switch solar angles to preview real-time daylight ambiance rendering across spatial properties.
                    </p>
                    <div className="flex gap-2">
                      {['day', 'golden', 'night'].map((mode) => (
                        <button
                          key={mode}
                          onClick={() => { sound.playClick(); setLightingMode(mode); }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wide transition-all ${
                            lightingMode === mode
                              ? 'bg-blue-600 text-white font-bold'
                              : 'bg-white/5 text-slate-400 hover:bg-white/10'
                          }`}
                        >
                          {mode === 'day' ? '☀️ Morning High' : mode === 'golden' ? '🌅 Golden Hour' : '🌙 Midnight Ambient'}
                        </button>
                      ))}
                    </div>

                    <div className={`h-44 rounded-lg border p-4 flex flex-col justify-between transition-all duration-700 ${
                      lightingMode === 'day' 
                        ? 'bg-gradient-to-br from-sky-900/60 to-blue-950/80 border-sky-400/40 text-slate-100'
                        : lightingMode === 'golden'
                        ? 'bg-gradient-to-br from-amber-950/70 to-rose-950/70 border-amber-500/40 text-amber-100'
                        : 'bg-gradient-to-br from-slate-950 to-[#070b14] border-blue-900/30 text-slate-300'
                    }`}>
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="font-bold">NIWASA SPATIAL SUITE #402</span>
                        <span className="px-2 py-0.5 rounded bg-black/40">Sun Altitude: {lightingMode === 'day' ? '68°' : lightingMode === 'golden' ? '14°' : '-45°'}</span>
                      </div>
                      <div className="text-center my-auto">
                        <div className="text-lg font-extrabold tracking-wide">Penthouse Horizon Villa</div>
                        <p className="text-xs opacity-80 font-mono">2,850 sq.ft • Architectural Glazing • Solar Heat Regulated</p>
                      </div>
                      <div className="text-[10px] font-mono opacity-60 text-right">Adaptive Lighting Engine Active</div>
                    </div>
                  </div>
                )}

                {activeProject.id === 'kisan-connect' && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-300">
                      <strong>Voice-First Mandi Navigator:</strong> Emulates the regional voice input workflow engineered for accessibility in rural marketplaces.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          sound.playSuccess();
                          setVoiceSpoken(true);
                          setTimeout(() => setVoiceSpoken(false), 3000);
                        }}
                        className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs flex items-center gap-2 transition-all shadow-md shadow-emerald-950/50"
                      >
                        <Sprout size={14} /> Simulate Farmer Voice Query (Mic)
                      </button>
                    </div>

                    <div className="h-44 rounded-lg bg-black/90 border border-emerald-500/30 p-4 font-mono text-xs flex flex-col justify-between">
                      <div className="flex justify-between items-center text-emerald-400 border-b border-emerald-500/20 pb-2">
                        <span>KISAN CONNECT // MANDI LIVE TELEMETRY</span>
                        <span className="animate-pulse">● LIVE STREAM</span>
                      </div>
                      <div className="space-y-2 my-auto">
                        <div className="text-slate-300">
                          {voiceSpoken ? (
                            <span className="text-emerald-300 font-bold">
                              🎙️ Voice recognized: "Aaj Gehun ka mandi bhav kya hai?" (Hindi)
                            </span>
                          ) : (
                            <span className="text-slate-500">
                              Press "Simulate Voice Query" to trigger speech parsing...
                            </span>
                          )}
                        </div>
                        <div className="p-2.5 rounded bg-emerald-950/30 border border-emerald-500/20 text-emerald-200">
                          Wheat (Sharbati) Average: ₹2,420/Quintal (+4.2% from yesterday) • 42 Buyers Online
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-500 flex justify-between">
                        <span>PWA Offline Cache: Synced</span>
                        <span>Zero Literacy Barrier Tested</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Prompt */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>Crafted with meticulous attention to interaction fidelity.</span>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 hover:text-cyan-300 font-mono font-medium flex items-center gap-1"
          >
            Explore all repositories on GitHub <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
