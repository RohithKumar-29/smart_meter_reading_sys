import React from 'react';
import type { Substation } from '../types';
import { Network, Server } from 'lucide-react';

interface SubstationGridPageProps {
  substations: Substation[];
}

export const SubstationGridPage: React.FC<SubstationGridPageProps> = ({ substations }) => {
  return (
    <div className="space-y-8 animate-fadeIn font-sans text-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-100 shadow-md">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Network className="w-6 h-6 text-emerald-600" />
            Substation & Feeder Grid Network Topology
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Primary 66kV/33kV transmission substations, downstream 11kV distribution feeders, and transformer health index.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-700 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
          <span>Active Substations: <strong className="text-emerald-600 font-bold">{substations.length}</strong></span>
        </div>
      </div>

      {/* Substation Cards Diagram */}
      <div className="space-y-6">
        {substations.map((sub) => (
          <div
            key={sub.id}
            className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-6"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600">
                  <Server className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald-700">{sub.code}</span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                        sub.status === 'NORMAL'
                          ? 'bg-emerald-100 text-emerald-800'
                          : sub.status === 'HEAVY_LOAD'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      ● {sub.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">{sub.name}</h3>
                </div>
              </div>

              <div className="flex items-center gap-6 font-mono text-xs text-right">
                <div>
                  <div className="text-slate-400 text-[10px] font-sans">Active Load / Capacity</div>
                  <div className="text-sm font-bold text-slate-900">{sub.currentLoadMw} MW / {sub.capacityMva} MVA</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] font-sans">Bus Voltage</div>
                  <div className="text-sm font-bold text-emerald-600">{sub.voltageKv} kV</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] font-sans">Transformers</div>
                  <div className="text-sm font-bold text-slate-800">{sub.transformerCount} Units</div>
                </div>
              </div>
            </div>

            {/* Load Capacity Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-500 font-sans">Substation Loading Utilization</span>
                <span className={`font-bold ${sub.loadPercentage > 85 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {sub.loadPercentage}% ({sub.currentLoadMw} MW)
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 p-0.5 border border-slate-200 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    sub.loadPercentage > 85
                      ? 'bg-rose-500'
                      : sub.loadPercentage > 70
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${sub.loadPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Connected Distribution Feeders */}
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 font-mono mb-3">
                Downstream 11kV Distribution Feeders ({sub.feeders.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sub.feeders.map((feeder) => (
                  <div
                    key={feeder.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-emerald-700">{feeder.feederCode}</span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          feeder.status === 'NORMAL'
                            ? 'bg-emerald-100 text-emerald-800'
                            : feeder.status === 'WARNING'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {feeder.status}
                      </span>
                    </div>

                    <div className="text-sm font-extrabold text-slate-900">{feeder.name}</div>

                    <div className="flex justify-between items-center text-xs font-mono text-slate-600 pt-1">
                      <span>Meters: <strong className="text-slate-900 font-bold">{feeder.connectedMetersCount}</strong></span>
                      <span>Load: <strong className="text-emerald-600 font-bold">{feeder.currentLoadMw} MW</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
