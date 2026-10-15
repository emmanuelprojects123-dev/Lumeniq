import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCw,
  Info
} from 'lucide-react';
import { FactCheckItem, ActionPlanItem } from '../types';
import { runBrandFactCheck } from '../services/api';
import { useToast } from '../components/Toast';

interface BrandAccuracyViewProps {
  factChecks: FactCheckItem[];
  brandName: string;
  website: string;
  onAddAction: (action: Partial<ActionPlanItem>) => void;
}

export const BrandAccuracyView: React.FC<BrandAccuracyViewProps> = ({
  factChecks,
  brandName,
  website,
  onAddAction
}) => {
  const { showToast } = useToast();
  const [isVerifying, setIsVerifying] = useState(false);
  const [items, setItems] = useState<FactCheckItem[]>(factChecks);

  const handleRunVerification = async () => {
    setIsVerifying(true);
    try {
      const data = await runBrandFactCheck(brandName, website);
      if (data && data.hallucinations) {
        const mapped: FactCheckItem[] = data.hallucinations.map((h: any) => ({
          id: h.id || `fact-${Date.now()}`,
          topic: h.topic,
          engine: h.engine,
          hallucinatedText: h.hallucinatedText,
          verifiedTruth: h.verifiedTruth,
          severity: h.severity,
          detectedDate: 'Just now',
          fixStatus: 'Action Required',
          remedy: h.fixAction
        }));
        setItems(mapped);
      }
    } catch (err) {
      console.error('Fact check run error:', err);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCreateRemediation = (fact: FactCheckItem) => {
    onAddAction({
      title: `Correct AI Hallucination on ${fact.topic}`,
      category: 'Brand Accuracy',
      priority: fact.severity === 'High' ? 'High' : 'Medium',
      difficulty: 'Easy',
      expectedImpact: `Eliminate false claims on ${fact.engine}`,
      status: 'Draft',
      owner: 'Product Marketing',
      aiSuggestion: fact.remedy,
      proposedCodeOrBrief: `ISSUE: ${fact.engine} falsely states: "${fact.hallucinatedText}"\nVERIFIED REALITY: "${fact.verifiedTruth}"\nACTION: ${fact.remedy}`
    });
    showToast(`Remediation task created in Action Center for ${fact.topic}!`, 'warning');
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">
                  AI Brand Accuracy Monitor & Fact Checker
                </h2>
                <p className="text-xs text-slate-400">
                  Detect and remediate AI hallucinations regarding your pricing, security, features, and company information.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleRunVerification}
            disabled={isVerifying}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 shrink-0"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
            <span>{isVerifying ? 'Testing AI Grounding...' : 'Rescan Accuracy'}</span>
          </button>
        </div>
      </div>

      {/* Accuracy Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Overall AI Accuracy Score</span>
          <div className="text-3xl font-extrabold text-cyan-400 font-mono mt-1">88 / 100</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Tested across 5 LLM platforms</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Flagged False Claims</span>
          <div className="text-3xl font-extrabold text-rose-400 font-mono mt-1">{items.length}</div>
          <span className="text-[11px] text-rose-300 font-medium mt-1 block">
            Immediate remediation recommended
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Pricing Precision Rate</span>
          <div className="text-3xl font-extrabold text-amber-400 font-mono mt-1">78%</div>
          <span className="text-[11px] text-amber-300 font-medium mt-1 block">
            Missing JSON-LD Offer schema
          </span>
        </div>
      </div>

      {/* Hallucinations List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>Active Detected Hallucinations & Inaccuracies</span>
        </h3>

        {items.map((fact) => (
          <div
            key={fact.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all shadow-lg space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{fact.topic}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  Engine: {fact.engine}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  fact.severity === 'High' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {fact.severity} Severity
                </span>
                <span className="text-slate-400">{fact.detectedDate}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-1">
                  AI Hallucinated / Incorrect Claim:
                </span>
                <p className="text-rose-200 leading-relaxed font-medium">
                  &ldquo;{fact.hallucinatedText}&rdquo;
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                  Verified Brand Truth:
                </span>
                <p className="text-emerald-200 leading-relaxed font-medium">
                  {fact.verifiedTruth}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-0.5">
                  Remediation Action:
                </span>
                <p className="text-slate-300">{fact.remedy}</p>
              </div>

              <button
                onClick={() => handleCreateRemediation(fact)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 transition-all shrink-0"
              >
                <span>Deploy Fix to Action Center</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
