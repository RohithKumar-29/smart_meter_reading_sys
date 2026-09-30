import React, { useState } from 'react';
import { InteractiveEnergyChart } from '../components/InteractiveEnergyChart';
import { INITIAL_BILLS, INITIAL_METERS } from '../data/mockData';
import {
  Zap,
  BarChart3,
  Receipt,
  Cpu,
  Layers,
  TrendingUp,
  Activity,
  CheckCircle,
  Database,
  Search
} from 'lucide-react';

export const ProjectFeaturesPage: React.FC = () => {
  const [activeFeatureTab, setActiveFeatureTab] = useState<'all' | 'graphs' | 'bills' | 'tech'>('all');

  const totalRevenueRs = INITIAL_BILLS.reduce((acc, b) => acc + b.totalAmount, 0);
  const paidBillsCount = INITIAL_BILLS.filter((b) => b.status === 'PAID').length;
  const activeMetersCount = INITIAL_METERS.filter((m) => m.status === 'ONLINE').length;

  const featuresList = [
    {
      id: 'feat-1',
      category: 'graphs',
      title: 'Interactive Multi-Timescale Consumption Graphs',
      icon: BarChart3,
      badge: 'Visual Analytics',
      desc: 'Real-time interactive Chart.js bar graphs with dynamic Live (1s), Day (24h), Week (7d), and Month (30d) timescale switching. Animated bar growth, hover tooltips, and live telemetry rendering.'
    },
    {
      id: 'feat-2',
      category: 'bills',
      title: 'Automated Billing & Revenue Analytics in Rupees (₹)',
      icon: Receipt,
      badge: 'Tariff Rate: ₹7.50 / kWh',
      desc: 'Itemized electricity invoice generator calculating Energy Charges (Units × ₹7.50/kWh), Fixed Capacity Fees, and Taxes. Instant PDF-like bill summaries and status updates.'
    },
    {
      id: 'feat-3',
      category: 'tech',
      title: 'Academic 5 Core Subjects Syllabus Integration',
      icon: Layers,
      badge: 'B.Tech Syllabus',
      desc: 'Educational breakdown mapping DBMS 3NF entity schemas, DSA Merge Sort & Binary Search algorithms, Discrete Math Grid Graphs G=(V,E), Java OOP design, and Python ML 7-day Moving Average forecasting.'
    },
    {
      id: 'feat-4',
      category: 'tech',
      title: 'Frontend-Only LocalStorage Persistence',
      icon: Database,
      badge: 'Zero Backend Required',
      desc: 'Zero-latency browser data engine using JavaScript objects and HTML5 localStorage to maintain consumers, meter registers, transaction history, and billing records without external APIs.'
    },
    {
      id: 'feat-5',
      category: 'graphs',
      title: 'Live Telemetry & Breaker Circuit Commands',
      icon: Zap,
      badge: '3-Sec Live Stream',
      desc: 'Automated 3-second voltage, current, and active power jitter simulation with remote circuit breaker OPEN/CLOSE toggle control and fault isolation alerts.'
    },
    {
      id: 'feat-6',
      category: 'bills',
      title: 'Instant Consumer & Serial Lookup Algorithms',
      icon: Search,
      badge: 'O(log N) Search',
      desc: 'High-speed linear and binary search algorithms to instantly locate smart meter serial numbers, consumer profiles, and historical payment registers.'
    }
  ];

  const filteredFeatures = featuresList.filter((f) =>
    activeFeatureTab === 'all' ? true : f.category === activeFeatureTab
  );

  return (
    <div className="space-y-8 animate-fadeIn font-sans text-slate-800">
      {/* Page Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-100 shadow-md space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider font-mono">
            Overall System Architecture
          </span>
          <span className="text-xs text-slate-400 font-mono">&bull; Indian Standard Tariff ₹7.50 / kWh</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Smart Meter System Overall Features, Interactive Graphs & Revenue Bills
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed font-medium">
          Explore the complete feature suite of our frontend-only Smart Meter Readings System: high-performance Chart.js visual telemetry graphs, itemized bill generation in Indian Rupees (₹), and academic algorithms running smoothly in browser memory.
        </p>

        {/* Top Key Metrics in Rupees (₹) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-semibold">Total Revenue Generated</span>
              <h4 className="text-xl font-extrabold text-slate-900">₹{totalRevenueRs.toLocaleString('en-IN')}.00</h4>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-slate-800 text-white shadow-md">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-semibold">Active Online Smart Meters</span>
              <h4 className="text-xl font-extrabold text-slate-900">{activeMetersCount} / {INITIAL_METERS.length} Online</h4>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-slate-700 text-white shadow-md">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-semibold">Invoices Cleared (PAID)</span>
              <h4 className="text-xl font-extrabold text-slate-900">{paidBillsCount} Invoices Paid</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Consumption Chart Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-600" /> Interactive Telemetry & Energy Graphs
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Select time periods (Live, Day, Week, Month) to trigger smooth bar animations & telemetry updates.
            </p>
          </div>
        </div>

        {/* Embedded Interactive Chart Component */}
        <InteractiveEnergyChart />
      </div>

      {/* Feature Filter Tabs */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-600" /> Core System Capabilities
          </h3>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-full text-xs font-bold text-slate-600">
            <button
              onClick={() => setActiveFeatureTab('all')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                activeFeatureTab === 'all'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'hover:text-slate-900'
              }`}
            >
              All Features
            </button>
            <button
              onClick={() => setActiveFeatureTab('graphs')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                activeFeatureTab === 'graphs'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'hover:text-slate-900'
              }`}
            >
              Graphs & Charts
            </button>
            <button
              onClick={() => setActiveFeatureTab('bills')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                activeFeatureTab === 'bills'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'hover:text-slate-900'
              }`}
            >
              Rupee Invoices (₹)
            </button>
            <button
              onClick={() => setActiveFeatureTab('tech')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                activeFeatureTab === 'tech'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'hover:text-slate-900'
              }`}
            >
              Academic Tech
            </button>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map((feat) => {
            const IconComp = feat.icon;
            return (
              <div
                key={feat.id}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-mono font-bold">
                      {feat.badge}
                    </span>
                  </div>
                  <h4 className="text-lg font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-600 font-bold">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-emerald-500" /> Active System Module
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Itemized Rupee Bills Demonstration Table */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-extrabold text-emerald-600 uppercase tracking-widest">
              Financial Registers
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              Sample Electricity Invoices & Billing Records in Rupees (₹)
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Calculated automatically using standard electricity tariff of ₹7.50 per kWh.
            </p>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono font-extrabold text-xs">
            Standard Tariff: ₹7.50 / kWh
          </div>
        </div>

        {/* Invoices Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[10px] border-b border-slate-100">
              <tr>
                <th className="p-3.5">Invoice No</th>
                <th className="p-3.5">Consumer Name</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5 text-right">Units (kWh)</th>
                <th className="p-3.5 text-right">Energy Charge (₹)</th>
                <th className="p-3.5 text-right">Total Payable (₹)</th>
                <th className="p-3.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {INITIAL_BILLS.map((bill) => (
                <tr key={bill.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-slate-900">{bill.invoiceNo}</td>
                  <td className="p-3.5 font-semibold text-slate-900">{bill.consumerName}</td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px] font-bold">
                      {bill.category}
                    </span>
                  </td>
                  <td className="p-3.5 text-right font-mono font-bold">{bill.unitsConsumedKwh.toLocaleString('en-IN')} kWh</td>
                  <td className="p-3.5 text-right font-mono text-emerald-600 font-bold">₹{bill.energyCharge.toLocaleString('en-IN')}.00</td>
                  <td className="p-3.5 text-right font-mono font-black text-slate-900 text-sm">₹{bill.totalAmount.toLocaleString('en-IN')}.00</td>
                  <td className="p-3.5 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono ${
                        bill.status === 'PAID'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {bill.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
