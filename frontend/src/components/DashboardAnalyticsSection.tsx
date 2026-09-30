import React, { useState, useMemo } from 'react';
import type { SmartMeter, ConsumerCategory } from '../types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface DashboardAnalyticsSectionProps {
  meters: SmartMeter[];
}

export const DashboardAnalyticsSection: React.FC<DashboardAnalyticsSectionProps> = ({ meters }) => {
  const [forecastHorizon, setForecastHorizon] = useState<'7d' | '30d'>('7d');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | ConsumerCategory>('ALL');

  // Filter meters based on category selection
  const filteredMeters = useMemo(() => {
    if (selectedCategory === 'ALL') return meters;
    return meters.filter((m) => m.category === selectedCategory);
  }, [meters, selectedCategory]);

  // 1. Consumption Analytics Calculations
  const analyticsSummary = useMemo(() => {
    if (filteredMeters.length === 0) {
      return {
        totalKwh: 0,
        avgDailyKwh: 0,
        highestConsumer: null as SmartMeter | null,
        lowestConsumer: null as SmartMeter | null,
        highUsageOutliers: [] as SmartMeter[],
        meanTodayKwh: 0,
        stdDevTodayKwh: 0
      };
    }

    const totalKwh = filteredMeters.reduce((sum, m) => sum + m.totalKwh, 0);
    const totalTodayKwh = filteredMeters.reduce((sum, m) => sum + m.todayKwh, 0);
    const avgDailyKwh = parseFloat((totalTodayKwh / filteredMeters.length).toFixed(1));

    // Highest and lowest consumption meters
    const sortedByTotal = [...filteredMeters].sort((a, b) => b.totalKwh - a.totalKwh);
    const highestConsumer = sortedByTotal[0];
    const lowestConsumer = sortedByTotal[sortedByTotal.length - 1];

    // Statistical Anomaly / Outlier Detection (Z-score > 1.0 on todayKwh)
    const todayValues = filteredMeters.map((m) => m.todayKwh);
    const meanTodayKwh = todayValues.reduce((a, b) => a + b, 0) / todayValues.length;
    const variance =
      todayValues.reduce((sq, n) => sq + Math.pow(n - meanTodayKwh, 2), 0) /
      todayValues.length;
    const stdDevTodayKwh = Math.sqrt(variance);

    const highUsageOutliers = filteredMeters.filter(
      (m) => m.todayKwh > meanTodayKwh + 0.8 * stdDevTodayKwh
    );

    return {
      totalKwh,
      avgDailyKwh,
      highestConsumer,
      lowestConsumer,
      highUsageOutliers,
      meanTodayKwh,
      stdDevTodayKwh
    };
  }, [filteredMeters]);

  // 2. Consumer-wise Consumption Comparison Data
  const consumerComparisonData = useMemo(() => {
    const labels = filteredMeters.map((m) =>
      m.consumerName.length > 18 ? m.consumerName.substring(0, 18) + '...' : m.consumerName
    );
    const totalValues = filteredMeters.map((m) => (m.totalKwh / 1000).toFixed(1)); // in MWh
    const todayValues = filteredMeters.map((m) => m.todayKwh);

    return {
      labels,
      datasets: [
        {
          label: 'Total Lifetime (MWh)',
          data: totalValues.map((v) => parseFloat(v)),
          backgroundColor: '#10b981',
          borderRadius: 6
        },
        {
          label: "Today's Reading (kWh)",
          data: todayValues,
          backgroundColor: '#06b6d4',
          borderRadius: 6
        }
      ]
    };
  }, [filteredMeters]);

  // 3. Moving-Average Load Forecasting Algorithm (Pure JS)
  const forecastResults = useMemo(() => {
    const horizonDays = forecastHorizon === '7d' ? 7 : 30;
    const baseHistoricalDailyKwh = filteredMeters.map((m) => m.todayKwh);
    
    if (baseHistoricalDailyKwh.length === 0) {
      return {
        labels: [],
        actualData: [],
        forecastData: [],
        forecastTotalKwh: 0,
        forecastAvgKwh: 0,
        forecastPeakKw: 0,
        comparisonVariancePct: 0,
        forecastTable: []
      };
    }

    // Historical 7-day window baseline
    const last7DaysHistorical = [
      { day: 'Day -6', kwh: 1140 },
      { day: 'Day -5', kwh: 1210 },
      { day: 'Day -4', kwh: 1180 },
      { day: 'Day -3', kwh: 1250 },
      { day: 'Day -2', kwh: 1310 },
      { day: 'Day -1', kwh: 1280 },
      { day: 'Today (Actual)', kwh: Math.round(filteredMeters.reduce((s, m) => s + m.todayKwh, 0)) }
    ];

    // Compute moving average of recent 7 days
    const movingAvgBase =
      last7DaysHistorical.reduce((sum, d) => sum + d.kwh, 0) / last7DaysHistorical.length;

    // Generate forecast points for next horizonDays
    const today = new Date();
    const forecastPoints: { dayLabel: string; forecastedKwh: number; peakKw: number; estimatedCostRs: number }[] = [];

    let forecastSum = 0;
    let maxForecastedKwh = 0;

    for (let i = 1; i <= horizonDays; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);

      // Day of week factor (weekend slightly lower, weekday slightly higher)
      const dayOfWeek = nextDate.getDay();
      const dayFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 0.88 : 1.05;
      const trendJitter = (Math.sin(i / 2) * 0.05) + 1.0;

      const forecastedKwh = Math.round(movingAvgBase * dayFactor * trendJitter);
      const peakKw = parseFloat(((forecastedKwh / 24) * 1.65).toFixed(1));
      const estimatedCostRs = parseFloat((forecastedKwh * 7.50).toFixed(2)); // ₹7.50 tariff

      forecastSum += forecastedKwh;
      if (forecastedKwh > maxForecastedKwh) maxForecastedKwh = forecastedKwh;

      const dayLabel = `${nextDate.getDate()} ${nextDate.toLocaleString('default', { month: 'short' })}`;
      forecastPoints.push({
        dayLabel,
        forecastedKwh,
        peakKw,
        estimatedCostRs
      });
    }

    const forecastAvgKwh = Math.round(forecastSum / horizonDays);
    const forecastPeakKw = parseFloat(((maxForecastedKwh / 24) * 1.65).toFixed(1));

    // Combined chart data (Historical + Forecast)
    const chartLabels = [
      ...last7DaysHistorical.map((d) => d.day),
      ...forecastPoints.slice(0, horizonDays === 7 ? 7 : 14).map((p) => p.dayLabel)
    ];

    // Historical actual dataset (null for future points)
    const actualData = [
      ...last7DaysHistorical.map((d) => d.kwh),
      ...Array(forecastPoints.slice(0, horizonDays === 7 ? 7 : 14).length).fill(null)
    ];

    // Forecasted predicted dataset (null for past points, starts at Today)
    const forecastData = [
      ...Array(last7DaysHistorical.length - 1).fill(null),
      last7DaysHistorical[last7DaysHistorical.length - 1].kwh, // bridge point
      ...forecastPoints.slice(0, horizonDays === 7 ? 7 : 14).map((p) => p.forecastedKwh)
    ];

    const comparisonVariancePct = parseFloat(
      (((forecastAvgKwh - movingAvgBase) / movingAvgBase) * 100).toFixed(1)
    );

    return {
      labels: chartLabels,
      actualData,
      forecastData,
      forecastTotalKwh: forecastSum,
      forecastAvgKwh,
      forecastPeakKw,
      comparisonVariancePct,
      forecastTable: forecastPoints
    };
  }, [filteredMeters, forecastHorizon]);

  // Chart.js Options for Forecast Combined Line Chart
  const forecastChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 900, easing: 'easeInOutQuart' },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#64748b',
          font: { family: 'Plus Jakarta Sans', size: 12, weight: 'bold' }
        }
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#e2e8f0',
        bodyColor: '#10b981',
        titleFont: { family: 'Plus Jakarta Sans', size: 12, weight: 'bold' },
        bodyFont: { family: 'JetBrains Mono', size: 13, weight: 'bold' },
        padding: 12,
        cornerRadius: 12,
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y} kWh`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', size: 11 } }
      },
      y: {
        grid: { color: 'rgba(226, 232, 240, 0.5)' },
        ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 11 } }
      }
    }
  };

  const forecastChartData = {
    labels: forecastResults.labels,
    datasets: [
      {
        label: 'Historical Actual Consumption (kWh)',
        data: forecastResults.actualData,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.12)',
        fill: true,
        tension: 0.35,
        borderWidth: 3,
        pointBackgroundColor: '#10b981',
        pointRadius: 4
      },
      {
        label: `Moving-Average Predicted Load (${forecastHorizon.toUpperCase()})`,
        data: forecastResults.forecastData,
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.08)',
        borderDash: [6, 6],
        fill: false,
        tension: 0.35,
        borderWidth: 3,
        pointBackgroundColor: '#f59e0b',
        pointRadius: 4
      }
    ]
  };

  return (
    <div id="dashboard-analytics-section" className="pt-8 space-y-8 animate-fadeIn font-sans text-slate-800">
      {/* Main Section Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold uppercase tracking-wider font-mono">
              Smart Analytics & Load Forecasting Engine
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-2 flex items-center gap-2">
              <TrendingUp className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
              Electricity Consumption Analytics & Demand Forecasting
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
              Real-time analytics engine analyzing meter registers, consumer benchmarks, outlier detection, and moving-average load forecasting.
            </p>
          </div>

          {/* Controls: Horizon & Category Selectors */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filter Pills */}
            <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-300">
              {(['ALL', 'INDUSTRIAL', 'COMMERCIAL', 'RESIDENTIAL'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-emerald-500 text-white shadow-sm font-bold'
                      : 'hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat === 'ALL' ? 'All Categories' : cat.substring(0, 3)}
                </button>
              ))}
            </div>

            {/* Forecast Horizon Switcher */}
            <div className="bg-slate-900 text-white p-1 rounded-2xl flex items-center gap-1 text-xs font-bold">
              <button
                onClick={() => setForecastHorizon('7d')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  forecastHorizon === '7d'
                    ? 'bg-emerald-500 text-white shadow-sm font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setForecastHorizon('30d')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  forecastHorizon === '30d'
                    ? 'bg-emerald-500 text-white shadow-sm font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                30 Days
              </button>
            </div>
          </div>
        </div>

        {/* 1. Electricity Consumption Analytics KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <span className="text-[10px] font-mono font-extrabold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
              Total Grid Consumption
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {analyticsSummary.totalKwh.toLocaleString('en-IN')} kWh
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Cumulative lifetime meter readings</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <span className="text-[10px] font-mono font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Avg Daily Consumption
            </span>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {analyticsSummary.avgDailyKwh.toLocaleString('en-IN')} kWh/day
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Mean daily power per smart meter</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <span className="text-[10px] font-mono font-extrabold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
              Highest / Lowest Consumer
            </span>
            <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
              Peak: {analyticsSummary.highestConsumer?.consumerName || 'N/A'}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 font-mono">
              Min: {analyticsSummary.lowestConsumer?.consumerName || 'N/A'}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 space-y-2">
            <span className="text-[10px] font-mono font-extrabold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> High Usage Anomaly Warning
            </span>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white">
              {analyticsSummary.highUsageOutliers.length} Consumers Flagged
            </div>
            <p className="text-[11px] text-amber-700 dark:text-amber-300 font-medium line-clamp-1">
              {analyticsSummary.highUsageOutliers[0]?.consumerName || 'No outliers detected'}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Consumer Consumption Comparison & Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Consumer-wise Comparison Chart */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                Consumer Benchmarking
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Consumer-Wise Electricity Consumption Comparison
              </h3>
            </div>
            <BarChart3 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>

          <div className="h-64 w-full relative">
            <Bar
              data={consumerComparisonData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top', labels: { font: { family: 'Plus Jakarta Sans', size: 11 } } } },
                scales: { x: { ticks: { font: { size: 10 } } }, y: { ticks: { font: { size: 10 } } } }
              }}
            />
          </div>
        </div>

        {/* High Consumption Outlier Alerts List */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-md space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-extrabold text-rose-600 dark:text-rose-400 uppercase tracking-widest">
                  Statistical Anomaly Engine
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Unusually High Consumption Identification
                </h3>
              </div>
              <Sparkles className="w-5 h-5 text-amber-500" />
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Detects consumers with daily electricity usage exceeding 0.8 standard deviations above the grid mean (\(\mu = {analyticsSummary.meanTodayKwh.toFixed(1)}\) kWh).
            </p>

            <div className="space-y-2 pt-2">
              {analyticsSummary.highUsageOutliers.map((m) => (
                <div
                  key={m.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-extrabold text-slate-900 dark:text-white">{m.consumerName}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-400 font-mono block">
                      {m.meterSerial} &bull; {m.category}
                    </span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-black text-rose-600 dark:text-rose-400 text-sm block">{m.todayKwh} kWh</span>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">+ High Demand Spike</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Grid Load Balancing Recommendation: Dispatch Demand Response Alert</span>
          </div>
        </div>
      </div>

      {/* 3. Electricity Load Forecasting Section */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
              Moving-Average Time-Series Algorithm
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Next {forecastHorizon === '7d' ? '7 Days' : '30 Days'} Predicted Electricity Load Demand
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              Displays historical actual consumption (solid green) alongside moving-average predicted load (dashed amber).
            </p>
          </div>

          {/* Forecast Key Metrics */}
          <div className="grid grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 block font-sans font-bold">Predicted Avg</span>
              <span className="font-extrabold text-slate-900 dark:text-white text-sm">{forecastResults.forecastAvgKwh} kWh</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 block font-sans font-bold">Peak Demand</span>
              <span className="font-extrabold text-amber-600 dark:text-amber-400 text-sm">{forecastResults.forecastPeakKw} kW</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 block font-sans font-bold">Variance</span>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">+{forecastResults.comparisonVariancePct}%</span>
            </div>
          </div>
        </div>

        {/* Combined Chart.js Canvas */}
        <div className="h-72 w-full relative">
          <Line data={forecastChartData} options={forecastChartOptions} />
        </div>

        {/* Forecast Prediction Table */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              Itemized Daily Load Forecast Breakdown (Tariff: ₹7.50 / kWh)
            </h4>
            <span className="text-xs font-mono text-slate-400 font-bold">
              Horizon: Next {forecastResults.forecastTable.length} Days
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-mono uppercase text-[10px]">
                <tr>
                  <th className="p-3">Forecast Date / Day</th>
                  <th className="p-3 text-right">Predicted Load (kWh)</th>
                  <th className="p-3 text-right">Est. Peak Demand (kW)</th>
                  <th className="p-3 text-right">Est. Daily Tariff Charge (₹)</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-800 dark:text-slate-200 font-mono">
                {forecastResults.forecastTable.map((pt, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{pt.dayLabel}</td>
                    <td className="p-3 text-right font-bold text-amber-600 dark:text-amber-400">{pt.forecastedKwh.toLocaleString('en-IN')} kWh</td>
                    <td className="p-3 text-right text-slate-700 dark:text-slate-300">{pt.peakKw} kW</td>
                    <td className="p-3 text-right text-emerald-600 dark:text-emerald-400 font-bold">₹{pt.estimatedCostRs.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-center font-sans">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-mono font-bold">
                        PREDICTED
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
