import React, { useState, useEffect, Component } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Terminal from './components/Terminal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CanvasBackground from './components/CanvasBackground';
import ScrollProgress from './components/ScrollProgress';

import MenuBar from './components/MenuBar';
import Desktop from './components/Desktop';
import Dock from './components/Dock';
import WindowFrame from './components/WindowFrame';
import ProjectsApp from './components/apps/ProjectsApp';
import AboutApp from './components/apps/AboutApp';
import TerminalApp from './components/apps/TerminalApp';
import PlaygroundApp from './components/apps/PlaygroundApp';
import ContactApp from './components/apps/ContactApp';

import { Layers, User, Terminal as TerminalIcon, Sliders, Mail } from 'lucide-react';
import { sound } from './audio/soundEngine';
import { useTheme } from './context/ThemeContext';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Portfolio ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#080a10] text-slate-100 flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md p-6 rounded-2xl bg-[#0e121e] border border-cyan-500/30 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono text-xl mx-auto">
              !
            </div>
            <h1 className="text-xl font-bold text-white">Application Encountered an Issue</h1>
            <p className="text-xs text-slate-400 font-mono leading-relaxed">
              {this.state.error?.message || 'An unexpected rendering error occurred.'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors font-mono"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [viewMode, setViewMode] = useState('web'); // 'web' or 'os'
  const [currentTheme, setCurrentTheme] = useState('midnight');
  const [activeWindow, setActiveWindow] = useState(null);
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const { isDark } = useTheme();

  const [windows, setWindows] = useState({
    projects: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    about: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    terminal: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    playground: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    contact: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
  });

  const [topZ, setTopZ] = useState(25);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleOpenApp = (id) => {
    sound.playOpen();
    const nextZ = topZ + 1;
    setTopZ(nextZ);
    setActiveWindow(id);
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ,
        },
      };
    });
  };

  const handleCloseWindow = (id) => {
    sound.playClose();
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
      },
    }));
    setActiveWindow((current) => {
      if (current !== id) return current;
      // Focus next open window if any
      const remaining = Object.entries(windows)
        .filter(([key, win]) => key !== id && win.isOpen && !win.isMinimized)
        .sort((a, b) => b[1].zIndex - a[1].zIndex);
      return remaining.length > 0 ? remaining[0][0] : null;
    });
  };

  const handleMinimizeWindow = (id) => {
    sound.playMinimize();
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: true,
      },
    }));
    setActiveWindow((current) => {
      if (current !== id) return current;
      const remaining = Object.entries(windows)
        .filter(([key, win]) => key !== id && win.isOpen && !win.isMinimized)
        .sort((a, b) => b[1].zIndex - a[1].zIndex);
      return remaining.length > 0 ? remaining[0][0] : null;
    });
  };

  const handleToggleMaximizeWindow = (id) => {
    sound.playClick();
    const nextZ = topZ + 1;
    setTopZ(nextZ);
    setActiveWindow(id);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id]?.isMaximized,
        zIndex: nextZ,
      },
    }));
  };

  const handleFocusWindow = (id) => {
    if (activeWindow === id) return;
    const nextZ = topZ + 1;
    setTopZ(nextZ);
    setActiveWindow(id);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        zIndex: nextZ,
      },
    }));
  };

  const handleDockClick = (id) => {
    const win = windows[id];
    if (!win) return;
    if (!win.isOpen) {
      // Opening an application shows its window
      handleOpenApp(id);
    } else if (win.isMinimized) {
      // Clicking a minimized application's icon restores it
      sound.playOpen();
      const nextZ = topZ + 1;
      setTopZ(nextZ);
      setActiveWindow(id);
      setWindows((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          isMinimized: false,
          zIndex: nextZ,
        },
      }));
    } else {
      // Clicking an already open application's dock icon brings its window to the front
      sound.playClick();
      const nextZ = topZ + 1;
      setTopZ(nextZ);
      setActiveWindow(id);
      setWindows((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          isMinimized: false,
          zIndex: nextZ,
        },
      }));
    }
  };

  const handleToggleMode = () => {
    sound.playSuccess();
    setViewMode((prev) => (prev === 'web' ? 'os' : 'web'));
  };

  return (
    <ErrorBoundary>
      <div className={`min-h-screen relative selection:bg-cyan-500/30 selection:text-cyan-200 transition-colors duration-300 ${
        isDark ? 'bg-[#080a10] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
      }`}>
        {/* Scroll Progress Bar at the Top of Viewport */}
        <ScrollProgress />

        {/* Background Canvas Particles */}
        <CanvasBackground />

        {/* Subtle Desktop Pointer Glow */}
        {!isTouchDevice && (
          <div
            className="pointer-events-none fixed -inset-px z-30 transition-opacity duration-300 opacity-50"
            style={{
              background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, ${
                isDark ? 'rgba(56, 189, 248, 0.05)' : 'rgba(2, 132, 199, 0.04)'
              }, transparent 80%)`,
            }}
          />
        )}

        {/* MODE 1: RETRO / DESKTOP OS MODE */}
        {viewMode === 'os' ? (
          <div className="min-h-screen flex flex-col relative z-20">
            <MenuBar
              activeWindow={activeWindow}
              currentTheme={currentTheme}
              onSelectTheme={setCurrentTheme}
              openApp={handleOpenApp}
              onToggleMode={handleToggleMode}
            />

            <Desktop
              windows={windows}
              onCloseWindow={handleCloseWindow}
              onMinimizeWindow={handleMinimizeWindow}
              onToggleMaximizeWindow={handleToggleMaximizeWindow}
              onFocusWindow={handleFocusWindow}
              onOpenApp={handleOpenApp}
            />

            {/* Pinned Application Dock */}
            <Dock 
              openWindows={windows} 
              onOpenApp={handleOpenApp}
              activeWindow={activeWindow}
              onDockClick={handleDockClick}
            />
          </div>
        ) : (
          /* MODE 2: PROFESSIONAL MODERN WEB PORTFOLIO */
          <div className="relative z-10 flex flex-col">
            {/* Sticky Header Navigation with Mode Switcher & Sound Toggle */}
            <Navbar onToggleMode={handleToggleMode} viewMode={viewMode} />

            {/* Main Content Sections */}
            <main className="relative z-10 flex flex-col pb-24">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Terminal />
              <Contact />
            </main>

            {/* Floating Window Layer when apps are launched from the Dock */}
            <div className="fixed inset-0 pointer-events-none z-40">
              <div className="pointer-events-auto">
                <WindowFrame
                  id="projects"
                  title="Projects.app — Mirza Rahil Systems Portfolio"
                  icon={Layers}
                  isOpen={windows?.projects?.isOpen}
                  isMinimized={windows?.projects?.isMinimized}
                  isMaximized={windows?.projects?.isMaximized}
                  zIndex={windows?.projects?.zIndex || 20}
                  onClose={handleCloseWindow}
                  onMinimize={handleMinimizeWindow}
                  onToggleMaximize={handleToggleMaximizeWindow}
                  onFocus={handleFocusWindow}
                >
                  <ProjectsApp />
                </WindowFrame>

                <WindowFrame
                  id="about"
                  title="About_Rahil.app — Creative Developer Dossier"
                  icon={User}
                  isOpen={windows?.about?.isOpen}
                  isMinimized={windows?.about?.isMinimized}
                  isMaximized={windows?.about?.isMaximized}
                  zIndex={windows?.about?.zIndex || 20}
                  onClose={handleCloseWindow}
                  onMinimize={handleMinimizeWindow}
                  onToggleMaximize={handleToggleMaximizeWindow}
                  onFocus={handleFocusWindow}
                >
                  <AboutApp openApp={handleOpenApp} />
                </WindowFrame>

                <WindowFrame
                  id="terminal"
                  title="Terminal.sh — rahil@workstation:~"
                  icon={TerminalIcon}
                  isOpen={windows?.terminal?.isOpen}
                  isMinimized={windows?.terminal?.isMinimized}
                  isMaximized={windows?.terminal?.isMaximized}
                  zIndex={windows?.terminal?.zIndex || 20}
                  onClose={handleCloseWindow}
                  onMinimize={handleMinimizeWindow}
                  onToggleMaximize={handleToggleMaximizeWindow}
                  onFocus={handleFocusWindow}
                >
                  <TerminalApp openApp={handleOpenApp} />
                </WindowFrame>

                <WindowFrame
                  id="playground"
                  title="Interaction_Lab.app — Physics & Token Sandbox"
                  icon={Sliders}
                  isOpen={windows?.playground?.isOpen}
                  isMinimized={windows?.playground?.isMinimized}
                  isMaximized={windows?.playground?.isMaximized}
                  zIndex={windows?.playground?.zIndex || 20}
                  onClose={handleCloseWindow}
                  onMinimize={handleMinimizeWindow}
                  onToggleMaximize={handleToggleMaximizeWindow}
                  onFocus={handleFocusWindow}
                >
                  <PlaygroundApp />
                </WindowFrame>

                <WindowFrame
                  id="contact"
                  title="Dispatch.app — Encrypted Comms Link"
                  icon={Mail}
                  isOpen={windows?.contact?.isOpen}
                  isMinimized={windows?.contact?.isMinimized}
                  isMaximized={windows?.contact?.isMaximized}
                  zIndex={windows?.contact?.zIndex || 20}
                  onClose={handleCloseWindow}
                  onMinimize={handleMinimizeWindow}
                  onToggleMaximize={handleToggleMaximizeWindow}
                  onFocus={handleFocusWindow}
                >
                  <ContactApp />
                </WindowFrame>
              </div>
            </div>

            {/* Quick Interactive App Dock */}
            <Dock 
              openWindows={windows} 
              onOpenApp={handleOpenApp}
              activeWindow={activeWindow}
              onDockClick={handleDockClick}
            />

            {/* Footer */}
            <Footer />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
