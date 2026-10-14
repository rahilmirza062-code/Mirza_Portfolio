import React, { useState, useEffect } from 'react';
import { Music, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { sound } from '../../audio/soundEngine';

export default function SynthDeckApp() {
  const [activeKey, setActiveKey] = useState(null);
  const [octave, setOctave] = useState(4);
  const [isMuted, setIsMuted] = useState(sound.isMuted());

  useEffect(() => {
    const unsub = sound.subscribe((muted) => setIsMuted(muted));
    return () => {
      unsub();
      // Clean up state when unmounting
      setActiveKey(null);
    };
  }, []);

  const notes = [
    { note: 'C', key: 'A', freq: 261.63 },
    { note: 'D', key: 'S', freq: 293.66 },
    { note: 'E', key: 'D', freq: 329.63 },
    { note: 'F', key: 'F', freq: 349.23 },
    { note: 'G', key: 'G', freq: 392.00 },
    { note: 'A', key: 'H', freq: 440.00 },
    { note: 'B', key: 'J', freq: 493.88 },
    { note: 'C5', key: 'K', freq: 523.25 },
  ];

  const playNote = (baseFreq, noteName) => {
    if (sound.isMuted()) {
      sound.toggleMute();
      setIsMuted(false);
    }
    setActiveKey(noteName);
    const multiplier = Math.pow(2, octave - 4);
    sound.playNote(baseFreq * multiplier, 0.28);
    setTimeout(() => setActiveKey(null), 250);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typing into an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const match = notes.find(n => n.key.toLowerCase() === e.key.toLowerCase());
      if (match) {
        playNote(match.freq, match.note);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [octave]);

  return (
    <div className="h-full bg-[#0a0c14] text-slate-100 p-4 sm:p-6 flex flex-col justify-between select-none overflow-y-auto">
      {/* Top Header */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10 mb-3">
          <div className="flex items-center gap-2">
            <Music size={16} className="text-cyan-400 shrink-0" />
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-white tracking-wide">Rahil Waveform Synthesizer</h2>
              <span className="text-[10px] font-mono text-cyan-400">Zero-latency Web Audio API Synth</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio State Badge & Toggle */}
            <button
              onClick={() => {
                const muted = sound.toggleMute();
                setIsMuted(muted);
              }}
              className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono border transition-all ${
                !isMuted
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              }`}
              title="Click to toggle audio"
            >
              {!isMuted ? <Volume2 size={12} /> : <VolumeX size={12} />}
              <span className="text-[10px] font-semibold">{!isMuted ? 'AUDIO ON' : 'AUDIO OFF'}</span>
            </button>

            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono text-slate-400">Octave:</span>
              <div className="flex gap-1">
                {[3, 4, 5].map((oct) => (
                  <button
                    key={oct}
                    onClick={() => { sound.playClick(); setOctave(oct); }}
                    className={`w-6 h-6 rounded text-xs font-mono transition-colors ${
                      octave === oct ? 'bg-cyan-500 text-black font-bold' : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    {oct}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400 mb-4 font-mono leading-relaxed">
          Click keys or press keyboard keys <span className="text-cyan-300 font-bold">[A, S, D, F, G, H, J, K]</span> to trigger chords.
        </p>

        {/* The Interactive Piano Keyboard — Responsive & scrollable on small screens */}
        <div className="w-full max-w-xl mx-auto p-2 sm:p-4 rounded-2xl bg-black/60 border border-white/10 shadow-2xl overflow-x-auto">
          <div className="flex justify-center items-end gap-1 sm:gap-1.5 min-w-[300px]">
            {notes.map((item) => {
              const isActive = activeKey === item.note;
              return (
                <button
                  key={item.note}
                  type="button"
                  onMouseDown={() => playNote(item.freq, item.note)}
                  className={`relative flex-1 min-w-[32px] sm:min-w-[42px] h-28 sm:h-36 rounded-b-xl flex flex-col justify-between items-center py-2 sm:py-3 transition-all duration-75 select-none focus:outline-none ${
                    isActive
                      ? 'bg-gradient-to-t from-cyan-400 to-blue-500 text-black shadow-lg shadow-cyan-500/50 scale-y-95'
                      : 'bg-white/[0.08] hover:bg-white/[0.14] text-slate-200 border-t-2 border-white/20'
                  }`}
                >
                  <span className={`text-[9px] sm:text-[10px] font-mono font-bold px-1 sm:px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-black text-cyan-300' : 'bg-black/40 text-slate-400'
                  }`}>
                    {item.key}
                  </span>

                  <div className="text-center">
                    <span className="text-[11px] sm:text-xs font-bold font-mono block">{item.note}</span>
                    <span className="text-[8px] sm:text-[9px] opacity-60 font-mono block">
                      {Math.round(item.freq * Math.pow(2, octave - 4))}Hz
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Synth Deck Footer */}
      <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs font-mono text-slate-400 mt-4">
        <span className="flex items-center gap-1.5">
          <Sparkles size={13} className="text-cyan-400" /> Pure JavaScript Math Oscillators
        </span>
        <span className="text-slate-500">Synced to Global Audio</span>
      </div>
    </div>
  );
}
