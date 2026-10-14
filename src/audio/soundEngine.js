// High-Fidelity UI Sound Synthesizer via Web Audio API
// Synthesizes punchy mechanical clicks, airy hover ticks, chords, and keyboard taps
// Zero external audio files required!

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.muted = true; // Disabled by default for browser compliance & user preference
    this.listeners = [];

    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('rahil_portfolio_sound_enabled');
        if (saved !== null) {
          this.muted = saved !== 'true';
        }
      } catch {}

      // Automatically unlock AudioContext on first user interaction (browser policy compliant)
      const unlockAudio = () => {
        this.init();
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
      };
      window.addEventListener('click', unlockAudio);
      window.addEventListener('keydown', unlockAudio);
      window.addEventListener('touchstart', unlockAudio);
    }
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
          // Master gain node for overall volume control
          this.masterGain = this.ctx.createGain();
          this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
          this.masterGain.connect(this.ctx.destination);
        }
      } catch {}
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Get the output node (master gain or fallback to destination)
  get output() {
    return this.masterGain || (this.ctx && this.ctx.destination);
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(l => {
      try {
        l(this.muted);
      } catch {}
    });
  }

  toggleMute() {
    this.muted = !this.muted;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('rahil_portfolio_sound_enabled', (!this.muted).toString());
      } catch {}
    }
    this.notify();
    if (!this.muted) {
      this.init();
      this.playToggle(true);
    }
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  // Punchy tactile click for buttons and tabs — BOOSTED
  playClick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(960, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.05);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.output);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {}
  }

  // Crisp hover tick for cards and navigation — BOOSTED
  playHover() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(720, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.03);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(this.output);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {}
  }

  // Toggle chime — BOOSTED
  playToggle(turningOn = true) {
    if (this.muted && !turningOn) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const f1 = turningOn ? 440 : 660;
      const f2 = turningOn ? 880 : 330;

      [f1, f2].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.28, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.18);

        osc.connect(gain);
        gain.connect(this.output);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.18);
      });
    } catch {}
  }

  // Window/App Open Sound (Upward futuristic chime) — BOOSTED
  playOpen() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const freqs = [320, 480, 640];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        gain.gain.setValueAtTime(0.28, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.15);

        osc.connect(gain);
        gain.connect(this.output);

        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.15);
      });
    } catch {}
  }

  // Window Close Sound (Soft downward tap) — BOOSTED
  playClose() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const freqs = [520, 310];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        gain.gain.setValueAtTime(0.22, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.12);

        osc.connect(gain);
        gain.connect(this.output);

        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.12);
      });
    } catch {}
  }

  // Window Minimize Sound (Soft sweep down) — BOOSTED
  playMinimize() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.1);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.output);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {}
  }

  // Success arpeggio — BOOSTED
  playSuccess() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.25, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);

        osc.connect(gain);
        gain.connect(this.output);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.25);
      });
    } catch {}
  }

  // Keyboard typing tick — BOOSTED
  playKey() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const pitch = 1100 + Math.random() * 300;
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.exponentialRampToValueAtTime(350, now + 0.03);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(this.output);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {}
  }
}

export const sound = new SoundEngine();
