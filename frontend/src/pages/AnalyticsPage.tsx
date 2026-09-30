import React, { useState } from 'react';
import { LOAD_FORECAST_DATA } from '../data/mockData';
import { TrendingUp, AlertTriangle, ShieldCheck, Sparkles, BarChart3, Layers } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const [modelConfig, setModelConfig] = useState('RandomForestRegressor');

  return (
    <div className="space-y-8 animate-fadeIn font-sans text-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-100 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
              Python Scikit-Learn Model Module
            </span>
            <span className="text-xs text-slate-400 font-mono">v1.4</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
            Grid Demand AI Forecasting & Machine Learning
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Explainable Random Forest & Time-Series Regression predicting 24-hour peak load demand curves.
          </p>
        </div>

        {/* Model Selector */}
        <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200">
          <Sparkles className="w-4 h-4 text-emerald-600 ml-2" />
          <select
            value={modelConfig}
            onChange={(e) => setModelConfig(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 font-mono font-bold"
          >
            <option value="RandomForestRegressor">Model: Scikit-learn Random Forest (MAE 1.2%)</option>
            <option value="XGBoost">Model: Gradient Boosting (XGBoost)</option>
            <option value="ARIMA">Model: ARIMA Time-Series</option>
          </select>
        </div>
      </div>

      {/* Main Forecast Chart Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              24-Hour Load Demand: Actual vs AI Machine Learning Forecast (MW)
            </h3>
            <p className="text-xs text-slate-400 font-medium">Comparing real-time telemetry against model predictions with confidence interval</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <span className="w-3 h-0.5 bg-emerald-600"></span> Telemetry Actual (MW)
            </span>
            <span className="flex items-center gap-1.5 text-indigo-700 font-bold">
              <span className="w-3 h-0.5 bg-indigo-500"></span> AI Model Prediction
            </span>
          </div>
        </div>

        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={LOAD_FORECAST_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} domain={[20, 130]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
              />
              <Line type="monotone" dataKey="actualMw" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} name="Actual Grid Load (MW)" />
              <Line type="monotone" dataKey="predictedMw" stroke="#6366f1" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} name="AI Model Prediction (MW)" />
              <Line type="monotone" dataKey="baselineMw" stroke="#94a3b8" strokeWidth={1} dot={false} name="Historical Baseline" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Model Performance & Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>MODEL EVALUATION</span>
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl font-black font-mono text-slate-900">Mean Abs Error: 1.24%</div>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Trained on 1.4 million historical 15-minute interval smart meter readings. High precision during peak transition hours.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>PEAK HOUR ALERT</span>
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-black font-mono text-amber-600">Peak @ 20:00 - 112.4 MW</div>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Predicted load reaches 93.6% of maximum transformer capacity. Recommend automated load balance or battery storage discharge.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>POWER FACTOR QUALITY</span>
            <Layers className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl font-black font-mono text-emerald-600">Grid Avg PF: 0.96</div>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Reactive power compensation capacitor banks actively engaged. Minimal VAR penalty across industrial feeders.
          </p>
        </div>
      </div>
    </div>
  );
};
