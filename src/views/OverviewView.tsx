import React from 'react';
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Quote,
  Users,
  Compass,
  DollarSign,
  ChevronRight,
  Target,
  ExternalLink,
  Zap,
  Activity,
  Globe,
  BarChart3,
  ShieldCheck
} from 'lucide-react';
import {
  Workspace,
  ScoreDimensions,
  ShareOfVoiceItem,
  MonitoredQuery,
  ActionPlanItem,
  VisibilityGapItem,
  CompetitorMoveAlert,
  TrafficByEngine
} from '../types';
import { NavTab } from '../components/Sidebar';
import { ScoreGauge } from '../components/ScoreGauge';

interface OverviewViewProps {
  workspace: Workspace;
  scoreDimensions: ScoreDimensions;
  shareOfVoice: ShareOfVoiceItem[];
  queries: MonitoredQuery[];
  actions: ActionPlanItem[];
  gaps: VisibilityGapItem[];
  competitorMoves: CompetitorMoveAlert[];
  trafficByEngine: TrafficByEngine[];
  onNavigate: (tab: NavTab) => void;
  onRunScan: () => void;
  onOpenReport: () => void;
}

const ENGINE_ICONS: Record<string, string> = {
  'Perplexity': '🔍',
  'ChatGPT': '🤖',
  'Gemini': '✨',
  'Claude': '🧠',
  'Copilot': '🪄',
};

const STATUS_STYLES: Record<string, string> = {
  Draft:     'badge-draft',
  Review:    'badge-review',
  Approved:  'badge-approved',
  Executing: 'badge-executing',
  Published: 'badge-published',
  Rejected:  'badge-rejected',
};

