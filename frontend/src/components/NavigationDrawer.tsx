import {
  X,
  LayoutDashboard,
  Cpu,
  Users,
  TrendingUp,
  Network,
  Receipt,
  AlertTriangle,
  Zap,
  Shield,
  LogOut
} from 'lucide-react';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  metersCount: number;
  alertCount: number;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  metersCount,
  alertCount
}) => {
  if (!isOpen) return null;

  const navItems = [
    { id: 'dashboard', label: 'Grid Overview', icon: LayoutDashboard },
    { id: 'meters', label: 'Smart Meters', icon: Cpu, badge: metersCount },
    { id: 'consumers', label: 'Consumers', icon: Users },
    { id: 'analytics', label: 'Demand Forecasting', icon: TrendingUp, highlight: 'AI' },
    { id: 'grid', label: 'Substation Grid', icon: Network },
    { id: 'billing', label: 'Billing & Tariffs', icon: Receipt },
    { id: 'alerts', label: 'Anomalies & Alerts', icon: AlertTriangle, badge: alertCount, badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/40' }
  ];

  const handleSelect = (tabId: string) => {
    setActiveTab(tabId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Drawer Panel */}
      <div className="relative w-80 max-w-[85vw] bg-slate-900 border-r border-slate-700/80 shadow-2xl flex flex-col justify-between p-6 z-10 text-slate-100 animate-slideRight">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-base text-white">Power <span className="text-cyan-400">Cell</span></h2>
                <p className="text-[11px] text-slate-400 font-mono">Smart Meter Reading System</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation items */}
          <div className="mt-6 space-y-1">
            <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              System Modules
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
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
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/30 text-indigo-200 border border-indigo-500/40">
                      {item.highlight}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" /> System Security
            </span>
            <span className="font-mono text-emerald-400 font-bold">Encrypted</span>
          </div>

          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-all"
          >
            <LogOut className="w-4 h-4 text-rose-400" /> Close Drawer
          </button>
        </div>
      </div>
    </div>
  );
};
