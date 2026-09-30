import { useState, useEffect } from 'react';
import type { SmartMeter, Consumer, Bill, Alert } from './types';
import {
  INITIAL_METERS,
  INITIAL_CONSUMERS,
  INITIAL_BILLS,
  INITIAL_ALERTS
} from './data/mockData';

// Layout & Navigation
import { Navbar } from './components/Navbar';

// Modals
import { MeterDetailsModal } from './components/MeterDetailsModal';
import { BillGeneratorModal } from './components/BillGeneratorModal';

// Pages
import { Dashboard } from './pages/Dashboard';
import { FiveCoreSubjectsPage } from './pages/FiveCoreSubjectsPage';
import { ProjectFeaturesPage } from './pages/ProjectFeaturesPage';
import { SmartMeters } from './pages/SmartMeters';
import { ConsumersPage } from './pages/ConsumersPage';
import { GridWorkflowPage } from './pages/GridWorkflowPage';
import { BillingPage } from './pages/BillingPage';
import { AlertsPage } from './pages/AlertsPage';

export function App() {
  // Navigation & Theme State
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Domain Data States
  const [meters, setMeters] = useState<SmartMeter[]>(INITIAL_METERS);
  const [consumers] = useState<Consumer[]>(INITIAL_CONSUMERS);
  const [bills, setBills] = useState<Bill[]>(INITIAL_BILLS);
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);

  // Modals
  const [selectedMeterModal, setSelectedMeterModal] = useState<SmartMeter | null>(null);
  const [isBillModalOpen, setIsBillModalOpen] = useState<boolean>(false);

  // Telemetry Simulator
  const [isSimulating] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Theme Switching Effect (Light / Dark / System)
  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = (isDark: boolean) => {
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    if (theme === 'dark') {
      applyTheme(true);
    } else if (theme === 'light') {
      applyTheme(false);
    } else {
      // System Theme
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      applyTheme(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        applyTheme(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  // Live Telemetry Telemetry Stream Effect
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setMeters((prevMeters) =>
        prevMeters.map((meter) => {
          if (meter.status === 'FAULT' || meter.status === 'OFFLINE') return meter;

          const voltageJitter = (Math.random() - 0.5) * 1.8;
          const currentJitter = (Math.random() - 0.5) * 0.8;

          const newVoltage = parseFloat(Math.max(190, Math.min(250, meter.voltageV + voltageJitter)).toFixed(1));
          const newCurrent = parseFloat(Math.max(0, meter.currentA + currentJitter).toFixed(1));
          const newPower = parseFloat(((newVoltage * newCurrent * meter.powerFactor) / 1000).toFixed(2));

          return {
            ...meter,
            voltageV: newVoltage,
            currentA: newCurrent,
            activePowerKw: newPower,
            totalKwh: parseFloat((meter.totalKwh + 0.01).toFixed(2)),
            todayKwh: parseFloat((meter.todayKwh + 0.01).toFixed(2)),
            lastPingTime: 'Just now'
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  // Keep selected meter modal synced
  useEffect(() => {
    if (selectedMeterModal) {
      const updated = meters.find((m) => m.id === selectedMeterModal.id);
      if (updated) setSelectedMeterModal(updated);
    }
  }, [meters]);

  // Remote breaker command toggle
  const handleToggleBreaker = (meterId: string) => {
    setMeters((prev) =>
      prev.map((m) => {
        if (m.id === meterId) {
          const nextState = m.remoteBreakerState === 'CLOSED' ? 'OPEN' : 'CLOSED';
          const nextStatus = nextState === 'OPEN' ? 'FAULT' : 'ONLINE';
          showToast(`Breaker for ${m.meterSerial} switched to ${nextState}`);
          return {
            ...m,
            remoteBreakerState: nextState,
            status: nextStatus,
            currentA: nextState === 'OPEN' ? 0 : 18.5,
            activePowerKw: nextState === 'OPEN' ? 0 : 4.2
          };
        }
        return m;
      })
    );
  };

  // Add new bill
  const handleAddBill = (newBill: Bill) => {
    setBills((prev) => [newBill, ...prev]);
    showToast(`Invoice ${newBill.invoiceNo} issued to ${newBill.consumerName}`);
  };

  // Mark bill paid
  const handleMarkAsPaid = (billId: string) => {
    setBills((prev) =>
      prev.map((b) => (b.id === billId ? { ...b, status: 'PAID' } : b))
    );
    showToast('Invoice marked as PAID');
  };

  // Alert actions
  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: 'ACKNOWLEDGED' } : a))
    );
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: 'RESOLVED' } : a))
    );
    showToast('Incident marked as RESOLVED');
  };

  const unreadAlertsCount = alerts.filter((a) => a.status === 'ACTIVE').length;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-900 transition-colors duration-300">
      {/* Floating Pill Capsule Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        setTheme={setTheme}
        unreadAlertsCount={unreadAlertsCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        meters={meters}
        consumers={consumers}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && (
            <Dashboard
              meters={meters}
              onSelectTab={setActiveTab}
              onSelectMeter={(m) => setSelectedMeterModal(m)}
            />
          )}

          {activeTab === 'core-subjects' && (
            <FiveCoreSubjectsPage />
          )}

          {activeTab === 'project-features' && (
            <ProjectFeaturesPage />
          )}

          {activeTab === 'meters' && (
            <SmartMeters
              meters={meters}
              onSelectMeter={(m) => setSelectedMeterModal(m)}
              onToggleBreaker={handleToggleBreaker}
            />
          )}

          {activeTab === 'consumers' && (
            <ConsumersPage consumers={consumers} />
          )}

          {activeTab === 'workflow' && (
            <GridWorkflowPage />
          )}

          {activeTab === 'billing' && (
            <BillingPage
              bills={bills}
              onOpenBillGenerator={() => setIsBillModalOpen(true)}
              onMarkAsPaid={handleMarkAsPaid}
            />
          )}

          {activeTab === 'alerts' && (
            <AlertsPage
              alerts={alerts}
              onAcknowledge={handleAcknowledgeAlert}
              onResolve={handleResolveAlert}
            />
          )}
        </div>
      </main>

      {/* Modals */}
      <MeterDetailsModal
        meter={selectedMeterModal}
        onClose={() => setSelectedMeterModal(null)}
        onToggleBreaker={handleToggleBreaker}
      />

      {isBillModalOpen && (
        <BillGeneratorModal
          consumers={consumers}
          onClose={() => setIsBillModalOpen(false)}
          onAddBill={handleAddBill}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 animate-slideUp border border-emerald-500/40">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default App;
