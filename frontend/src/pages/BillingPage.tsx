import { useState } from 'react';
import type { Bill } from '../types';
import { Receipt, Search, Plus } from 'lucide-react';

interface BillingPageProps {
  bills: Bill[];
  onOpenBillGenerator: () => void;
  onMarkAsPaid: (billId: string) => void;
}

export const BillingPage: React.FC<BillingPageProps> = ({
  bills,
  onOpenBillGenerator,
  onMarkAsPaid
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredBills = bills.filter((b) => {
    const matchesSearch =
      b.consumerName.toLowerCase().includes(search.toLowerCase()) ||
      b.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
      b.meterSerial.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalBilled = bills.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalPaid = bills.filter(b => b.status === 'PAID').reduce((sum, b) => sum + b.totalAmount, 0);
  const totalOutstanding = bills.filter(b => b.status !== 'PAID').reduce((sum, b) => sum + b.totalAmount, 0);

  return (
    <div className="space-y-8 animate-fadeIn font-sans text-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-100 shadow-md">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Receipt className="w-6 h-6 text-emerald-600" />
            Electricity Billing & Invoicing Management
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Automated tariff calculation, itemized power invoices, payment tracking, and revenue collection.
          </p>
        </div>

        <button
          onClick={onOpenBillGenerator}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Issue New Invoice
        </button>
      </div>

      {/* Financial Summary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md">
          <div className="text-xs text-slate-400 mb-1 font-mono font-bold">TOTAL BILLED (CURRENT CYCLE)</div>
          <div className="text-3xl font-black font-mono text-slate-900">₹{totalBilled.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md">
          <div className="text-xs text-slate-400 mb-1 font-mono font-bold">REVENUE RECOVERED (PAID)</div>
          <div className="text-3xl font-black font-mono text-emerald-600">₹{totalPaid.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md">
          <div className="text-xs text-slate-400 mb-1 font-mono font-bold">OUTSTANDING BALANCE</div>
          <div className="text-3xl font-black font-mono text-rose-600">₹{totalOutstanding.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 rounded-3xl bg-white border border-slate-100 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search invoice #, consumer, or meter..."
            className="w-full bg-slate-50 border border-slate-200 rounded-full pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-emerald-500 w-full md:w-auto"
        >
          <option value="ALL">All Payment Statuses</option>
          <option value="PAID">PAID</option>
          <option value="UNPAID">UNPAID</option>
          <option value="OVERDUE">OVERDUE</option>
        </select>
      </div>

      {/* Invoices Table Container */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="text-xs uppercase bg-slate-50 text-slate-500 font-mono">
              <tr>
                <th className="px-6 py-4">Invoice No</th>
                <th className="px-6 py-4">Consumer</th>
                <th className="px-6 py-4">Billing Period</th>
                <th className="px-6 py-4">Consumed Units</th>
                <th className="px-6 py-4">Total Amount (₹)</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans text-xs">
              {filteredBills.map((bill) => (
                <tr key={bill.id} className="hover:bg-slate-50 transition-all">
                  <td className="px-6 py-4 font-mono font-bold text-emerald-700">{bill.invoiceNo}</td>
                  <td className="px-6 py-4">
                    <div className="font-extrabold text-slate-900 text-sm">{bill.consumerName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{bill.consumerNo} &bull; {bill.category}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-mono">{bill.billingPeriod}</td>
                  <td className="px-6 py-4 font-mono font-bold text-slate-900">
                    {bill.unitsConsumedKwh} kWh
                  </td>
                  <td className="px-6 py-4 font-mono text-emerald-600 font-black text-sm">
                    ₹{bill.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                        bill.status === 'PAID'
                          ? 'bg-emerald-100 text-emerald-800'
                          : bill.status === 'UNPAID'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      ● {bill.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {bill.status !== 'PAID' && (
                      <button
                        onClick={() => onMarkAsPaid(bill.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-bold text-xs transition-all cursor-pointer"
                      >
                        Mark Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
