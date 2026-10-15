import React, { useState } from 'react';
import {
  AlertOctagon,
  ShieldAlert,
  ArrowRight,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap
} from 'lucide-react';
import { VisibilityGapItem, ActionPlanItem } from '../types';
import { useToast } from '../components/Toast';

interface VisibilityGapsViewProps {
  gaps: VisibilityGapItem[];
  onAddAction: (action: Partial<ActionPlanItem>) => void;
}

export const VisibilityGapsView: React.FC<VisibilityGapsViewProps> = ({
  gaps,
  onAddAction
}) => {
  const { showToast } = useToast();
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');

  const filteredGaps = gaps.filter(g => {
    if (selectedSeverity !== 'All' && g.severity !== selectedSeverity) return false;
    return true;
  });

  const handleConvertToAction = (gap: VisibilityGapItem) => {
    onAddAction({
      title: `Resolve Gap: ${gap.category}`,
      category: gap.category.includes('comparison') ? 'Content' : gap.category.includes('schema') ? 'Technical AEO' : 'Authority / Citations',
      priority: gap.severity === 'Critical' || gap.severity === 'High' ? 'High' : 'Medium',
      difficulty: gap.difficulty,
      expectedImpact: gap.estimatedOpportunity,
      status: 'Draft',
      owner: 'Growth Team',
      aiSuggestion: gap.suggestedFix,
      proposedCodeOrBrief: `GAP CATEGORY: ${gap.category}\nPROBLEM: ${gap.description}\nREMEDY: ${gap.suggestedFix}`
    });
    showToast(`Task created in Action Center for "${gap.category}"!`, 'success');
  };

  return (
    <div className="space-y-5 animate-fade-in-up">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">
                  LUMENIQ Visibility Gap Engine
                </h2>
                <p className="text-xs text-slate-400">
                  Diagnose exactly why AI skips or omits your brand across 20 diagnostic vectors.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-300
                             border border-rose-500/30 font-bold font-mono">
              {gaps.filter(g => g.severity === 'Critical' || g.severity === 'High').length} High Priority
            </span>
            <span className="text-xs px-3 py-1.5 rounded-xl bg-slate-800 text-slate-400
                             border border-slate-700 font-semibold font-mono">
              {gaps.length} Total Gaps
            </span>
          </div>
        </div>
      </div>

      {/* Severity Filter */}
      <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-xs">
        <span className="text-slate-400 font-semibold">Filter Severity:</span>
        {['All', 'Critical', 'High', 'Medium', 'Low'].map((sev) => (
          <button
            key={sev}
            onClick={() => setSelectedSeverity(sev)}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
              selectedSeverity === sev
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {sev}
          </button>
        ))}
      </div>

      {/* Gaps Cards Grid */}
      <div className="space-y-4">
        {filteredGaps.map((gap, idx) => (
          <div
            key={gap.id}
            className={`p-5 rounded-2xl bg-slate-900 border border-slate-800
                        hover:border-slate-700 transition-all shadow-lg space-y-4
                        card-hover animate-fade-in-up stagger-${Math.min(idx + 1, 6)}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                      gap.severity === 'Critical'
                        ? 'badge-high'
                        : gap.severity === 'High'
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        : gap.severity === 'Medium'
                        ? 'badge-medium'
                        : 'badge-low'
                    }`}
                  >
                    {gap.severity === 'Critical' ? '🔴' : gap.severity === 'High' ? '🟠' : gap.severity === 'Medium' ? '🟡' : '🟢'} {gap.severity}
                  </span>
                  <span className="text-xs font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    {gap.category}
                  </span>
                  <span className="text-[10px] text-slate-500">Affects {gap.affectedQueriesCount} queries</span>
                </div>
                <h3 className="text-sm font-bold text-white leading-snug">
                  {gap.description}
                </h3>
              </div>

              {/* Impact / Confidence / Difficulty */}
              <div className="flex items-center gap-3 shrink-0 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono">
                <div className="text-center">
                  <span className="text-[10px] text-slate-400 uppercase block mb-1">Impact</span>
                  <div className="text-lg font-extrabold text-rose-400">{gap.impactScore}</div>
                  <div className="w-12 h-1 bg-slate-800 rounded-full mt-1">
                    <div className="h-full bg-rose-500 rounded-full progress-fill" style={{ width: `${gap.impactScore}%` }} />
                  </div>
                </div>
                <div className="border-l border-slate-800 pl-3 text-center">
                  <span className="text-[10px] text-slate-400 uppercase block mb-1">Confidence</span>
                  <div className="text-lg font-extrabold text-cyan-400">{gap.confidenceScore}%</div>
                  <div className="w-12 h-1 bg-slate-800 rounded-full mt-1">
                    <div className="h-full bg-cyan-500 rounded-full progress-fill" style={{ width: `${gap.confidenceScore}%` }} />
                  </div>
                </div>
                <div className="border-l border-slate-800 pl-3 text-center">
                  <span className="text-[10px] text-slate-400 uppercase block mb-1">Effort</span>
                  <div className={`text-sm font-extrabold ${
                    gap.difficulty === 'Easy' ? 'text-emerald-400' :
                    gap.difficulty === 'Medium' ? 'text-amber-400' : 'text-rose-400'
                  }`}>{gap.difficulty}</div>
                </div>
              </div>
            </div>

            {/* Suggested Fix and Action Button */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80
                            flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 block mb-1">
                  🔧 Recommended Remediation
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{gap.suggestedFix}</p>
                <span className="text-[11px] text-emerald-400 font-bold mt-1.5 block flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Estimated Opportunity: {gap.estimatedOpportunity}
                </span>
              </div>

              <button
                onClick={() => handleConvertToAction(gap)}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white
                           text-xs font-bold shadow-md shadow-blue-500/20 flex items-center
                           justify-center gap-1.5 transition-all shrink-0"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Create Action Task</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {filteredGaps.length === 0 && (
          <div className="py-16 text-center bg-slate-900 border border-slate-800 rounded-2xl">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No gaps at this severity level</h3>
            <p className="text-xs text-slate-400 mt-1">Try adjusting the filter or run a fresh AI scan.</p>
          </div>
        )}
      </div>
    </div>
  );
};
