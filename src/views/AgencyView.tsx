import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  TrendingUp,
  Download,
  Plus,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Building
} from 'lucide-react';
import { initialAgencyClients } from '../data/mockInitialData';
import { useToast } from '../components/Toast';

export const AgencyView: React.FC = () => {
  const { showToast } = useToast();
  const [clients, setClients] = useState(initialAgencyClients);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [clientName, setClientName] = useState('');

  const handleAddClient = () => {
    if (!clientName.trim()) return;
    setClients(prev => [
      ...prev,
      {
        id: `c-${Date.now()}`,
        name: clientName,
        score: 65,
        scoreChange: '+4',
        opportunitiesCount: 12,
        alertCount: 1,
        revenueInfluenced: '$12,400',
        status: 'Growing'
      }
    ]);
    setClientName('');
    setShowAddClientModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                LUMENIQ Agency Portal
              </h2>
              <p className="text-xs text-slate-400">
                Multi-client workspace oversight, white-label PDF generation, and client health tracking.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowAddClientModal(true)}
          className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client Brand</span>
        </button>
      </div>

      {/* Agency Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Managed Client Brands</span>
          <div className="text-3xl font-extrabold text-white font-mono mt-1">{clients.length}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Tier: Agency Elite (35 Seats)</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Revenue Influenced</span>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono mt-1">$190,100</div>
          <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">+22% MoM</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Avg Client AI Score</span>
          <div className="text-3xl font-extrabold text-cyan-400 font-mono mt-1">70 / 100</div>
          <span className="text-[11px] text-slate-400 mt-1 block">+6.2 pts average gain</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Open Client Opportunities</span>
          <div className="text-3xl font-extrabold text-purple-400 font-mono mt-1">55 Gaps</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Ready for execution</span>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Building className="w-4 h-4 text-indigo-400" />
            <span>Active Client Workspaces</span>
          </h3>
          <span className="text-xs text-slate-400">White-Label Client Reporting Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Client Workspace</th>
                <th className="py-2.5 px-3">AI Visibility Score</th>
                <th className="py-2.5 px-3">30d Change</th>
                <th className="py-2.5 px-3">Open Gaps</th>
                <th className="py-2.5 px-3">Active Alerts</th>
                <th className="py-2.5 px-3">Influenced Rev</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
              {clients.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-sans font-semibold text-white">
                    {c.name}
                  </td>
                  <td className="py-3 px-3 font-bold text-cyan-300">{c.score} / 100</td>
                  <td className="py-3 px-3 text-emerald-400 font-semibold">{c.scoreChange} pts</td>
                  <td className="py-3 px-3 text-slate-300">{c.opportunitiesCount}</td>
                  <td className="py-3 px-3">
                    {c.alertCount > 0 ? (
                      <span className="text-amber-400 font-semibold">{c.alertCount} alert</span>
                    ) : (
                      <span className="text-slate-500">None</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">{c.revenueInfluenced}</td>
                  <td className="py-3 px-3 font-sans">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        c.status === 'Optimal' || c.status === 'Healthy'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-sans">
                    <button
                      onClick={() => showToast(`White-label client report generated for ${c.name}!`, 'success')}
                      className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 font-semibold text-[11px] transition-colors"
                    >
                      Export Client PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Client Modal */}
      {showAddClientModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Add New Client Account</h3>
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Client Company Name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Acme Health Corp"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setShowAddClientModal(false)}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAddClient}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
              >
                Provision Workspace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
