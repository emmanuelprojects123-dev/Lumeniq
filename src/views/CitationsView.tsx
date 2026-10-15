import React, { useState } from 'react';
import {
  Quote,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Compass,
  Layers,
  Sparkles
} from 'lucide-react';
import { CitationItem, ActionPlanItem } from '../types';
import { useToast } from '../components/Toast';

interface CitationsViewProps {
  citations: CitationItem[];
  onAddAction: (action: Partial<ActionPlanItem>) => void;
  brandName: string;
}

export const CitationsView: React.FC<CitationsViewProps> = ({
  citations,
  onAddAction,
  brandName
}) => {
  const { showToast } = useToast();
  const [filterContext, setFilterContext] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filtered = citations.filter(c => {
    if (filterContext !== 'All' && c.contextType !== filterContext) return false;
    if (filterStatus !== 'All' && c.status !== filterStatus) return false;
    return true;
  });

  const ourTotalCitations = citations.reduce((acc, c) => acc + (c.status === 'Citing You' ? c.citationCount : 0), 0);
  const competitorTotalCitations = citations.reduce((acc, c) => acc + c.competitorCitationsCount, 0);
  const citationGap = competitorTotalCitations - ourTotalCitations;

  const handleCreateOutreachTask = (cite: CitationItem) => {
    onAddAction({
      title: `Acquire authority citation on ${cite.domain}`,
      category: 'Authority / Citations',
      priority: 'High',
      difficulty: 'Medium',
      expectedImpact: `+${Math.round(cite.authorityScore / 6)} citations across Perplexity & SearchGPT`,
      status: 'Draft',
      owner: 'PR & Growth Team',
      aiSuggestion: `Pitch verified benchmark data or submit software profile to ${cite.url} to match competitor citations.`
    });
    showToast(`Outreach task created in Action Center for ${cite.domain}!`, 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Quote className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Citation Intelligence & Citation Gap Engine
              </h2>
              <p className="text-xs text-slate-400">
                Track external third-party domains whose articles and benchmarks power LLM grounding.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 font-mono font-medium">
            19 High-Influence Sources Mapped
          </span>
        </div>
      </div>

      {/* Citation Gap Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Your Brand AI Citations</span>
          <div className="text-3xl font-extrabold text-white font-mono mt-1">{ourTotalCitations}</div>
          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +23% over 30 days
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Top Competitor Citations</span>
          <div className="text-3xl font-extrabold text-slate-300 font-mono mt-1">{competitorTotalCitations}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Indexed across 5 engines</span>
        </div>

        <div className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-600/30 rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] text-amber-400 uppercase font-bold">Citation Gap to Close</span>
          <div className="text-3xl font-extrabold text-amber-400 font-mono mt-1">{citationGap}</div>
          <span className="text-[11px] text-amber-300 mt-1 block font-medium">
            19 authoritative websites repeatedly influence AI answers in your category
          </span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-semibold">Context Type:</span>
          {['All', 'Product Comparison', 'Roundup List', 'Technical Review', 'Forum Discussion'].map((ctx) => (
            <button
              key={ctx}
              onClick={() => setFilterContext(ctx)}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterContext === ctx
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {ctx}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-semibold">Status:</span>
          {['All', 'Citing You', 'Opportunity', 'Competitor Only'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterStatus === st
                  ? 'bg-cyan-600 text-white font-semibold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Citations Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Influencing Source</th>
                <th className="py-2.5 px-3">Context Format</th>
                <th className="py-2.5 px-3">Authority Score</th>
                <th className="py-2.5 px-3">Your Citations</th>
                <th className="py-2.5 px-3">Competitor Citations</th>
                <th className="py-2.5 px-3">Influenced Engines</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((cite) => (
                <tr key={cite.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 max-w-xs">
                    <div className="font-semibold text-white">{cite.domain}</div>
                    <div className="text-[11px] text-slate-400 truncate max-w-xs" title={cite.pageTitle}>
                      {cite.pageTitle}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-medium">
                    {cite.contextType}
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-cyan-400">
                    {cite.authorityScore} / 100
                  </td>
                  <td className="py-3 px-3 font-mono font-semibold text-emerald-400">
                    {cite.citationCount}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-400">
                    {cite.competitorCitationsCount}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex flex-wrap gap-1">
                      {cite.influencingEngines.map((eng, idx) => (
                        <span key={idx} className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] text-slate-300">
                          {eng}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        cite.status === 'Citing You'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : cite.status === 'Opportunity'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {cite.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleCreateOutreachTask(cite)}
                      className="px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 font-semibold text-[11px] transition-colors"
                    >
                      Create Outreach
                    </button>
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
