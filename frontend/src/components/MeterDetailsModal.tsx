import React, { useState } from 'react';
import type { SmartMeter } from '../types';
import { X, Cpu, Wifi, Shield, ToggleLeft, ToggleRight, CheckCircle } from 'lucide-react';

interface MeterDetailsModalProps {
  meter: SmartMeter | null;
  onClose: () => void;
  onToggleBreaker: (meterId: string) => void;
}

export const MeterDetailsModal: React.FC<MeterDetailsModalProps> = ({
  meter,
  onClose,
  onToggleBreaker
}) => {
  if (!meter) return null;

  const [activeTab, setActiveTab] = useState<'telemetry' | 'diagnostics' | 'control'>('telemetry');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="glass-card-static w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold font-mono text-white">{meter.meterSerial}</h2>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold border ${
                    meter.status === 'ONLINE'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : meter.status === 'WARNING'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : meter.status === 'FAULT'
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  ● {meter.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{meter.consumerName} &bull; {meter.model}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/30 px-6 gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`py-3 border-b-2 transition-all ${
              activeTab === 'telemetry'
                ? 'border-cyan-400 text-cyan-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Real-Time Telemetry
          </button>
          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`py-3 border-b-2 transition-all ${
              activeTab === 'diagnostics'
                ? 'border-cyan-400 text-cyan-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Grid Connection & Hardware
          </button>
          <button
            onClick={() => setActiveTab('control')}
            className={`py-3 border-b-2 transition-all ${
              activeTab === 'control'
                ? 'border-cyan-400 text-cyan-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Remote Breaker Command
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'telemetry' && (
            <div className="space-y-6">
              {/* Telemetry Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                  <div className="text-xs text-slate-400 mb-1">Phase Voltage</div>
                  <div className="text-xl font-bold font-mono text-cyan-400">{meter.voltageV} V</div>
                  <div className="text-[10px] text-slate-400 mt-1">Nominal: 230V ±5%</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                  <div className="text-xs text-slate-400 mb-1">Current Load</div>
                  <div className="text-xl font-bold font-mono text-emerald-400">{meter.currentA} A</div>
                  <div className="text-[10px] text-slate-400 mt-1">Max Rating: 100A</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                  <div className="text-xs text-slate-400 mb-1">Active Power</div>
                  <div className="text-xl font-bold font-mono text-amber-400">{meter.activePowerKw} kW</div>
                  <div className="text-[10px] text-slate-400 mt-1">Instantaneous</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                  <div className="text-xs text-slate-400 mb-1">Power Factor</div>
                  <div className="text-xl font-bold font-mono text-indigo-400">{meter.powerFactor}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{meter.powerFactor >= 0.9 ? 'Excellent' : 'Sub-optimal'}</div>
                </div>
              </div>

              {/* Accumulation Stats */}
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <div className="text-xs text-slate-400">Total Lifetime Energy Register</div>
                  <div className="text-2xl font-extrabold font-mono text-white mt-0.5">{meter.totalKwh.toLocaleString()} <span className="text-sm font-normal text-cyan-400">kWh</span></div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Today's Consumption</div>
                  <div className="text-lg font-bold font-mono text-emerald-400">{meter.todayKwh} kWh</div>
                </div>
              </div>

              {/* Signal & Radio Status */}
              <div className="p-4 rounded-2xl bg-slate-800/30 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wifi className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="text-xs font-semibold text-slate-200">NB-IoT / Cellular Signal</div>
                    <div className="text-[11px] text-slate-400 font-mono">RSSI: {meter.signalStrengthDbm} dBm &bull; Ping: {meter.lastPingTime}</div>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-semibold">99.8% Uptime</span>
              </div>
            </div>
          )}

          {activeTab === 'diagnostics' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-2">
                  <div className="text-xs text-slate-400 font-medium">Substation Connection</div>
                  <div className="text-sm font-bold text-white">{meter.substationName}</div>
                  <div className="text-xs text-cyan-400 font-mono">{meter.feederName}</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-2">
                  <div className="text-xs text-slate-400 font-medium">Geo Location Coordinates</div>
                  <div className="text-sm font-bold text-white font-mono">{meter.latitude.toFixed(4)}° N, {meter.longitude.toFixed(4)}° E</div>
                  <div className="text-xs text-slate-400">Installation Date: {meter.installDate}</div>
                </div>
              </div>

              {/* Diagnostic Checklist */}
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Automated Self-Test</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Optical Port Tamper Sensor:</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> SECURE</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>EEPROM Memory Checksum:</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> PASSED</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Reverse Energy Flow Flag:</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> NORMAL</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'control' && (
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Remote Circuit Breaker Operation</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                  Instruct the Smart Meter internal relay to isolate or energize the consumer circuit remotely.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 inline-flex items-center gap-4">
                <span className="text-xs font-medium text-slate-400">Current Breaker State:</span>
                <span
                  className={`text-sm font-bold font-mono px-3 py-1 rounded-lg border ${
                    meter.remoteBreakerState === 'CLOSED'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  }`}
                >
                  {meter.remoteBreakerState === 'CLOSED' ? 'ENERGIZED (CLOSED)' : 'TRIPPED (OPEN)'}
                </span>
              </div>

              <div>
                <button
                  onClick={() => onToggleBreaker(meter.id)}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 mx-auto ${
                    meter.remoteBreakerState === 'CLOSED'
                      ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20'
                  }`}
                >
                  {meter.remoteBreakerState === 'CLOSED' ? (
                    <>
                      <ToggleRight className="w-5 h-5" /> Trip Breaker & Cut Power
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="w-5 h-5" /> Close Breaker & Restore Power
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>Meter ID: {meter.id}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-all"
          >
            Close Dialog
          </button>
        </div>
      </div>
    </div>
  );
};
