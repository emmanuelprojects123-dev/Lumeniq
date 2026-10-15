import React, { useState } from 'react';
import {
  Users,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  ShieldAlert,
  Zap,
  Plus,
  Compass,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { ShareOfVoiceItem, CompetitorMoveAlert } from '../types';

interface CompetitorsViewProps {
  shareOfVoice: ShareOfVoiceItem[];
  competitorMoves: CompetitorMoveAlert[];
  onAddCompetitor: (name: string) => void;
  onCreateResponseAction: (move: CompetitorMoveAlert) => void;
}

export const CompetitorsView: React.FC<CompetitorsViewProps> = ({
  shareOfVoice,
  competitorMoves,
  onAddCompetitor,
  onCreateResponseAction
}) => {
  const [newCompetitorName, setNewCompetitorName] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>('Mixpanel');

  const competitorsComparison = [
    {
      name: 'PulseMetrics (You)',
      sov: '31%',
      mentions: 842,
      recommendations: 512,
      citations: 182,
      authorityScore: 84,
      sentiment: '88% Pos',
      topAdvantage: 'Lowest query latency & developer ergonomics',
      topWeakness: 'Fewer 3rd-party review citations on Capterra'
    },
    {
      name: 'Mixpanel',
      sov: '28%',
      mentions: 790,
      recommendations: 540,
      citations: 284,
      authorityScore: 92,
      sentiment: '74% Pos',
      topAdvantage: 'High historical G2 review volume & partner badges',
      topWeakness: 'Negative user sentiment on complex overage billing'
    },
    {
      name: 'Amplitude',
      sov: '22%',
      mentions: 610,
      recommendations: 430,
      citations: 210,
      authorityScore: 89,
      sentiment: '79% Pos',
      topAdvantage: 'Strong enterprise cohort analysis branding',
      topWeakness: 'Omitted on fast SDK and quick-start queries'
    },
    {
      name: 'Datadog Analytics',
      sov: '12%',
      mentions: 380,
      recommendations: 220,
      citations: 140,
      authorityScore: 94,
      sentiment: '82% Pos',
      topAdvantage: 'Unified APM + logs ecosystem halo',
      topWeakness: 'Perceived as bloated and high cost for pure product teams'
    }
  ];

  const handleAdd = () => {
    if (newCompetitorName.trim()) {
      onAddCompetitor(newCompetitorName.trim());
      setNewCompetitorName('');
      setShowAddModal(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                AI Competitor Radar & Share of Voice
              </h2>
              <p className="text-xs text-slate-400">
                Track how AI engines position your brand against rivals, detect tactical moves, and counter visibility theft.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-purple-600/20 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Competitor</span>
        </button>
      </div>

      {/* Competitor Move Alerts Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Real-Time Competitor Move Alerts</span>
          </h3>
          <span className="text-[10px] text-slate-400">Continuous AI Search Crawl Monitoring</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {competitorMoves.map((move) => (
            <div
              key={move.id}
              className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/30 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-amber-400">{move.competitor}</span>
                  <span className="text-[10px] text-slate-400">{move.date}</span>
                </div>
                <h4 className="text-xs font-bold text-white leading-snug">{move.change}</h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  <strong>Trigger:</strong> {move.reason}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <div className="text-[11px] text-slate-300 font-medium line-clamp-1">
                  Response: {move.recommendedResponse}
                </div>
                <button
                  onClick={() => onCreateResponseAction(move)}
                  className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold transition-all shrink-0"
                >
                  Create Response Task
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Competitor Radar Comparison Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
          <Compass className="w-4 h-4 text-cyan-400" />
          <span>Multi-Engine Competitor Radar Matrix</span>
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Detailed metrics across Mentions, Direct Recommendations, Citations, and Sentiment.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Brand</th>
                <th className="py-2.5 px-3">AI SOV</th>
                <th className="py-2.5 px-3">Monthly Mentions</th>
                <th className="py-2.5 px-3">Direct Recoms</th>
                <th className="py-2.5 px-3">Verified Citations</th>
                <th className="py-2.5 px-3">Sentiment</th>
                <th className="py-2.5 px-3">AI Advantage</th>
                <th className="py-2.5 px-3">Visibility Vulnerability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {competitorsComparison.map((comp, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-slate-800/40 transition-colors ${
                    comp.name.includes('(You)') ? 'bg-blue-950/20' : ''
                  }`}
                >
                  <td className="py-3 px-3 font-semibold text-white flex items-center gap-1.5">
                    {comp.name}
                    {comp.name.includes('(You)') && (
                      <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                    )}
                  </td>
                  <td className="py-3 px-3 font-bold font-mono text-cyan-300">{comp.sov}</td>
                  <td className="py-3 px-3 font-mono text-slate-300">{comp.mentions}</td>
                  <td className="py-3 px-3 font-mono text-emerald-400 font-semibold">{comp.recommendations}</td>
                  <td className="py-3 px-3 font-mono text-slate-300">{comp.citations}</td>
                  <td className="py-3 px-3 font-mono text-emerald-300">{comp.sentiment}</td>
                  <td className="py-3 px-3 text-slate-300 text-[11px] max-w-xs">{comp.topAdvantage}</td>
                  <td className="py-3 px-3 text-rose-300 text-[11px] max-w-xs">{comp.topWeakness}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Competitor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Track New Competitor</h3>
            <p className="text-xs text-slate-300">
              LUMENIQ will simulate visibility on all buyer prompts to detect where this brand is recommended instead of you.
            </p>
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Competitor Name or Domain</label>
              <input
                type="text"
                value={newCompetitorName}
                onChange={(e) => setNewCompetitorName(e.target.value)}
                placeholder="e.g. PostHog, Heap, FullStory"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold"
              >
                Start Tracking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
