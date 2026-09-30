import React from 'react';
import type { SmartMeter } from '../types';
import { InteractiveEnergyChart } from '../components/InteractiveEnergyChart';
import { DashboardAnalyticsSection } from '../components/DashboardAnalyticsSection';
import {
  Zap,
  Cpu,
  ArrowRight
} from 'lucide-react';

interface DashboardProps {
  meters: SmartMeter[];
  onSelectTab: (tab: string) => void;
  onSelectMeter: (meter: SmartMeter) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  meters,
  onSelectTab,
  onSelectMeter
}) => {
  const totalMeters = meters.length;

  const scrollToAnalytics = () => {
    const el = document.getElementById('dashboard-analytics-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn font-sans">
      {/* Hero Landing Section matching EnergyWise screenshots */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-4 sm:py-8">
        
        {/* Left Side: Hero Headline & CTA matching reference screenshots */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
              POWER MONITORING GATEWAY
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15] font-sans">
            Your power, from a{' '}
            <span className="relative inline-block text-emerald-600 dark:text-emerald-400 font-black">
              single second
              {/* Hand-drawn style emerald green underline matching reference screenshots */}
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-emerald-500 overflow-visible"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 12 Q 25 2, 50 12 T 100 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span>{' '}
            to the full month.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-xl font-normal">
            Power Cell reads the electricity at your panel in real time. Watch load as it happens, understand it across any timescale, and act on demand charges, voltage faults and wasted units before they reach your bill.
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={scrollToAnalytics}
              className="px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
            >
              <span>Live demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectTab('core-subjects')}
              className="px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-extrabold text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Explore 5 core subjects</span>
              <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </button>
          </div>
        </div>

        {/* Right Side: Interactive Animated Chart Card matching screenshots */}
        <div className="lg:col-span-5 w-full">
          <InteractiveEnergyChart initialTimescale="week" />
        </div>
      </div>

      {/* 4 Bottom Feature KPI Stat Cards with Smart Meter Readings content */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-100/90 dark:border-slate-800 space-y-1">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">664,910 kWh</div>
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-400 uppercase tracking-wider font-mono">Smart Meter Readings</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Total cumulative grid consumption</div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-100/90 dark:border-slate-800 space-y-1">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">238V · 84A</div>
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-400 uppercase tracking-wider font-mono">Meter Telemetry</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">238.2V · 0.93pf · 50.0Hz</div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-100/90 dark:border-slate-800 space-y-1">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">₹7.50 / kWh</div>
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-400 uppercase tracking-wider font-mono">Billing Tariff Rate</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Automated unit calculation</div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-100/90 dark:border-slate-800 space-y-1">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">{totalMeters} Active</div>
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-400 uppercase tracking-wider font-mono">Online Smart Meters</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Real-time panel updates</div>
        </div>
      </div>

      {/* Grid Telemetry & Operational Dashboard Section */}
      <div className="pt-6 space-y-8">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Zap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              SmartGrid Utilities Telemetry & Operations
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Real-time meter readings, feeder health, and incident alerts</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectTab('core-subjects')}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Five Core Subjects</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </button>
          </div>
        </div>

        {/* Live Meter Telemetry Stream Feed Table */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-600" />
                Live Smart Meter Telemetry Stream
              </h3>
              <p className="text-xs text-slate-400">Automatic meter reading (AMR) telemetry events</p>
            </div>

            <button
              onClick={() => onSelectTab('meters')}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-emerald-700 transition-all cursor-pointer"
            >
              View All {totalMeters} Meters &rarr;
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="text-xs uppercase bg-slate-50 text-slate-500 font-mono">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">Meter Serial</th>
                  <th className="px-4 py-3">Consumer</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Voltage (V)</th>
                  <th className="px-4 py-3">Current (A)</th>
                  <th className="px-4 py-3">Active Power</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-r-xl text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-xs">
                {meters.slice(0, 5).map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50 transition-all">
                    <td className="px-4 py-3.5 font-bold text-emerald-700">{m.meterSerial}</td>
                    <td className="px-4 py-3.5 font-sans font-medium text-slate-900">{m.consumerName}</td>
                    <td className="px-4 py-3.5 font-sans">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px] font-semibold">
                        {m.category}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-800">{m.voltageV} V</td>
                    <td className="px-4 py-3.5 text-emerald-600 font-bold">{m.currentA} A</td>
                    <td className="px-4 py-3.5 text-slate-900 font-bold">{m.activePowerKw} kW</td>
                    <td className="px-4 py-3.5 font-sans">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          m.status === 'ONLINE'
                            ? 'bg-emerald-100 text-emerald-700'
                            : m.status === 'WARNING'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        ● {m.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right font-sans">
                      <button
                        onClick={() => onSelectMeter(m)}
                        className="px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs transition-all cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Electricity Consumption Analytics & Moving-Average Load Forecasting Section */}
      <DashboardAnalyticsSection meters={meters} />
    </div>
  );
};
