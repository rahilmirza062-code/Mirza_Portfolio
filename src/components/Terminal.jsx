import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Trash2 } from 'lucide-react';
import { PROFILE, PROJECTS, SKILLS_DATA, TERMINAL_COMMANDS } from '../data/portfolioData';
import { sound } from '../audio/soundEngine';
import { useTheme } from '../context/ThemeContext';
import AnimateOnScroll from './AnimateOnScroll';

export default function Terminal() {
  const { isDark } = useTheme();
  const [history, setHistory] = useState([
    { type: 'system', text: 'Rahil Mirza Developer CLI [Version 2.0.29 - CDS Environment]' },
    { type: 'system', text: 'Type "help" to list available commands or click the shortcut buttons below.' },
    { type: 'blank' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [commandIndex, setCommandIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState([]);
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (rawCmd) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    sound.playClick();
    setCommandHistory(prev => [...prev, cmd]);
    setCommandIndex(-1);

    const newEntries = [{ type: 'input', text: cmd }];
    const lower = cmd.toLowerCase();

    switch (lower) {
      case 'help':
        newEntries.push(
          { type: 'header', text: '=== AVAILABLE SYSTEM COMMANDS ===' },
          ...Object.entries(TERMINAL_COMMANDS).map(([k, desc]) => ({
            type: 'command_row',
            cmd: k,
            desc: desc
          })),
          { type: 'system', text: 'Tip: You can also click the quick buttons below anytime.' }
        );
        break;

      case 'about':
        newEntries.push(
          { type: 'header', text: `=== DOSSIER: ${PROFILE.name.toUpperCase()} ===` },
          { type: 'text', text: `Role:        ${PROFILE.tagline}` },
          { type: 'institution', text: `Institution: ${PROFILE.college}` },
          { type: 'text', text: `Degree:      ${PROFILE.degree} (Expected ${PROFILE.gradYear})` },
          { type: 'text', text: `Thesis:      "${PROFILE.coreTheme}"` },
          { type: 'text', text: `Bio:         ${PROFILE.bio}` }
        );
        break;

      case 'skills':
        newEntries.push(
          { type: 'header', text: '=== CORE TECHNICAL CAPABILITIES ===' },
          ...SKILLS_DATA.flatMap(g => [
            { type: 'highlight', text: `[${g.category.toUpperCase()}]` },
            ...g.skills.map(s => ({
              type: 'text',
              text: `  • ${s.name} (${s.level})`
            }))
          ])
        );
        break;

      case 'projects':
        newEntries.push(
          { type: 'header', text: '=== FEATURED REAL-WORLD PROJECTS ===' },
          ...PROJECTS.map(p => ({
            type: 'project_item',
            name: p.name,
            tagline: p.tagline,
            status: p.statusText,
            tech: p.tech.join(', '),
            url: p.liveUrl || p.githubUrl
          }))
        );
        break;

      case 'contact':
        newEntries.push(
          { type: 'header', text: '=== PROFESSIONAL REACH & LINKS ===' },
          { type: 'text', text: `Email:   ${PROFILE.email}` },
          { type: 'text', text: `GitHub:  ${PROFILE.github}` },
          { type: 'text', text: `Campus:  ${PROFILE.college}` },
          { type: 'success', text: 'Open for summer internships, collaborations, and hackathon teams!' }
        );
        break;

      case 'status':
        newEntries.push(
          { type: 'header', text: '=== ACADEMIC & DEVELOPMENT TELEMETRY ===' },
          { type: 'text', text: `Year:    2nd Year Undergraduate (Class of 2029)` },
          { type: 'text', text: `Focus:   Full-Stack Fundamentals, Data Structures, Relational DBs` },
          { type: 'text', text: `Mode:    Still learning. Always building. Becoming better.` }
        );
        break;

      case 'clear':
        setHistory([
          { type: 'system', text: 'Console buffer cleared. Type "help" for command catalog.' }
        ]);
        setInputValue('');
        return;

      default:
        newEntries.push(
          { type: 'error', text: `Command not recognized: "${cmd}". Type "help" to view safe valid commands.` }
        );
        break;
    }

    setHistory(prev => [...prev, ...newEntries]);
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputValue);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = commandIndex === -1 ? commandHistory.length - 1 : Math.max(0, commandIndex - 1);
      setCommandIndex(nextIdx);
      setInputValue(commandHistory[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandIndex === -1) return;
      const nextIdx = commandIndex + 1;
      if (nextIdx >= commandHistory.length) {
        setCommandIndex(-1);
        setInputValue('');
      } else {
        setCommandIndex(nextIdx);
        setInputValue(commandHistory[nextIdx]);
      }
    } else {
      sound.playKey();
    }
  };

  const quickCommands = ['help', 'about', 'skills', 'projects', 'contact', 'status', 'clear'];

  return (
    <section 
      id="terminal" 
      className={`py-24 relative border-t transition-colors duration-300 ${
        isDark ? 'border-white/5 bg-[#070910]' : 'border-slate-200 bg-slate-100/60'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <AnimateOnScroll variant="fadeUp" className="space-y-2 mb-10 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>Interactive Environment</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Developer CLI console.
          </h2>
          <p className={`text-xs sm:text-sm font-mono ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            A sandboxed, keyboard-driven shell providing real-time queries for recruiters, engineers, and curious visitors.
          </p>
        </AnimateOnScroll>

        {/* Terminal Window Box */}
        <AnimateOnScroll variant="scaleUp" delay={0.1}>
          <div className={`rounded-2xl border shadow-2xl overflow-hidden font-mono text-xs sm:text-sm ${
            isDark 
              ? 'bg-[#090c15] border-cyan-500/30' 
              : 'bg-[#0f172a] border-slate-700 shadow-slate-900/20'
          }`}>
            {/* Top Title Bar */}
            <div className="px-4 py-3 bg-[#0c101c] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 cursor-pointer" onClick={() => executeCommand('clear')}></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                <span className="ml-2 text-slate-300 text-xs flex items-center gap-1.5">
                  <TerminalIcon size={13} className="text-cyan-400" />
                  rahil@rcpit-cds:~$
                </span>
              </div>

              <button
                onClick={() => executeCommand('clear')}
                className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] transition-colors"
                title="Clear terminal screen"
              >
                <Trash2 size={12} />
                <span className="hidden sm:inline">Clear</span>
              </button>
            </div>

            {/* Terminal Screen Body */}
            <div
              ref={terminalBodyRef}
              onClick={() => inputRef.current?.focus()}
              className="p-5 h-80 sm:h-96 overflow-y-auto space-y-2 bg-[#080b13]/95 text-slate-200 selection:bg-cyan-500/30 cursor-text"
            >
              {history.map((item, idx) => {
                if (item.type === 'system') {
                  return (
                    <div key={idx} className="text-slate-400 text-xs">
                      {item.text}
                    </div>
                  );
                }
                if (item.type === 'blank') {
                  return <div key={idx} className="h-1" />;
                }
                if (item.type === 'input') {
                  return (
                    <div key={idx} className="text-cyan-300 flex items-center gap-2 font-semibold">
                      <span className="text-emerald-400">rahil@cds:~$</span>
                      <span>{item.text}</span>
                    </div>
                  );
                }
                if (item.type === 'header') {
                  return (
                    <div key={idx} className="text-cyan-400 font-bold pt-1 pb-0.5 border-b border-white/10">
                      {item.text}
                    </div>
                  );
                }
                if (item.type === 'command_row') {
                  return (
                    <div key={idx} className="grid grid-cols-12 gap-2 text-xs">
                      <span className="col-span-3 sm:col-span-2 text-emerald-300 font-bold">
                        {item.cmd}
                      </span>
                      <span className="col-span-9 sm:col-span-10 text-slate-300">
                        {item.desc}
                      </span>
                    </div>
                  );
                }
                if (item.type === 'highlight') {
                  return (
                    <div key={idx} className="text-purple-300 font-bold pt-1">
                      {item.text}
                    </div>
                  );
                }
                if (item.type === 'project_item') {
                  return (
                    <div key={idx} className="p-2.5 rounded-lg bg-white/[0.04] border border-white/10 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-bold">{item.name}</span>
                        <span className="text-emerald-400 text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                          {item.status}
                        </span>
                      </div>
                      <div className="text-slate-300">{item.tagline}</div>
                      <div className="text-slate-400 text-[11px]">Stack: {item.tech}</div>
                    </div>
                  );
                }
                if (item.type === 'success') {
                  return (
                    <div key={idx} className="text-emerald-300 font-medium pt-1">
                      [OK] {item.text}
                    </div>
                  );
                }
                if (item.type === 'error') {
                  return (
                    <div key={idx} className="text-rose-400 font-medium">
                      [ERR] {item.text}
                    </div>
                  );
                }
                return (
                  <div key={idx} className="text-slate-200">
                    {item.text}
                  </div>
                );
              })}

              {/* Live Input Line */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-emerald-400 shrink-0">rahil@cds:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-none outline-none text-cyan-300 font-mono text-xs sm:text-sm p-0 m-0 focus:ring-0"
                  placeholder="type a command (e.g. help, projects, about)..."
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
            </div>

            {/* Quick Command Pills Bar */}
            <div className="px-4 py-2.5 bg-[#0a0e19] border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-slate-400 text-[11px] mr-1 hidden sm:inline">Shortcuts:</span>
                {quickCommands.map((q) => (
                  <button
                    key={q}
                    onClick={() => executeCommand(q)}
                    className="px-2 py-0.5 rounded bg-white/10 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/30 transition-colors text-[11px]"
                  >
                    {q}
                  </button>
                ))}
              </div>

              <div className="text-[10px] text-slate-400 hidden sm:block">
                Press Enter ↵ to run
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
