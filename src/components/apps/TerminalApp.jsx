import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../../audio/soundEngine';
import { PROFILE, PROJECTS } from '../../data/portfolioData';

export default function TerminalApp({ openApp }) {
  const [history, setHistory] = useState([
    { type: 'system', text: 'RahilOS Bash Terminal v2.4 (x86_64-apple-darwin)' },
    { type: 'system', text: 'Type "help" to inspect available system commands.' },
    { type: 'blank' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cmdHistory, setCmdHistory] = useState([]);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const isInitial = useRef(true);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = inputVal.trim();
      sound.playKey();

      if (!cmd) {
        setHistory(prev => [...prev, { type: 'input', text: '' }]);
        return;
      }

      setCmdHistory(prev => [...prev, cmd]);
      setHistoryIndex(-1);

      const newHistory = [...history, { type: 'input', text: cmd }];
      const lower = cmd.toLowerCase();

      switch (lower) {
        case 'help':
          newHistory.push(
            { type: 'output', text: 'Available commands:' },
            { type: 'output', text: '  bio        - Display creative developer dossier' },
            { type: 'output', text: '  projects   - List 4 core systems (PSM, NEURONIX, NIWASA, KISAN)' },
            { type: 'output', text: '  skills     - Inspect full frontend & motion stack' },
            { type: 'output', text: '  github     - Visit @rahilmirza062-code' },
            { type: 'output', text: '  sudo hire  - Fast-track recruiter dispatch [CONFIDENTIAL]' },
            { type: 'output', text: '  apps       - Open GUI apps (projects, about, playground, contact)' },
            { type: 'output', text: '  matrix     - Activate digital cascade stream' },
            { type: 'output', text: '  clear      - Flush terminal history' }
          );
          break;

        case 'bio':
          newHistory.push(
            { type: 'output', text: `NAME:     ${PROFILE.name}` },
            { type: 'output', text: `ROLE:     ${PROFILE.title}` },
            { type: 'output', text: `FOCUS:    ${PROFILE.subTitle}` },
            { type: 'output', text: `LOCATION: ${PROFILE.location}` },
            { type: 'output', text: `STATUS:   ${PROFILE.status}` }
          );
          break;

        case 'projects':
          newHistory.push(
            { type: 'output', text: '=== CORE ARCHITECTURE REGISTRY ===' },
            ...PROJECTS.flatMap(p => [
              { type: 'highlight', text: `• [${p.name}] - ${p.tagline}` },
              { type: 'output', text: `  Tech: ${p.tech.join(', ')}` },
              { type: 'output', text: `  Category: ${p.category}` }
            ])
          );
          break;

        case 'skills':
          newHistory.push(
            { type: 'output', text: 'LANGUAGES:   JavaScript (ESNext), TypeScript, HTML5, CSS3' },
            { type: 'output', text: 'FRAMEWORKS:  React.js, Next.js, Vite, Tailwind CSS' },
            { type: 'output', text: 'CREATIVE:    Framer Motion, Web Audio API, Canvas 2D, SVG' },
            { type: 'output', text: 'TOOLING:     Figma, Git/GitHub, PostCSS, Webpack' }
          );
          break;

        case 'github':
          newHistory.push({ type: 'highlight', text: `Opening ${PROFILE.github}...` });
          window.open(PROFILE.github, '_blank');
          break;

        case 'sudo hire':
          sound.playSuccess();
          try {
            confetti({
              particleCount: 120,
              spread: 70,
              origin: { y: 0.6 }
            });
          } catch {}
          newHistory.push(
            { type: 'success', text: '🎉 ROOT PRIVILEGES GRANTED: Mirza Rahil is ready for hire!' },
            { type: 'output', text: `Email dispatched to: ${PROFILE.email}` },
            { type: 'output', text: 'Opening Contact Dispatcher...' }
          );
          if (openApp) setTimeout(() => openApp('contact'), 500);
          break;

        case 'matrix':
          sound.playOpen();
          newHistory.push(
            { type: 'matrix', text: '01001101 01101001 01110010 01111010 01100001 00100000 01010010 01100001 01101000 01101001 01101100' },
            { type: 'matrix', text: 'SYSTEM: Reality decrypted. Welcome to the machine.' }
          );
          break;

        case 'apps':
          newHistory.push(
            { type: 'output', text: 'Installed Applications:' },
            { type: 'highlight', text: '  projects   - Projects.app' },
            { type: 'highlight', text: '  about      - About_Rahil.app' },
            { type: 'highlight', text: '  playground - Interaction_Lab.app' },
            { type: 'highlight', text: '  contact    - Dispatch.app' },
            { type: 'output', text: 'Type "open <app>" to launch.' }
          );
          break;

        case 'clear':
          setHistory([]);
          setInputVal('');
          return;

        default:
          if (lower.startsWith('open ')) {
            const app = lower.replace('open ', '').trim();
            const validApps = ['projects', 'about', 'terminal', 'playground', 'contact'];
            if (validApps.includes(app)) {
              if (openApp) openApp(app);
              newHistory.push({ type: 'output', text: `Launching ${app}.app...` });
            } else {
              newHistory.push({ type: 'error', text: `Application "${app}" not found. Valid apps: ${validApps.filter(a => a !== 'terminal').join(', ')}` });
            }
          } else {
            newHistory.push({ type: 'error', text: `zsh: command not found: ${cmd}. Type "help" for command directory.` });
          }
      }

      setHistory(newHistory);
      setInputVal('');
    } else {
      sound.playKey();
    }
  };

  return (
    <div 
      ref={containerRef}
      onClick={() => inputRef.current?.focus()}
      className="h-full bg-[#08090f] p-4 font-mono text-xs text-slate-300 overflow-y-auto flex flex-col cursor-text select-text"
    >
      <div className="space-y-1 flex-1">
        {history.map((item, idx) => {
          if (item.type === 'system') {
            return <div key={idx} className="text-slate-500 font-semibold">{item.text}</div>;
          }
          if (item.type === 'blank') {
            return <div key={idx} className="h-2" />;
          }
          if (item.type === 'input') {
            return (
              <div key={idx} className="flex items-center gap-2 text-slate-200">
                <span className="text-cyan-400 font-bold">rahil@workstation:~$</span>
                <span>{item.text}</span>
              </div>
            );
          }
          if (item.type === 'highlight') {
            return <div key={idx} className="text-cyan-300 font-bold pl-2">{item.text}</div>;
          }
          if (item.type === 'success') {
            return <div key={idx} className="text-emerald-400 font-bold pl-2 bg-emerald-950/20 py-1 rounded">{item.text}</div>;
          }
          if (item.type === 'matrix') {
            return <div key={idx} className="text-emerald-500 font-mono tracking-widest pl-2">{item.text}</div>;
          }
          if (item.type === 'error') {
            return <div key={idx} className="text-rose-400 pl-2">{item.text}</div>;
          }
          return <div key={idx} className="text-slate-400 pl-2">{item.text}</div>;
        })}

        {/* Active Command Input Line */}
        <div className="flex items-center gap-2 pt-1 text-slate-200">
          <span className="text-cyan-400 font-bold shrink-0">rahil@workstation:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent border-none outline-none text-slate-100 font-mono text-xs caret-cyan-400"
            autoFocus
            spellCheck={false}
          />
        </div>
      </div>

      <div className="pt-3 border-t border-white/5 text-[10px] text-slate-600 flex justify-between">
        <span>Bash v2.4 • UTF-8</span>
        <span>Try typing 'sudo hire' or 'matrix'</span>
      </div>
    </div>
  );
}
