import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  PieChart,
  Target,
  BarChart2,
  Layers,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { TrafficByEngine, AttributionModel } from '../types';

interface TrafficRevenueViewProps {
  trafficByEngine: TrafficByEngine[];
}

export const TrafficRevenueView: React.FC<TrafficRevenueViewProps> = ({
  trafficByEngine
}) => {
  const [activeModel, setActiveModel] = useState<AttributionModel>('Multi-Touch');

  const modelMultipliers: Record<AttributionModel, number> = {
    'First Touch': 1.0,
    'Last Touch': 0.82,
    'Multi-Touch': 1.12,
    'AI-Assisted': 1.41
  };

  const multiplier = modelMultipliers[activeModel];

  const totalVisits = trafficByEngine.reduce((acc, curr) => acc + curr.visits, 0);
  const totalLeads = trafficByEngine.reduce((acc, curr) => acc + curr.leadsGenerated, 0);
  const totalBaseRevenue = trafficByEngine.reduce((acc, curr) => acc + curr.revenueInfluenced, 0);
  const totalAttributedRevenue = Math.round(totalBaseRevenue * multiplier);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header with Attribution Model Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                AI Referral Analytics & Revenue Attribution
              </h2>
              <p className="text-xs text-slate-400">
                Move beyond vanity metrics: trace AI answers to website sessions, demo requests, and closed revenue.
              </p>
            </div>
          </div>
        </div>

        {/* Attribution Model Pills */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <span className="text-[10px] text-slate-400 px-2 font-semibold">Model:</span>
          {(['First Touch', 'Last Touch', 'Multi-Touch', 'AI-Assisted'] as AttributionModel[]).map((m) => (
            <button
              key={m}
              onClick={() => setActiveModel(m)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                activeModel === m
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Attributed AI Revenue</span>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono mt-1">
            ${totalAttributedRevenue.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3 h-3" /> +34.2% MoM
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">AI Referral Sessions</span>
          <div className="text-3xl font-extrabold text-white font-mono mt-1">
            {totalVisits.toLocaleString()}
          </div>
          <span className="text-[11px] text-blue-400 font-semibold flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3 h-3" /> +41% Growth
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">AI-Generated Leads</span>
          <div className="text-3xl font-extrabold text-cyan-400 font-mono mt-1">
            {totalLeads}
          </div>
          <span className="text-[11px] text-cyan-400 font-semibold mt-1 block">
            6.1% Lead Conversion Rate
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Avg Session Quality</span>
          <div className="text-3xl font-extrabold text-purple-400 font-mono mt-1">
            3m 38s
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            2.1x longer than Google Ads
          </span>
        </div>
      </div>

      {/* Traffic Table by AI Engine */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>AI Search Provider Traffic Breakdown</span>
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Direct referral clicks captured from AI answer links, citations, and grounded web sources.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">AI Engine</th>
                <th className="py-2.5 px-3">Monthly Visits</th>
                <th className="py-2.5 px-3">Bounce Rate</th>
                <th className="py-2.5 px-3">Avg Duration</th>
                <th className="py-2.5 px-3">Leads Captured</th>
                <th className="py-2.5 px-3">Conv. Rate</th>
                <th className="py-2.5 px-3 text-right">Attributed Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
              {trafficByEngine.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-sans font-semibold text-white">
                    {item.engine}
                  </td>
                  <td className="py-3 px-3 text-slate-200">{item.visits.toLocaleString()}</td>
                  <td className="py-3 px-3 text-slate-400">{item.bounceRate}</td>
                  <td className="py-3 px-3 text-slate-400">{item.avgDuration}</td>
                  <td className="py-3 px-3 text-cyan-300 font-bold">{item.leadsGenerated}</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">{item.conversionRate}</td>
                  <td className="py-3 px-3 text-right font-bold text-emerald-400">
                    ${Math.round(item.revenueInfluenced * multiplier).toLocaleString()}
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
