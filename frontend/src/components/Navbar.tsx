import React from 'react';
import { LogoIcon } from './LogoIcon';
import type { SmartMeter, Consumer } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  unreadAlertsCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  meters: SmartMeter[];
  consumers: Consumer[];
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  theme,
  setTheme,
  unreadAlertsCount
}) => {
  const navLinks = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'core-subjects', label: 'Five Core Subjects' },
    { id: 'project-features', label: 'Project Features' },
    { id: 'meters', label: 'Smart Meters' },
    { id: 'workflow', label: 'Grid Workflow' },
    { id: 'billing', label: 'Billing' },
    { id: 'alerts', label: 'Alerts', badge: unreadAlertsCount }
  ];

  const getSubHeaderLabel = () => {
    switch (activeTab) {
      case 'dashboard': return 'Live telemetry & grid operations';
      case 'core-subjects': return 'Five Core Computer Science Syllabus Applied in Smart Metering';
      case 'project-features': return 'Overall Project Features, Interactive Graphs & Billing Analytics in ₹';
      case 'meters': return 'Smart Meters directory';
      case 'workflow': return 'Grid Electricity Flow & Academic 8-Stage Execution Workflow';
      case 'billing': return 'Billing & Revenue analytics (Tariff ₹7.50 / kWh)';
      case 'alerts': return 'Incidents & Security Alerts';
      default: return 'Smart Meter Readings System';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-3 pb-1 font-sans transition-all bg-transparent backdrop-blur-md">
      {/* Transparent Floating Pill Capsule Navbar */}
      <div className="max-w-6xl mx-auto bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg rounded-full shadow-lg border border-slate-200/50 dark:border-slate-800/50 px-4 sm:px-6 py-2 flex items-center justify-between gap-3 text-slate-800 dark:text-slate-100 transition-all">
        
        {/* Left: EnergyWise Logo & Title */}
        <div
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer select-none shrink-0 group"
        >
          <div className="w-9 h-9 rounded-full bg-emerald-50/80 dark:bg-emerald-950/80 flex items-center justify-center transition-colors border border-emerald-200/50">
            <LogoIcon size={28} color="#10B981" />
          </div>
          <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white font-sans group-hover:text-emerald-600 transition-colors">
            Power Cell
          </span>
        </div>

        {/* Center: Module Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold overflow-x-auto py-0.5 px-1">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`relative px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-500 text-white font-bold shadow-md shadow-emerald-500/20'
                    : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/50'
                }`}
              >
                <span>{link.label}</span>
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.2 text-[9px] font-bold text-white bg-rose-500 rounded-full">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Side: Theme Switcher & Live demo Button */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Light / Dark / System Theme Switcher Pill */}
          <div className="hidden sm:flex items-center bg-slate-100/70 dark:bg-slate-800/70 p-1 rounded-full text-[11px] font-semibold text-slate-500 border border-slate-200/50 dark:border-slate-700/50">
            <button
              onClick={() => setTheme('light')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                theme === 'light'
                  ? 'bg-white text-emerald-600 font-bold shadow-sm'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-900 text-emerald-400 font-bold shadow-sm'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Dark
            </button>
            <button
              onClick={() => setTheme('system')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                theme === 'system'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              System
            </button>
          </div>
        </div>
      </div>

      {/* Sub-header Breadcrumb */}
      <div className="max-w-6xl mx-auto px-6 pt-2 flex items-center gap-2 text-xs font-black text-slate-900 dark:text-slate-100">
        <div className="flex items-center gap-1.5">
          <LogoIcon size={16} color="#10B981" />
          <span className="font-black text-slate-900 dark:text-white text-xs tracking-tight">Power Cell</span>
        </div>
        <span className="text-slate-600 dark:text-slate-400 font-extrabold">|</span>
        <span className="text-slate-900 dark:text-slate-100 font-extrabold">{getSubHeaderLabel()}</span>
      </div>
    </header>
  );
};
