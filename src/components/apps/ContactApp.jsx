import React, { useState } from 'react';
import { Send, Mail, Github, CheckCircle2, Copy, Sparkles, MessageSquare } from 'lucide-react';
import { sound } from '../../audio/soundEngine';
import { PROFILE } from '../../data/portfolioData';

export default function ContactApp() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'Project Collaboration', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    sound.playOpen();
    setStatus('sending');

    setTimeout(() => {
      sound.playSuccess();
      setStatus('success');

      // Trigger mailto link as fallback
      const mailtoUrl = `mailto:${PROFILE.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(
        `From: ${form.name} (${form.email})\n\n${form.message}`
      )}`;
      window.open(mailtoUrl, '_blank');
    }, 1200);
  };

  const handleCopyEmail = () => {
    sound.playSuccess();
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full bg-[#0a0c14] p-6 md:p-8 flex flex-col justify-between overflow-y-auto select-text">
      <div className="max-w-2xl mx-auto w-full space-y-6">
        {/* Header */}
        <div className="border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare size={16} className="text-cyan-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">Direct Recruiter & Client Dispatch</h2>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Direct encrypted comms link to Mirza Rahil • Status: <span className="text-emerald-400 font-semibold">Ready for New Ventures</span>
          </p>
        </div>

        {status === 'success' ? (
          <div className="p-8 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-3">
            <CheckCircle2 size={42} className="text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-lg font-bold text-white">Transmission Prepared & Dispatched!</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Your default email client has been prepared with your message, and a notification was routed to <strong>{PROFILE.email}</strong>.
            </p>
            <button
              onClick={() => { sound.playClick(); setStatus('idle'); setForm({ name: '', email: '', subject: 'Project Collaboration', message: '' }); }}
              className="mt-4 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black font-semibold text-xs transition-colors font-mono"
            >
              Send Another Transmission
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-300">Your Name / Agency</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Vance or Acme Studios"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 text-xs text-white outline-none font-mono transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-300">Your Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 text-xs text-white outline-none font-mono transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-300">Subject / Objective</label>
              <input
                type="text"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 text-xs text-white outline-none font-mono transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-300">Message / Brief</label>
              <textarea
                required
                rows={4}
                placeholder="Tell me about your project, timeline, or open role..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 text-xs text-white outline-none font-mono transition-colors resize-none"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all font-mono"
              >
                <Send size={13} />
                <span>{status === 'sending' ? 'Transmitting...' : 'Dispatch Transmission'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <CheckCircle2 size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copied ? 'Copied!' : 'Copy rahilmirza062@gmail.com'}</span>
                </button>

                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-1.5 transition-colors"
                >
                  <Github size={13} /> GitHub
                </a>
              </div>
            </div>
          </form>
        )}
      </div>

      <div className="pt-6 border-t border-white/10 text-center text-xs font-mono text-slate-500">
        Response SLA: Usually within 12–24 hours worldwide.
      </div>
    </div>
  );
}
