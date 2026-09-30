import React, { useState } from 'react';
import type { Consumer, Bill } from '../types';
import { X, Receipt, Calculator, CheckCircle2 } from 'lucide-react';

interface BillGeneratorModalProps {
  consumers: Consumer[];
  onClose: () => void;
  onAddBill: (bill: Bill) => void;
}

export const BillGeneratorModal: React.FC<BillGeneratorModalProps> = ({
  consumers,
  onClose,
  onAddBill
}) => {
  const [selectedConsumerId, setSelectedConsumerId] = useState(consumers[0]?.id || '');
  const [unitsConsumed, setUnitsConsumed] = useState('450');

  const selectedConsumer = consumers.find((c) => c.id === selectedConsumerId) || consumers[0];

  // Calculate bill tariff breakdown
  const units = parseFloat(unitsConsumed) || 0;

  // Rate rules: RESIDENTIAL = $0.25/kWh, COMMERCIAL = $0.35/kWh, INDUSTRIAL = $0.45/kWh
  const ratePerKwh =
    selectedConsumer?.category === 'INDUSTRIAL'
      ? 0.45
      : selectedConsumer?.category === 'COMMERCIAL'
      ? 0.35
      : 0.25;

  const fixedCharge = selectedConsumer?.category === 'INDUSTRIAL' ? 250 : selectedConsumer?.category === 'COMMERCIAL' ? 100 : 25;
  const energyCharge = parseFloat((units * ratePerKwh).toFixed(2));
  const taxes = parseFloat(((energyCharge + fixedCharge) * 0.12).toFixed(2)); // 12% tax
  const totalAmount = parseFloat((fixedCharge + energyCharge + taxes).toFixed(2));

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConsumer) return;

    const newBill: Bill = {
      id: `bill-${Date.now()}`,
      invoiceNo: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      consumerId: selectedConsumer.id,
      consumerNo: selectedConsumer.consumerNo,
      consumerName: selectedConsumer.name,
      category: selectedConsumer.category,
      meterSerial: selectedConsumer.meterSerial,
      billingPeriod: 'Sep 01 - Sep 30, 2026',
      issueDate: '2026-09-29',
      dueDate: '2026-10-15',
      previousReadingKwh: 14000,
      currentReadingKwh: 14000 + units,
      unitsConsumedKwh: units,
      fixedCharge,
      energyCharge,
      taxesAndDuties: taxes,
      totalAmount,
      status: 'UNPAID'
    };

    onAddBill(newBill);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="glass-card-static w-full max-w-xl rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Receipt className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Generate Electricity Invoice</h2>
              <p className="text-xs text-slate-400">Calculate tariff & issue smart meter bill</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleGenerate} className="p-6 space-y-5">
          {/* Consumer Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Select Consumer Account</label>
            <select
              value={selectedConsumerId}
              onChange={(e) => setSelectedConsumerId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
            >
              {consumers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.consumerNo}) - {c.category}
                </option>
              ))}
            </select>
          </div>

          {/* Units Consumed input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Meter Units Consumed (kWh)</label>
            <div className="relative">
              <input
                type="number"
                min="1"
                step="1"
                value={unitsConsumed}
                onChange={(e) => setUnitsConsumed(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-4 pr-16 py-2.5 text-sm text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                placeholder="e.g. 450"
                required
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-cyan-400 font-semibold">kWh</span>
            </div>
          </div>

          {/* Invoice Tariff Breakdown */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-2 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-cyan-400" />
              Itemized Tariff Calculation
            </div>
            <div className="flex justify-between text-xs text-slate-300">
              <span>Category Tariff Rate ({selectedConsumer?.category}):</span>
              <span className="font-mono text-cyan-400">${ratePerKwh.toFixed(2)} / kWh</span>
            </div>
            <div className="flex justify-between text-xs text-slate-300">
              <span>Energy Charge ({units} kWh):</span>
              <span className="font-mono text-white">${energyCharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-300">
              <span>Fixed Grid Capacity Charge:</span>
              <span className="font-mono text-white">${fixedCharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-300">
              <span>Electricity Duty & Taxes (12%):</span>
              <span className="font-mono text-white">${taxes.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold">
              <span className="text-white">Total Bill Payable:</span>
              <span className="font-mono text-emerald-400 text-base">${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> Issue Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
