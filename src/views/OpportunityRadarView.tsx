import React, { useState } from 'react';
import {
  Radar,
  TrendingDown,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Zap,
  RotateCw,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { OpportunityItem, ContentDecayItem, ActionPlanItem } from '../types';
import { useToast } from '../components/Toast';

interface OpportunityRadarViewProps {
  opportunities: OpportunityItem[];
  decayItems: ContentDecayItem[];
  onAddAction: (action: Partial<ActionPlanItem>) => void;
}

export const OpportunityRadarView: React.FC<OpportunityRadarViewProps> = ({
  opportunities,
  decayItems,
  onAddAction
}) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'radar' | 'decay'>('radar');

  const handleCreateOpportunityTask = (opp: OpportunityItem) => {
    onAddAction({
      title: `Capitalize on: ${opp.title}`,
      category: 'Content',
      priority: opp.impact === 'High' ? 'High' : 'Medium',
      difficulty: opp.difficulty,
      expectedImpact: opp.revenuePotential,
      status: 'Draft',
      owner: 'Growth Team',
      aiSuggestion: opp.recommendedAction,
      proposedCodeOrBrief: `OPPORTUNITY: ${opp.title}\nTRAFFIC POTENTIAL: ${opp.trafficPotential}\nREVENUE POTENTIAL: ${opp.revenuePotential}\nACTION: ${opp.recommendedAction}`
    });
    showToast('Opportunity task added to Action Center!', 'success');
  };

  const handleCreateDecayRefreshTask = (decay: ContentDecayItem) => {
    onAddAction({
      title: `Refresh Decaying Content: ${decay.pageTitle}`,
      category: 'Content',
      priority: 'High',
      difficulty: 'Easy',
      expectedImpact: `Recover lost citations (${decay.decayPercentage}% drop)`,
      status: 'Draft',
      owner: 'Content Growth Lead',
      aiSuggestion: decay.refreshAction,
      proposedCodeOrBrief: `TARGET URL: ${decay.pageUrl}\nPREVIOUS CITATIONS: ${decay.previousCitations} -> NOW: ${decay.currentCitations}\nDIAGNOSIS: ${decay.reason}\nREFRESH PLAN: ${decay.refreshAction}`
    });
    showToast('Content refresh task added to Action Center!', 'warning');
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Radar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                AI Opportunity Radar & Content Decay Engine
              </h2>
              <p className="text-xs text-slate-400">
                Identify surging commercial questions before competitors, and reverse citation drops on legacy content.
              </p>
            </div>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('radar')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'radar'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Opportunities ({opportunities.length})
          </button>
          <button
            onClick={() => setActiveTab('decay')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'decay'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Content Decay ({decayItems.length})
          </button>
        </div>
      </div>

      {/* Tab: Opportunities */}
      {activeTab === 'radar' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all shadow-lg flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {opp.category}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold font-mono">
                      {opp.impact} Impact
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white leading-snug">
                    {opp.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {opp.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="bg-slate-950 p-2 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Traffic</span>
                      <strong className="text-blue-400">{opp.trafficPotential}</strong>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Pipeline</span>
                      <strong className="text-emerald-400">{opp.revenuePotential}</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCreateOpportunityTask(opp)}
                    className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-500/20"
                  >
                    <span>Capture Opportunity</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Content Decay */}
      {activeTab === 'decay' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-900 border border-rose-500/30 rounded-2xl p-4 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 shrink-0">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">AI Content Decay Warning</h4>
              <p className="text-xs text-slate-300">
                Pages that previously generated consistent AI citations are losing ground because competitors published fresher 2026 data.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {decayItems.map((decay) => (
              <div
                key={decay.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      -{decay.decayPercentage}% Citations Lost
                    </span>
                    <span className="text-xs text-slate-400 font-mono truncate">{decay.pageUrl}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{decay.pageTitle}</h3>
                  <p className="text-xs text-slate-300">
                    <strong>Diagnosis:</strong> {decay.reason}
                  </p>
                  <p className="text-[11px] text-cyan-400 font-medium">
                    <strong>Action:</strong> {decay.refreshAction}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right font-mono text-xs hidden sm:block">
                    <div className="text-slate-400">Previous: <strong className="text-slate-200">{decay.previousCitations}</strong></div>
                    <div className="text-rose-400">Now: <strong>{decay.currentCitations}</strong></div>
                  </div>

                  <button
                    onClick={() => handleCreateDecayRefreshTask(decay)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/20"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Create Refresh Plan</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
