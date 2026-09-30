import React from 'react';
import { Activity, TrendingUp, Network, Zap } from 'lucide-react';

interface HeroBannerProps {
  onSelectTab: (tabId: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectTab }) => {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-blue-500/20 mb-8 animate-fadeIn group">
      {/* Background Scenic Image with overlay gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="/power-cell-banner.jpg"
          alt="Power Cell Grid Operations"
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-out"
          onError={(e) => {
            // Fallback if file path varies
            (e.target as HTMLImageElement).src = '/hero-bg.jpg';
          }}
        />
        {/* Subtle Dark Gradient Overlay for optimal legibility matching Image 1 */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#031535]/85 via-[#0b2447]/65 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent"></div>
      </div>

      {/* Hero Content Layer */}
      <div className="relative z-10 p-8 lg:p-12 min-h-[380px] lg:min-h-[440px] flex flex-col justify-between">
        {/* Top Title Section */}
        <div className="space-y-3 max-w-2xl pt-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Zap className="w-4 h-4 fill-cyan-400 text-cyan-400" />
            </div>
            <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-cyan-300">
              EnergyTech Grid Operations Platform
            </span>
          </div>

          {/* Large Stylized Logo Matching Image 1 */}
          <div className="flex items-baseline gap-3">
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-white drop-shadow-md">
              Power <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-100">Cell</span>
            </h1>
          </div>

          <p className="text-lg lg:text-xl font-medium italic text-cyan-200/90 tracking-wide font-sans flex items-center gap-2">
            Smart Meter Reading System
          </p>
        </div>

        {/* Bottom 3 Interactive Quick Buttons Matching Image 1 */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-12 max-w-3xl mx-auto w-full">
          <button
            onClick={() => onSelectTab('meters')}
            className="group/btn flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-cyan-500 backdrop-blur-md border border-white/20 hover:border-cyan-400 text-white hover:text-slate-950 font-extrabold text-lg transition-all duration-300 shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-1 cursor-pointer"
          >
            <Activity className="w-5 h-5 text-cyan-300 group-hover/btn:text-slate-950 transition-colors" />
            <span>Monitor</span>
          </button>

          <button
            onClick={() => onSelectTab('analytics')}
            className="group/btn flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-indigo-500 backdrop-blur-md border border-white/20 hover:border-indigo-400 text-white hover:text-white font-extrabold text-lg transition-all duration-300 shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-1 cursor-pointer"
          >
            <TrendingUp className="w-5 h-5 text-indigo-300 group-hover/btn:text-white transition-colors" />
            <span>Analyze</span>
          </button>

          <button
            onClick={() => onSelectTab('grid')}
            className="group/btn flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-emerald-500 backdrop-blur-md border border-white/20 hover:border-emerald-400 text-white hover:text-slate-950 font-extrabold text-lg transition-all duration-300 shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-1 cursor-pointer"
          >
            <Network className="w-5 h-5 text-emerald-300 group-hover/btn:text-slate-950 transition-colors" />
            <span>Optimize</span>
          </button>
        </div>
      </div>
    </div>
  );
};
