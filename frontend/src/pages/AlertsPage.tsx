import type { Alert } from '../types';
import { AlertTriangle, ShieldAlert, CheckCircle, Check } from 'lucide-react';

interface AlertsPageProps {
  alerts: Alert[];
  onAcknowledge: (alertId: string) => void;
  onResolve: (alertId: string) => void;
}

export const AlertsPage: React.FC<AlertsPageProps> = ({
  alerts,
  onAcknowledge,
  onResolve
}) => {
  return (
    <div className="space-y-6 animate-fadeIn font-sans text-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-100 shadow-md">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-rose-600" />
            Grid Anomalies & Security Alert Center
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Tamper detection logs, transformer thermal warnings, phase imbalance, and automated breaker actions.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-700 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
          <span>Active Incident Flags: <strong className="text-rose-600 font-bold">{alerts.filter(a => a.status === 'ACTIVE').length}</strong></span>
        </div>
      </div>

      {/* Alerts Feed List */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-6 rounded-3xl border shadow-md transition-all ${
              alert.severity === 'CRITICAL'
                ? 'border-rose-200 bg-rose-50/40'
                : alert.severity === 'WARNING'
                ? 'border-amber-200 bg-amber-50/30'
                : 'border-slate-100 bg-white'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div
                  className={`p-3.5 rounded-2xl border shrink-0 ${
                    alert.severity === 'CRITICAL'
                      ? 'bg-rose-100 text-rose-700 border-rose-200'
                      : alert.severity === 'WARNING'
                      ? 'bg-amber-100 text-amber-700 border-amber-200'
                      : 'bg-emerald-100 text-emerald-700 border-emerald-200'
                  }`}
                >
                  <ShieldAlert className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-500">{alert.code}</span>
                    <span
                      className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                        alert.severity === 'CRITICAL'
                          ? 'bg-rose-100 text-rose-800'
                          : alert.severity === 'WARNING'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {alert.severity}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">&bull; {alert.timestamp}</span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900">{alert.title}</h3>
                  <p className="text-xs text-slate-600 max-w-2xl leading-relaxed font-medium">{alert.message}</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center font-sans">
                {alert.status === 'ACTIVE' && (
                  <button
                    onClick={() => onAcknowledge(alert.id)}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all border border-slate-200 cursor-pointer"
                  >
                    Acknowledge
                  </button>
                )}

                {alert.status !== 'RESOLVED' && (
                  <button
                    onClick={() => onResolve(alert.id)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" /> Resolve Incident
                  </button>
                )}

                {alert.status === 'RESOLVED' && (
                  <span className="text-xs font-mono text-emerald-700 font-bold flex items-center gap-1 px-3.5 py-2 bg-emerald-50 rounded-xl border border-emerald-200">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> RESOLVED
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
