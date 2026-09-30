import React from 'react';
import { X, Calendar as CalendarIcon, Clock, CheckCircle2 } from 'lucide-react';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-5 text-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Grid System Date & Schedule</h3>
              <p className="text-xs text-slate-400">Real-time sync clock</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Date Display */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/60 to-slate-900 border border-cyan-500/30 text-center space-y-2">
          <div className="text-xs text-cyan-400 font-mono uppercase tracking-wider font-semibold">Current System Date</div>
          <div className="text-3xl font-extrabold font-mono text-white tracking-tight">19-07-2026</div>
          <div className="text-xs text-slate-300 font-semibold uppercase">SUNDAY &bull; 09:30 AM IST</div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-800">
            <span className="text-slate-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" /> Automated Billing Cycle:
            </span>
            <span className="font-mono text-emerald-400 font-bold">1st of Every Month</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-800">
            <span className="text-slate-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Time Synchronization:
            </span>
            <span className="font-mono text-white font-bold">NTP Server Locked</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-all shadow-lg shadow-cyan-600/20"
        >
          Close Calendar
        </button>
      </div>
    </div>
  );
};
