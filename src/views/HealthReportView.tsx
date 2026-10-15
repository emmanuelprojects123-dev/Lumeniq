import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Share2,
  Download,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  Building,
  Quote,
  Users
} from 'lucide-react';
import {
  Workspace,
  ScoreDimensions,
  ShareOfVoiceItem,
  MonitoredQuery,
  ActionPlanItem,
  VisibilityGapItem
} from '../types';

interface HealthReportViewProps {
  workspace: Workspace;
  scoreDimensions: ScoreDimensions;
  shareOfVoice: ShareOfVoiceItem[];
  queries: MonitoredQuery[];
  actions: ActionPlanItem[];
  gaps: VisibilityGapItem[];
  brandName: string;
}

export const HealthReportView: React.FC<HealthReportViewProps> = ({
  workspace,
  scoreDimensions,
  shareOfVoice,
  queries,
  actions,
  gaps,
  brandName
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const overallScore = Math.round(
    scoreDimensions.mentionVisibility * 0.2 +
    scoreDimensions.recommendationStrength * 0.25 +
    scoreDimensions.citationStrength * 0.2 +
    scoreDimensions.competitiveShare * 0.15 +
    scoreDimensions.queryCoverage * 0.1 +
    scoreDimensions.aiReferralQuality * 0.1
  );

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`https://lumeniq.ai/reports/v/${workspace.id}-health-audit`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg print:hidden">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Signature LUMENIQ AI Search Health Report
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share Public URL'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Export PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 text-slate-100">
        {/* Cover / Header */}
        <div className="border-b border-slate-800 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white font-black text-sm">
                L
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">LUMENIQ</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                AEO Enterprise Audit
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Search Visibility & Health Report
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Comprehensive diagnosis of how AI answer systems discover, evaluate, and recommend <strong>{workspace.name}</strong>.
            </p>
          </div>

          <div className="text-right sm:text-right font-mono text-xs text-slate-400 shrink-0">
            <div>Audit Date: <strong>{new Date().toLocaleDateString()}</strong></div>
            <div>Target Domain: <strong className="text-cyan-400">{workspace.website}</strong></div>
            <div>Industry: <strong className="text-slate-300">{workspace.industry}</strong></div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <span>1. Executive Summary</span>
          </h2>
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
            <p>
              <strong>{workspace.name}</strong> holds an overall <strong>LUMENIQ AI Visibility Score of {overallScore}/100</strong>, placing the company in the upper 25th percentile for {workspace.industry}. AI engines (ChatGPT, Perplexity, Gemini, Claude, and Copilot) have strong entity awareness of your product suite.
            </p>
            <p>
              However, on high-intent commercial comparison queries, direct recommendations are predominantly awarded to incumbent competitors (Mixpanel, Amplitude) because they maintain structured comparison content and higher citation density on third-party review platforms. By addressing the 3 high-priority actions detailed in this report, the projected AI visibility score is estimated to rise to <strong>86/100 (+12 pts)</strong> within 30 days.
            </p>
          </div>
        </div>

        {/* Section 2: Core Score Breakdown */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <span>2. Proprietary AI Visibility Score Matrix</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'Mention Visibility', val: scoreDimensions.mentionVisibility },
              { label: 'Recommendation Strength', val: scoreDimensions.recommendationStrength },
              { label: 'Citation Quality', val: scoreDimensions.citationStrength },
              { label: 'Competitive Share', val: scoreDimensions.competitiveShare },
              { label: 'Query Coverage', val: scoreDimensions.queryCoverage },
              { label: 'AI Referral Quality', val: scoreDimensions.aiReferralQuality },
            ].map((d, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">{d.label}</span>
                <div className="text-xl font-extrabold text-white font-mono mt-1">{d.val} / 100</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Competitive Share of Voice */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <span>3. AI Share of Voice (SOV) Benchmark</span>
          </h2>
          <div className="space-y-2">
            {shareOfVoice.map((sov) => (
              <div key={sov.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sov.color }} />
                  <span className="font-semibold text-white">{sov.name}</span>
                </div>
                <div className="flex items-center gap-4 font-mono">
                  <span className="text-cyan-300 font-bold">{sov.percentage}%</span>
                  <span className="text-slate-400">{sov.mentionsCount} Mentions</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Critical Action Plan */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <span>4. Prioritized Strategic Action Plan</span>
          </h2>
          <div className="space-y-2.5">
            {actions.map((act) => (
              <div key={act.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{act.title}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-blue-500/20 text-blue-300">
                    {act.priority} Priority
                  </span>
                </div>
                <p className="text-slate-400 text-[11px]">{act.aiSuggestion}</p>
                <div className="pt-2 flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Impact: {act.expectedImpact}</span>
                  <span>Owner: {act.owner}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Signoff */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Generated by LUMENIQ AI Search Optimization Platform</span>
          <span>Confidential Client Health Audit</span>
        </div>
      </div>
    </div>
  );
};
