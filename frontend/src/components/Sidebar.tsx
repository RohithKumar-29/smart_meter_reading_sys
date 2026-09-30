import React from 'react';
import {
  LayoutDashboard,
  Cpu,
  Users,
  TrendingUp,
  Network,
  Receipt,
  AlertTriangle,
  Zap
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  metersCount: number;
  alertCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  metersCount,
  alertCount
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Grid Overview', icon: LayoutDashboard },
    { id: 'meters', label: 'Smart Meters', icon: Cpu, badge: metersCount },
    { id: 'consumers', label: 'Consumers', icon: Users },
    { id: 'analytics', label: 'Demand Forecasting', icon: TrendingUp, highlight: 'AI' },
    { id: 'grid', label: 'Substation Grid', icon: Network },
    { id: 'billing', label: 'Billing & Tariffs', icon: Receipt },
    { id: 'alerts', label: 'Anomalies & Alerts', icon: AlertTriangle, badge: alertCount, badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40' }
  ];

  return (
    <aside className="w-64 glass-panel border-r border-slate-800/80 flex flex-col justify-between p-4 hidden md:flex shrink-0">
      <div className="space-y-6">
        <div>
          <div className="px-3 mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
            Navigation Menu
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-950/80 to-slate-900 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-xs font-mono px-2 py-0.5 rounded-md border ${
                        item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.highlight && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {item.highlight}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Grid Metric Card inside Sidebar */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 to-cyan-950/40 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Grid Active Load</span>
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white">
            106.4 <span className="text-xs font-normal text-slate-400">MW</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full w-[66%] rounded-full"></div>
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>Capacity: 160 MW</span>
            <span className="text-cyan-400 font-semibold">66.5%</span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-800/80 space-y-2">
        <div className="px-3 py-2 rounded-xl bg-slate-900/50 border border-slate-800/50 flex items-center justify-between text-xs text-slate-400">
          <span>Database</span>
          <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Supabase PG
          </span>
        </div>
        <div className="text-[11px] text-center text-slate-500 font-mono">
          DBMS Capstone Project &copy; 2026
        </div>
      </div>
    </aside>
  );
};
