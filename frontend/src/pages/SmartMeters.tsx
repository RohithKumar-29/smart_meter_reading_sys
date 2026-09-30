import React, { useState } from 'react';
import type { SmartMeter } from '../types';
import { Cpu, Search, Filter, Signal, Eye, Power } from 'lucide-react';

interface SmartMetersProps {
  meters: SmartMeter[];
  onSelectMeter: (meter: SmartMeter) => void;
  onToggleBreaker: (meterId: string) => void;
}

export const SmartMeters: React.FC<SmartMetersProps> = ({
  meters,
  onSelectMeter,
  onToggleBreaker
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const filteredMeters = meters.filter((m) => {
    const matchesSearch =
      m.meterSerial.toLowerCase().includes(search.toLowerCase()) ||
      m.consumerName.toLowerCase().includes(search.toLowerCase()) ||
      m.model.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || m.status === statusFilter;
    const matchesCategory = categoryFilter === 'ALL' || m.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fadeIn font-sans text-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-100 shadow-md">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Cpu className="w-6 h-6 text-emerald-600" />
            Smart Meters Telemetry Directory
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Monitor, inspect, and remotely command bidirectional smart meters across all substation grid feeders.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-700 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
          <span>Total Meters: <strong className="text-emerald-600 font-bold">{meters.length}</strong></span>
          <span>&bull;</span>
          <span>Online: <strong className="text-emerald-600 font-bold">{meters.filter(m => m.status === 'ONLINE').length}</strong></span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-3xl bg-white border border-slate-100 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by serial, consumer, or model..."
            className="w-full bg-slate-50 border border-slate-200 rounded-full pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/30 font-sans"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="ONLINE">ONLINE</option>
              <option value="WARNING">WARNING</option>
              <option value="OFFLINE">OFFLINE</option>
              <option value="FAULT">FAULT</option>
            </select>
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">All Categories</option>
            <option value="RESIDENTIAL">Residential</option>
            <option value="COMMERCIAL">Commercial</option>
            <option value="INDUSTRIAL">Industrial</option>
          </select>
        </div>
      </div>

      {/* Smart Meters Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMeters.map((meter) => (
          <div
            key={meter.id}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-emerald-700">{meter.meterSerial}</span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        meter.status === 'ONLINE'
                          ? 'bg-emerald-100 text-emerald-800'
                          : meter.status === 'WARNING'
                          ? 'bg-amber-100 text-amber-800'
                          : meter.status === 'FAULT'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {meter.status}
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900 mt-1">{meter.consumerName}</h4>
                  <p className="text-xs text-slate-500 font-medium">{meter.feederName}</p>
                </div>

                <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600">
                  <Signal className="w-4 h-4" />
                </div>
              </div>

              {/* Telemetry quick metrics */}
              <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-2xl bg-slate-50 border border-slate-100 font-mono text-center">
                <div>
                  <div className="text-[10px] text-slate-400 font-sans">Voltage</div>
                  <div className="text-xs font-bold text-slate-800">{meter.voltageV}V</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-sans">Current</div>
                  <div className="text-xs font-bold text-emerald-600">{meter.currentA}A</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-sans">Active Power</div>
                  <div className="text-xs font-bold text-slate-900">{meter.activePowerKw}kW</div>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-600 font-mono">
                <span>Total: <strong className="text-slate-900 font-bold">{meter.totalKwh.toLocaleString()} kWh</strong></span>
                <span>Breaker: <strong className={meter.remoteBreakerState === 'CLOSED' ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>{meter.remoteBreakerState}</strong></span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => onSelectMeter(meter)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-emerald-600" /> Inspect
              </button>

              <button
                onClick={() => onToggleBreaker(meter.id)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  meter.remoteBreakerState === 'CLOSED'
                    ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                }`}
                title="Toggle Remote Circuit Breaker"
              >
                <Power className="w-3.5 h-3.5" />
                {meter.remoteBreakerState === 'CLOSED' ? 'Cut Power' : 'Restore'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
