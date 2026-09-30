import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  accentColor?: 'cyan' | 'emerald' | 'amber' | 'rose' | 'indigo';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtext,
  change,
  isPositive = true,
  icon: Icon,
  accentColor = 'cyan'
}) => {
  const accentStyles = {
    cyan: {
      bg: 'from-cyan-500/10 to-blue-500/5',
      iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      border: 'hover:border-cyan-500/40'
    },
    emerald: {
      bg: 'from-emerald-500/10 to-teal-500/5',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      border: 'hover:border-emerald-500/40'
    },
    amber: {
      bg: 'from-amber-500/10 to-orange-500/5',
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      border: 'hover:border-amber-500/40'
    },
    rose: {
      bg: 'from-rose-500/10 to-pink-500/5',
      iconBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      border: 'hover:border-rose-500/40'
    },
    indigo: {
      bg: 'from-indigo-500/10 to-purple-500/5',
      iconBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      border: 'hover:border-indigo-500/40'
    }
  };

  const style = accentStyles[accentColor];

  return (
    <div className={`glass-card p-5 rounded-2xl bg-gradient-to-br ${style.bg} relative overflow-hidden ${style.border}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 mb-1 tracking-wide">{title}</p>
          <h3 className="text-2xl font-extrabold font-mono text-white tracking-tight">{value}</h3>
        </div>
        <div className={`p-2.5 rounded-xl border ${style.iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        {subtext && <span className="text-slate-400">{subtext}</span>}
        {change && (
          <span
            className={`font-semibold font-mono px-2 py-0.5 rounded-full ${
              isPositive
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
            }`}
          >
            {change}
          </span>
        )}
      </div>
    </div>
  );
};
