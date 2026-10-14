import React from 'react';
import { Layers, User, Terminal, Sliders, Mail } from 'lucide-react';
import WindowFrame from './WindowFrame';
import ProjectsApp from './apps/ProjectsApp';
import AboutApp from './apps/AboutApp';
import TerminalApp from './apps/TerminalApp';
import PlaygroundApp from './apps/PlaygroundApp';
import ContactApp from './apps/ContactApp';
import { sound } from '../audio/soundEngine';
import { PROFILE } from '../data/portfolioData';

export default function Desktop({
  windows,
  onCloseWindow,
  onMinimizeWindow,
  onToggleMaximizeWindow,
  onFocusWindow,
  onOpenApp
}) {
  const desktopIcons = [
    { id: 'projects', label: 'Projects.app', icon: Layers, desc: '4 Core Systems' },
    { id: 'about', label: 'About_Rahil.app', icon: User, desc: 'Creative Dossier' },
    { id: 'terminal', label: 'Terminal.sh', icon: Terminal, desc: 'Bash CLI Shell' },
    { id: 'playground', label: 'Interaction_Lab.app', icon: Sliders, desc: 'Micro-interaction Sandbox' },
    { id: 'contact', label: 'Dispatch.app', icon: Mail, desc: 'Encrypted Contact' },
  ];

  return (
    <main className="relative flex-1 w-full h-[calc(100vh-32px)] overflow-hidden p-6 select-none">
      {/* Desktop Background Watermark / Ambient Title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/30 to-transparent font-mono">
          RAHIL.OS
        </h1>
        <p className="text-xs md:text-sm font-mono tracking-widest text-cyan-400 mt-2 uppercase">
          Frontend & Creative Engineering • UI/UX Architecture
        </p>
      </div>

      {/* Desktop Shortcut Icons (top-left vertical grid) */}
      <div className="relative z-10 grid grid-cols-1 gap-4 w-32">
        {desktopIcons.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                sound.playOpen();
                onOpenApp(item.id);
              }}
              className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 active:bg-white/15 transition-all text-center group cursor-pointer focus:outline-none"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#121626]/90 border border-white/10 group-hover:border-cyan-400/50 shadow-lg flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-all overflow-hidden p-0.5">
                {item.id === 'about' ? (
                  <img src={PROFILE.avatar} alt="Rahil" className="w-full h-full object-cover object-top rounded-[14px]" />
                ) : (
                  <Icon size={22} />
                )}
              </div>
              <span className="text-[11px] font-mono text-slate-200 group-hover:text-cyan-300 font-medium tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* WINDOW 1: Projects Showcase */}
      <WindowFrame
        id="projects"
        title="Projects.app — Mirza Rahil Systems Portfolio"
        icon={Layers}
        isOpen={windows?.projects?.isOpen}
        isMinimized={windows?.projects?.isMinimized}
        isMaximized={windows?.projects?.isMaximized}
        zIndex={windows?.projects?.zIndex || 10}
        onClose={onCloseWindow}
        onMinimize={onMinimizeWindow}
        onToggleMaximize={onToggleMaximizeWindow}
        onFocus={onFocusWindow}
      >
        <ProjectsApp />
      </WindowFrame>

      {/* WINDOW 2: About Mirza Rahil Dossier */}
      <WindowFrame
        id="about"
        title="About_Rahil.app — Creative Developer Dossier"
        icon={User}
        isOpen={windows?.about?.isOpen}
        isMinimized={windows?.about?.isMinimized}
        isMaximized={windows?.about?.isMaximized}
        zIndex={windows?.about?.zIndex || 10}
        onClose={onCloseWindow}
        onMinimize={onMinimizeWindow}
        onToggleMaximize={onToggleMaximizeWindow}
        onFocus={onFocusWindow}
      >
        <AboutApp openApp={onOpenApp} />
      </WindowFrame>

      {/* WINDOW 3: Interactive Hacker Terminal */}
      <WindowFrame
        id="terminal"
        title="Terminal.sh — rahil@workstation:~"
        icon={Terminal}
        isOpen={windows?.terminal?.isOpen}
        isMinimized={windows?.terminal?.isMinimized}
        isMaximized={windows?.terminal?.isMaximized}
        zIndex={windows?.terminal?.zIndex || 10}
        onClose={onCloseWindow}
        onMinimize={onMinimizeWindow}
        onToggleMaximize={onToggleMaximizeWindow}
        onFocus={onFocusWindow}
      >
        <TerminalApp openApp={onOpenApp} />
      </WindowFrame>

      {/* WINDOW 4: Micro-Interaction Physics Sandbox */}
      <WindowFrame
        id="playground"
        title="Interaction_Lab.app — Physics & Token Sandbox"
        icon={Sliders}
        isOpen={windows?.playground?.isOpen}
        isMinimized={windows?.playground?.isMinimized}
        isMaximized={windows?.playground?.isMaximized}
        zIndex={windows?.playground?.zIndex || 10}
        onClose={onCloseWindow}
        onMinimize={onMinimizeWindow}
        onToggleMaximize={onToggleMaximizeWindow}
        onFocus={onFocusWindow}
      >
        <PlaygroundApp />
      </WindowFrame>

      {/* WINDOW 5: Contact Dispatcher */}
      <WindowFrame
        id="contact"
        title="Dispatch.app — Encrypted Comms Link"
        icon={Mail}
        isOpen={windows?.contact?.isOpen}
        isMinimized={windows?.contact?.isMinimized}
        isMaximized={windows?.contact?.isMaximized}
        zIndex={windows?.contact?.zIndex || 10}
        onClose={onCloseWindow}
        onMinimize={onMinimizeWindow}
        onToggleMaximize={onToggleMaximizeWindow}
        onFocus={onFocusWindow}
      >
        <ContactApp />
      </WindowFrame>
    </main>
  );
}
