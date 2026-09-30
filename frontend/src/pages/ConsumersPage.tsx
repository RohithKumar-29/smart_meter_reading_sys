import { useState } from 'react';
import type { Consumer } from '../types';
import { Users, Search, MapPin } from 'lucide-react';

interface ConsumersPageProps {
  consumers: Consumer[];
}

export const ConsumersPage: React.FC<ConsumersPageProps> = ({ consumers }) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const filteredConsumers = consumers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.consumerNo.toLowerCase().includes(search.toLowerCase()) ||
      c.meterSerial.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = categoryFilter === 'ALL' || c.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fadeIn font-sans text-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-100 shadow-md">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-600" />
            Registered Consumer Directory
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Consumer accounts, sanctioned demand capacity (kW), meter assignments, and billing balances.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-700 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
          <span>Active Consumers: <strong className="text-emerald-600 font-bold">{consumers.length}</strong></span>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 rounded-3xl bg-white border border-slate-100 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search consumer name, account #, or meter..."
            className="w-full bg-slate-50 border border-slate-200 rounded-full pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-emerald-500 w-full md:w-auto"
        >
          <option value="ALL">All Categories</option>
          <option value="RESIDENTIAL">Residential</option>
          <option value="COMMERCIAL">Commercial</option>
          <option value="INDUSTRIAL">Industrial</option>
        </select>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="text-xs uppercase bg-slate-50 text-slate-500 font-mono">
              <tr>
                <th className="px-6 py-4">Account No</th>
                <th className="px-6 py-4">Consumer Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Sanctioned Load</th>
                <th className="px-6 py-4">Bound Smart Meter</th>
                <th className="px-6 py-4">Account Balance</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans text-xs">
              {filteredConsumers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition-all">
                  <td className="px-6 py-4 font-mono font-bold text-emerald-700">{c.consumerNo}</td>
                  <td className="px-6 py-4">
                    <div className="font-extrabold text-slate-900 text-sm">{c.name}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 font-medium">
                      <MapPin className="w-3 h-3 text-slate-400" /> {c.address}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        c.category === 'INDUSTRIAL'
                          ? 'bg-amber-100 text-amber-800'
                          : c.category === 'COMMERCIAL'
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {c.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-slate-900">
                    {c.sanctionedLoadKw} kW
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-emerald-600">
                    {c.meterSerial}
                  </td>
                  <td className="px-6 py-4 font-mono text-emerald-600 font-black">
                    ₹{c.currentBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                        c.connectionStatus === 'ACTIVE'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      ● {c.connectionStatus}
                    </span>
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