export const OverviewView: React.FC<OverviewViewProps> = ({
  workspace,
  scoreDimensions,
  shareOfVoice,
  queries,
  actions,
  gaps,
  competitorMoves,
  trafficByEngine,
  onNavigate,
  onRunScan,
  onOpenReport
}) => {
  // Weighted overall calculation
  const overallScore = Math.round(
    scoreDimensions.mentionVisibility * 0.20 +
    scoreDimensions.recommendationStrength * 0.25 +
    scoreDimensions.citationStrength * 0.20 +
    scoreDimensions.competitiveShare * 0.15 +
    scoreDimensions.queryCoverage * 0.10 +
    scoreDimensions.aiReferralQuality * 0.10
  );

  const totalReferrals = trafficByEngine.reduce((acc, curr) => acc + curr.visits, 0);
  const totalRevenue   = trafficByEngine.reduce((acc, curr) => acc + curr.revenueInfluenced, 0);
  const totalLeads     = trafficByEngine.reduce((acc, curr) => acc + curr.leadsGenerated, 0);

  const dimensionList = [
    { key: 'mentionVisibility',      label: 'Mention Visibility',      value: scoreDimensions.mentionVisibility,      weight: '20%', color: 'from-blue-500 to-cyan-400' },
    { key: 'recommendationStrength', label: 'Recommendation Strength', value: scoreDimensions.recommendationStrength, weight: '25%', color: 'from-indigo-500 to-blue-400' },
    { key: 'citationStrength',       label: 'Citation Strength',       value: scoreDimensions.citationStrength,       weight: '20%', color: 'from-violet-500 to-indigo-400' },
    { key: 'competitiveShare',       label: 'Competitive Share',       value: scoreDimensions.competitiveShare,       weight: '15%', color: 'from-cyan-500 to-teal-400' },
    { key: 'queryCoverage',          label: 'Query Coverage',          value: scoreDimensions.queryCoverage,          weight: '10%', color: 'from-emerald-500 to-green-400' },
    { key: 'aiReferralQuality',      label: 'AI Referral Quality',     value: scoreDimensions.aiReferralQuality,      weight: '10%', color: 'from-amber-500 to-yellow-400' },
  ];

  return (
    <div className="space-y-5 animate-fade-in-up">

      {/* ── Competitor Alert Banner ─────────────────────────────── */}
      {competitorMoves.length > 0 && (
        <div className="bg-gradient-to-r from-amber-950/50 via-amber-900/25 to-slate-900/80 border border-amber-600/35
                        rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3
                        shadow-lg animate-slide-up stagger-1">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 shrink-0 animate-pulse-glow">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
                  ⚡ Competitor Move Detected
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{competitorMoves[0].date}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  competitorMoves[0].urgency === 'Immediate' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {competitorMoves[0].urgency}
                </span>
              </div>
              <p className="text-xs text-slate-200 font-medium mt-1">
                <strong className="text-amber-300">{competitorMoves[0].competitor}</strong>: {competitorMoves[0].change}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">{competitorMoves[0].reason}</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('competitors')}
            className="px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-xs font-bold
                       border border-amber-500/40 transition-all shrink-0 self-start sm:self-center card-hover"
          >
            Review Response →
          </button>
        </div>
      )}

      {/* ── Hero Grid: Score Gauge + Metrics ────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Score Card (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 lg:p-6
                        shadow-xl relative overflow-hidden flex flex-col justify-between
                        card-hover animate-fade-in-up stagger-1">
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-indigo-600/6 rounded-full blur-3xl pointer-events-none -ml-10 -mb-10" />

          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/25
                                flex items-center justify-center text-blue-400">
                  <Activity className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white tracking-tight">
                    LUMENIQ AI Visibility Score
                  </h2>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    6-dimension evaluation across ChatGPT, Perplexity, Gemini, Claude & Copilot
                  </p>
                </div>
              </div>
              <button
                onClick={onOpenReport}
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1
                           font-semibold transition-colors group"
              >
                <span>Full Audit</span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Gauge + Summary */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 py-1">
              <div className="relative shrink-0">
                <ScoreGauge
                  score={overallScore}
                  size={148}
                  strokeWidth={11}
                  trend="+8 pts"
                  trendPositive={true}
                />
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2 text-xs flex-wrap">
                  <span className="font-semibold text-slate-300">Current Status:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/12 text-blue-300
                                   font-bold border border-blue-500/25 text-[11px]">
                    High Commercial Visibility
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Cited in <strong className="text-white">82% of monitored commercial queries</strong>,
                  but losing direct recommendations to competitors on comparison pages
                  due to missing third-party benchmark tables.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-slate-950/60 rounded-xl p-2.5 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Accuracy</div>
                    <div className="text-base font-extrabold text-white font-mono mt-0.5">88%</div>
                  </div>
                  <div className="bg-slate-950/60 rounded-xl p-2.5 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Forecast 30d</div>
                    <div className="text-base font-extrabold text-emerald-400 font-mono mt-0.5">+12 pts</div>
                  </div>
                  <div className="bg-slate-950/60 rounded-xl p-2.5 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Monitored</div>
                    <div className="text-base font-extrabold text-cyan-400 font-mono mt-0.5">{queries.length} Q</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 6 Dimension Progress Bars */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-5 border-t border-slate-800 mt-5">
            {dimensionList.map((dim, idx) => (
              <div
                key={idx}
                className={`bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80
                            hover:border-slate-700 transition-all cursor-default animate-fade-in-up stagger-${idx + 1}`}
                data-tooltip={`${dim.label}: ${dim.value}/100 (Weight: ${dim.weight})`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="text-slate-400 font-medium truncate pr-1">{dim.label}</span>
                  <span className="font-extrabold text-white font-mono">{dim.value}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full progress-fill bg-gradient-to-r ${dim.color}`}
                    style={{ width: `${dim.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Revenue + Query Lab CTA */}
        <div className="lg:col-span-5 flex flex-col gap-4">

          {/* AI Revenue Influence Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl
                          relative overflow-hidden flex-1 flex flex-col justify-between
                          card-hover animate-fade-in-up stagger-2">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/6 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25
                                flex items-center justify-center text-emerald-400">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">AI Search Revenue Influence</h3>
                  <p className="text-[11px] text-slate-400">Multi-touch attribution · AI citations → closed deals</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('traffic-revenue')}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
              >
                Funnel →
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5 my-2">
              {[
                { label: 'Revenue', value: `$${Math.round(totalRevenue / 1000)}K`, color: 'text-emerald-400', trend: '+28% MoM' },
                { label: 'AI Visits', value: totalReferrals.toLocaleString(), color: 'text-white', trend: '+41% MoM' },
                { label: 'AI Leads', value: totalLeads, color: 'text-cyan-400', trend: '6.1% Conv.' },
              ].map((m, idx) => (
                <div key={idx} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">{m.label}</div>
                  <div className={`text-lg font-extrabold font-mono mt-0.5 ${m.color}`}>{m.value}</div>
                  <div className="text-[10px] text-emerald-400 font-medium mt-0.5 flex items-center gap-0.5">
                    <ArrowUpRight className="w-2.5 h-2.5" /> {m.trend}
                  </div>
                </div>
              ))}
            </div>

            {/* Engine breakdown mini-list */}
            <div className="space-y-1.5 pt-2.5 border-t border-slate-800/80">
              {trafficByEngine.slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    {item.engine}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-mono text-[11px]">{item.visits.toLocaleString()} visits</span>
                    <span className="text-emerald-400 font-semibold font-mono text-[11px]">
                      ${item.revenueInfluenced.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Query Lab CTA */}
          <div className="bg-gradient-to-br from-indigo-950/70 via-blue-950/50 to-slate-900/90
                          border border-indigo-500/30 rounded-2xl p-4 flex items-center
                          justify-between gap-3 shadow-lg card-hover animate-fade-in-up stagger-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30
                              text-indigo-400 shrink-0 animate-float">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Query Lab Simulator</h4>
                <p className="text-[11px] text-slate-300 leading-snug mt-0.5">
                  Why did AI recommend your competitor instead of you?
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('query-lab')}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white
                         text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all shrink-0"
            >
              Simulate →
            </button>
          </div>
        </div>
      </div>

      {/* ── Optimization Loop ────────────────────────────────────── */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 lg:p-5
                      shadow-lg animate-fade-in-up stagger-2">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              LUMENIQ Continuous Optimization Loop
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              From visibility diagnosis to verified revenue impact
            </p>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-blue-500/12 text-blue-400
                           font-mono font-bold border border-blue-500/20">
            Active: Step 4 — Prioritize
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {[
            { step: '1', label: 'Discover', desc: 'Identify high-intent buyer prompts', done: true },
            { step: '2', label: 'Measure',  desc: 'Benchmark mentions & citations',    done: true },
            { step: '3', label: 'Diagnose', desc: 'Isolate why competitors win',       done: true },
            { step: '4', label: 'Prioritize',desc: 'Rank gaps by revenue impact',     current: true },
            { step: '5', label: 'Optimize', desc: 'Generate briefs & JSON-LD schema', next: true },
            { step: '6', label: 'Publish',  desc: 'Human approval & CMS sync',        next: true },
            { step: '7', label: 'Impact',   desc: 'Verify AI citation surge',          next: true },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-xl border text-xs transition-all
                ${item.done
                  ? 'bg-slate-950/70 border-blue-500/25 text-slate-200'
                  : item.current
                  ? 'bg-blue-600/18 border-blue-500 text-white font-bold glow-blue animate-border-pulse'
                  : 'bg-slate-950/30 border-slate-800/60 text-slate-500'
                }`}
            >
              <div className="font-black text-[11px] flex items-center justify-center gap-1 mb-1">
                {item.done
                  ? <CheckCircle2 className="w-3 h-3 text-blue-400" />
                  : item.current
                  ? <Sparkles className="w-3 h-3 text-blue-300 animate-pulse" />
                  : <span className="w-3 h-3 rounded-full border border-current inline-block" />
                }
                {item.step}. {item.label}
              </div>
              <p className="text-[10px] text-current opacity-60 text-center leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mid Grid: Share of Voice + Action Center ─────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* AI Share of Voice */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5
                        shadow-lg card-hover animate-fade-in-up stagger-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-white">AI Share of Voice (SOV)</h3>
            </div>
            <button
              onClick={() => onNavigate('competitors')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              Competitor Radar →
            </button>
          </div>
          <p className="text-[11px] text-slate-400 mb-4">
            Percentage of AI recommendations & citations across high-intent queries.
          </p>

          {/* Stacked bar */}
          <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden flex mb-4 shadow-inner">
            {shareOfVoice.map((sov) => (
              <div
                key={sov.id}
                style={{ width: `${sov.percentage}%`, backgroundColor: sov.color }}
                className="h-full transition-all duration-700 hover:opacity-90 cursor-pointer"
                title={`${sov.name}: ${sov.percentage}%`}
              />
            ))}
          </div>

          <div className="space-y-2">
            {shareOfVoice.map((sov) => (
              <div
                key={sov.id}
                className={`flex items-center justify-between p-2.5 rounded-xl border text-xs
                            transition-all hover:border-slate-600
                  ${sov.isTarget
                    ? 'bg-blue-950/20 border-blue-500/30 text-white'
                    : 'bg-slate-950/40 border-slate-800/80 text-slate-300'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: sov.color }} />
                  <span className="font-medium">{sov.name}</span>
                  {sov.isTarget && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/20
                                     text-blue-300 font-bold border border-blue-500/30">
                      You
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono font-extrabold text-white">{sov.percentage}%</span>
                  <span className={`text-[11px] font-mono font-bold flex items-center gap-0.5
                    ${sov.trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}
                  >
                    {sov.trend.startsWith('+')
                      ? <ArrowUpRight className="w-3 h-3" />
                      : <ArrowDownRight className="w-3 h-3" />}
                    {sov.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 mt-3 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Primary Challenger: <strong className="text-white">Mixpanel (28%)</strong></span>
            <span className="text-emerald-400 font-semibold">Gap closing +2.3%/mo</span>
          </div>
        </div>

        {/* Action Center Queue */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5
                        shadow-lg card-hover animate-fade-in-up stagger-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Action Center</h3>
            </div>
            <button
              onClick={() => onNavigate('action-center')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              View All ({actions.length}) →
            </button>
          </div>
          <p className="text-[11px] text-slate-400 mb-3">
            Human-in-the-loop: every task requires explicit signoff before publication.
          </p>

          <div className="space-y-2">
            {actions.slice(0, 3).map((act, idx) => (
              <div
                key={act.id}
                className={`p-3 rounded-xl bg-slate-950/60 border border-slate-800
                            hover:border-slate-700 transition-all text-xs
                            animate-fade-in-up stagger-${idx + 1}`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="font-semibold text-slate-100 line-clamp-1">{act.title}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide shrink-0 ${STATUS_STYLES[act.status] || 'badge-draft'}`}>
                    {act.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2">{act.aiSuggestion}</p>
                <div className="flex items-center justify-between mt-2 pt-2
                                border-t border-slate-800/80 text-[10px] text-slate-400">
                  <span className="text-cyan-400 font-bold">{act.expectedImpact}</span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    {act.owner}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 mt-3 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              <span className="text-rose-400 font-bold">{gaps.filter(g => g.severity === 'High' || g.severity === 'Critical').length}</span> high-priority gaps awaiting action
            </span>
            <button
              onClick={() => onNavigate('action-center')}
              className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
            >
              Manage Tasks →
            </button>
          </div>
        </div>
      </div>

      {/* ── Live Monitored Queries Table ─────────────────────────── */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-lg
                      animate-fade-in-up stagger-5 overflow-hidden">
        <div className="flex items-center justify-between p-5 pb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse-glow" />
              Live Monitored AI Queries
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Real-time visibility across ChatGPT, Perplexity, Gemini, Claude & Copilot
            </p>
          </div>
          <button
            onClick={() => onNavigate('query-lab')}
            className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 transition-colors group"
          >
            <span>Open Query Lab</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] font-bold
                              border-t border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-4">Query</th>
                <th className="py-2.5 px-3">Intent</th>
                <th className="py-2.5 px-3">Your Rank</th>
                <th className="py-2.5 px-3">Perplexity</th>
                <th className="py-2.5 px-3">ChatGPT</th>
                <th className="py-2.5 px-3">Gemini</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {queries.slice(0, 5).map((q, idx) => (
                <tr
                  key={q.id}
                  className={`table-row-hover transition-all animate-fade-in-up stagger-${idx + 1}`}
                >
                  <td className="py-3 px-4 font-medium text-slate-200 max-w-xs">
                    <p className="line-clamp-1">{q.query}</p>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border
                      ${q.intent === 'Commercial'    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25' :
                        q.intent === 'Comparison'    ? 'bg-blue-500/10 text-blue-300 border-blue-500/25' :
                        q.intent === 'Alternatives'  ? 'bg-violet-500/10 text-violet-300 border-violet-500/25' :
                        q.intent === 'Transactional' ? 'bg-amber-500/10 text-amber-300 border-amber-500/25' :
                        'bg-slate-700 text-slate-300 border-slate-600'
                      }`}
                    >
                      {q.intent}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-extrabold font-mono">
                    {q.ourRank === 1
                      ? <span className="text-emerald-400 flex items-center gap-0.5"><CheckCircle2 className="w-3 h-3" /> #1 Winner</span>
                      : <span className="text-amber-400">#{q.ourRank}</span>
                    }
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-mono text-[11px]">
                    <span className={q.engineVisibility.perplexity.includes('Recommended') ? 'text-emerald-400 font-semibold' : ''}>
                      {q.engineVisibility.perplexity}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-mono text-[11px]">
                    <span className={q.engineVisibility.chatgpt.includes('Recommended') ? 'text-emerald-400 font-semibold' : ''}>
                      {q.engineVisibility.chatgpt}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-mono text-[11px]">
                    <span className={q.engineVisibility.gemini.includes('Recommended') ? 'text-emerald-400 font-semibold' : ''}>
                      {q.engineVisibility.gemini}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onNavigate('query-lab')}
                      className="px-2.5 py-1 rounded-lg bg-blue-600/15 hover:bg-blue-600/25
                                 text-blue-300 font-bold text-[11px] transition-all border border-blue-600/20
                                 hover:border-blue-500/40"
                    >
                      Inspect →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            Showing 5 of {queries.length} monitored queries
          </span>
          <button
            onClick={() => onNavigate('query-lab')}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors"
          >
            View All in Query Lab →
          </button>
        </div>
      </div>

      {/* ── Quick Stats Footer Row ────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-in-up stagger-6">
        {[
          { icon: <Globe className="w-4 h-4" />, label: 'AI Engines Monitored', value: '5', color: 'text-blue-400 bg-blue-500/10 border-blue-500/25' },
          { icon: <BarChart3 className="w-4 h-4" />, label: 'Active Visibility Gaps', value: gaps.length.toString(), color: 'text-rose-400 bg-rose-500/10 border-rose-500/25' },
          { icon: <ShieldCheck className="w-4 h-4" />, label: 'Brand Accuracy Score', value: `${scoreDimensions.accuracyScore}%`, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25' },
          { icon: <Quote className="w-4 h-4" />, label: 'Citation Authority', value: `${scoreDimensions.citationStrength}/100`, color: 'text-violet-400 bg-violet-500/10 border-violet-500/25' },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center
                       gap-3 shadow-md card-hover"
          >
            <div className={`p-2 rounded-xl border shrink-0 ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <div className="text-xl font-extrabold text-white font-mono">{stat.value}</div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5 leading-tight">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
