import React, { useState, useEffect } from 'react';
import type { TimeScale } from '../types';
import { TIMESCALE_DATASETS } from '../data/mockData';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface InteractiveEnergyChartProps {
  initialTimescale?: TimeScale;
}

export const InteractiveEnergyChart: React.FC<InteractiveEnergyChartProps> = ({
  initialTimescale = 'live'
}) => {
  const [timescale, setTimescale] = useState<TimeScale>(initialTimescale);
  const [dataset, setDataset] = useState(TIMESCALE_DATASETS[initialTimescale]);

  // Handle timescale switching with dynamic dataset load
  useEffect(() => {
    setDataset(TIMESCALE_DATASETS[timescale]);
  }, [timescale]);

  // Automated continuous timescale loop (live -> day -> week -> month -> year -> live)
  useEffect(() => {
    const timescalesOrder: TimeScale[] = ['live', 'day', 'week', 'month', 'year'];
    const timer = setInterval(() => {
      setTimescale((prev) => {
        const currentIndex = timescalesOrder.indexOf(prev);
        const nextIndex = (currentIndex + 1) % timescalesOrder.length;
        return timescalesOrder[nextIndex];
      });
    }, 4800);

    return () => clearInterval(timer);
  }, []);

  // Chart.js data configuration matching reference images
  const chartData = {
    labels: dataset.labels,
    datasets: [
      {
        data: dataset.values,
        backgroundColor: dataset.values.map((_, index) =>
          index < dataset.completedBarsCount
            ? '#059669' // Solid vibrant emerald green
            : '#a7f3d0' // Light soft mint green for remaining period
        ),
        hoverBackgroundColor: dataset.values.map((_, index) =>
          index < dataset.completedBarsCount ? '#047857' : '#6ee7b7'
        ),
        borderRadius: timescale === 'month' ? 4 : 8,
        borderSkipped: false,
        barPercentage: timescale === 'month' ? 0.75 : 0.65,
        categoryPercentage: 0.85
      }
    ]
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 700,
      easing: 'easeInOutQuart'
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#e2e8f0',
        bodyColor: '#10b981',
        titleFont: { family: 'Plus Jakarta Sans', size: 12, weight: 'bold' },
        bodyFont: { family: 'JetBrains Mono', size: 13, weight: 'bold' },
        padding: 12,
        cornerRadius: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.y} ${dataset.unit}`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          display: true,
          color: '#94a3b8',
          font: { family: 'Plus Jakarta Sans', size: 10, weight: 'normal' }
        },
        border: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        },
        ticks: {
          display: false
        },
        border: {
          display: false
        }
      }
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white transition-all font-sans">
      {/* Top Header Row inside Card matching screenshot */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 font-sans mb-1">
            CONSUMPTION
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">
              {dataset.totalValue}
            </span>
            <span className="text-base font-semibold text-slate-500 font-sans">
              {dataset.unit}
            </span>
          </div>
          <div className="text-xs text-slate-500 font-medium mt-0.5">
            {dataset.subtitle}
          </div>
        </div>

        {/* Timescale Switcher Tabs matching screenshot */}
        <div className="bg-slate-100/90 dark:bg-slate-800 p-1 rounded-2xl flex items-center gap-1 shadow-inner border border-slate-200/50 dark:border-slate-700">
          {(['live', 'day', 'week', 'month', 'year'] as TimeScale[]).map((t) => (
            <button
              key={t}
              onClick={() => setTimescale(t)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                timescale === t
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-md font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t === 'live' ? 'Live' : t === 'day' ? 'Day' : t === 'week' ? 'Week' : t === 'month' ? 'Month' : 'Year'}
            </button>
          ))}
        </div>
      </div>

      {/* Chart.js Bar Canvas Container */}
      <div className="relative h-56 sm:h-64 w-full mb-12">
        <Bar data={chartData} options={options} />
      </div>

      {/* Floating Power Quality Pill Badge at Bottom Left matching screenshot */}
      <div className="absolute left-6 bottom-4 sm:bottom-6 z-10 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-xl border border-slate-200/90 font-mono text-xs text-slate-700 space-y-1 transition-all">
        {dataset.extraBadge && (
          <div className="text-[10px] text-slate-400 font-sans font-medium mb-0.5">
            {dataset.extraBadge}
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 font-sans">POWER QUALITY</span>
          <span className="text-slate-300">|</span>
          <span className="font-bold text-slate-800">{dataset.powerQuality}</span>
        </div>
      </div>
    </div>
  );
};
