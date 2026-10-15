import React, { useState } from 'react';
import {
  Eye,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Info,
  Layers,
  BarChart3
} from 'lucide-react';
import { ScoreDimensions, TimeRange } from '../types';
import { ScoreGauge } from '../components/ScoreGauge';

interface AIVisibilityViewProps {
  scoreDimensions: ScoreDimensions;
  timeRange: TimeRange;
  onChangeTimeRange: (range: TimeRange) => void;
  brandName: string;
}

export const AIVisibilityView: React.FC<AIVisibilityViewProps> = ({
  scoreDimensions,
  timeRange,
  onChangeTimeRange,
  brandName
}) => {
  const [selectedDimension, setSelectedDimension] = useState<string>('recommendationStrength');

  const overallScore = Math.round(
    scoreDimensions.mentionVisibility * 0.2 +
    scoreDimensions.recommendationStrength * 0.25 +
    scoreDimensions.citationStrength * 0.2 +
    scoreDimensions.competitiveShare * 0.15 +
    scoreDimensions.queryCoverage * 0.1 +
    scoreDimensions.aiReferralQuality * 0.1
  );

  const dimensionCards = [
    {
      id: 'mentionVisibility',
      title: 'Mention Visibility Rate',
      score: scoreDimensions.mentionVisibility,
      weight: '20%',
      benchmark: 'Top 15% in SaaS',
      status: 'Strong',
      description: 'The probability that an AI answer names your company when responding to relevant industry queries.',
      recommendation: 'Target high-volume informational questions to expand raw mention footprint.'
    },
    {
      id: 'recommendationStrength',
      title: 'Recommendation Strength',
      score: scoreDimensions.recommendationStrength,
      weight: '25%',
      benchmark: 'Needs Focus (68/100)',
      status: 'Opportunity',
      description: 'How frequently the AI explicitly recommends your product as the preferred choice over competitors.',
      recommendation: 'Publish comprehensive comparison pages with verified benchmarks to win direct recommendation preference.'
    },
    {
      id: 'citationStrength',
      title: 'Citation Strength & Quality',
      score: scoreDimensions.citationStrength,
      weight: '20%',
      benchmark: 'Strong (76/100)',
      status: 'Strong',
      description: 'The number and domain authority of external websites referenced as sources when AI cites your brand.',
      recommendation: 'Expand PR presence on top-tier publisher domains indexed by Perplexity and ChatGPT.'
    },
    {
      id: 'competitiveShare',
      title: 'Competitive Share of Voice',
      score: scoreDimensions.competitiveShare,
      weight: '15%',
      benchmark: 'Average (61/100)',
      status: 'Average',
      description: 'Proportion of total AI recommendation airtime captured by your brand vs direct rivals.',
      recommendation: 'Target competitor alternative queries to redirect prospective buyer intent.'
    },
    {
      id: 'queryCoverage',
      title: 'Query Coverage',
      score: scoreDimensions.queryCoverage,
      weight: '10%',
      benchmark: 'Optimal (79/100)',
      status: 'Strong',
      description: 'The variety of intent types (commercial, transactional, comparison, local) where your brand is present.',
      recommendation: 'Add structured FAQ schema on documentation and pricing pages.'
    },
    {
      id: 'aiReferralQuality',
      title: 'AI Referral Quality & Engagement',
      score: scoreDimensions.aiReferralQuality,
      weight: '10%',
      benchmark: 'Growing (65/100)',
      status: 'Average',
      description: 'Session duration, low bounce rates, and demo conversion metrics from incoming AI search visitors.',
      recommendation: 'Build tailored landing pages specifically optimized for AI referral UTM parameters.'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header & Time Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3
                      bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                LUMENIQ AI Visibility Score Analysis
              </h2>
              <p className="text-xs text-slate-400">
                Multi-dimensional discovery score engineered specifically for AI search engines (AEO/GEO).
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Timeline:</span>
          {(['7d', '30d', '90d'] as TimeRange[]).map((r) => (
            <button
              key={r}
              onClick={() => onChangeTimeRange(r)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                timeRange === r
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Main Score Hero Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40
                          border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between
                          card-hover">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
              Composite Brand Index
            </span>
            <div className="flex items-center gap-5 my-4">
              <ScoreGauge
                score={overallScore}
                size={130}
                strokeWidth={10}
                trend="+8 pts"
                trendPositive={true}
              />
              <div className="space-y-2">
                <div>
                  <div className="text-3xl font-extrabold text-white font-mono">{overallScore}<span className="text-slate-400 text-sm font-bold">/100</span></div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/25">
                    Top Quartile in B2B SaaS
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              AI engines recognize your brand entity, but direct recommendation conversion
              lags behind citation volume — the primary gap to close.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 mt-4 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span>Forecasted Potential (30d):</span>
              <strong className="text-emerald-400 font-mono">86 / 100 (+12 pts)</strong>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Grounded Crawl Freshness:</span>
              <strong className="text-slate-200">Continuous Real-Time</strong>
            </div>
          </div>
        </div>

        {/* Predictive AI Forecasting Card */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>AI Visibility Forecast & Impact Model</span>
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">Simulated Projection</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on historical citation velocity and competitor response rates, here is what implementing your
              top 3 recommended actions in the Action Center will yield:
            </p>

            <div className="grid grid-cols-3 gap-3 my-4">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Current Score</span>
                <div className="text-2xl font-extrabold text-white font-mono mt-1">{overallScore}</div>
                <span className="text-[10px] text-slate-400">Baseline</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-blue-500/40 text-center">
                <span className="text-[10px] text-blue-400 uppercase font-semibold">+3 Action Items</span>
                <div className="text-2xl font-extrabold text-blue-400 font-mono mt-1">82</div>
                <span className="text-[10px] text-emerald-400 font-medium">+8 pts Projected</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-cyan-500/40 text-center">
                <span className="text-[10px] text-cyan-400 uppercase font-semibold">Full Autopilot</span>
                <div className="text-2xl font-extrabold text-cyan-400 font-mono mt-1">89</div>
                <span className="text-[10px] text-emerald-400 font-medium">+15 pts Projected</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              * Note: Forecasts are mathematical projections derived from citation weight models and historical LLM retrieval patterns, not guaranteed indexing.
            </p>
          </div>
        </div>
      </div>

      {/* 6 Dimension Detailed Cards */}
      <div>
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>Dimension Breakdown</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dimensionCards.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedDimension(card.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                selectedDimension === card.id
                  ? 'bg-slate-900 border-blue-500 shadow-lg shadow-blue-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-slate-200">{card.title}</span>
                <span className="text-base font-extrabold text-white font-mono">{card.score}</span>
              </div>

              {/* Mini progress bar */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full rounded-full ${
                    card.score >= 75 ? 'bg-cyan-400' : card.score >= 65 ? 'bg-blue-500' : 'bg-amber-400'
                  }`}
                  style={{ width: `${card.score}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-400 leading-snug line-clamp-2 mb-3">
                {card.description}
              </p>

              <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
                <span>Weight: <strong className="text-slate-300">{card.weight}</strong></span>
                <span className="text-cyan-400 font-medium">{card.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engine-by-Engine Capability Comparison */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-cyan-400" />
          <span>Engine Visibility Matrix</span>
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Comparative analysis of your brand presence across major AI search answer systems.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">AI Engine</th>
                <th className="py-2.5 px-3">Mention Rate</th>
                <th className="py-2.5 px-3">Recommendation Rate</th>
                <th className="py-2.5 px-3">Citation Frequency</th>
                <th className="py-2.5 px-3">Avg Position</th>
                <th className="py-2.5 px-3">Engine Bias / Affinity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
              <tr className="hover:bg-slate-800/40">
                <td className="py-3 px-3 font-sans font-semibold text-white">ChatGPT (SearchGPT)</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">84%</td>
                <td className="py-3 px-3 text-blue-400">62%</td>
                <td className="py-3 px-3 text-slate-200">114 citations</td>
                <td className="py-3 px-3 text-cyan-300">#1.8</td>
                <td className="py-3 px-3 font-sans text-slate-300">Prefers comprehensive comparison matrices</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="py-3 px-3 font-sans font-semibold text-white">Perplexity Pro (Sonar)</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">92%</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">78%</td>
                <td className="py-3 px-3 text-slate-200">182 citations</td>
                <td className="py-3 px-3 text-cyan-300">#1.2</td>
                <td className="py-3 px-3 font-sans text-slate-300">High affinity for verified technical docs & Reddit</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="py-3 px-3 font-sans font-semibold text-white">Google Gemini 2.5 / 3</td>
                <td className="py-3 px-3 text-amber-400">68%</td>
                <td className="py-3 px-3 text-amber-400">54%</td>
                <td className="py-3 px-3 text-slate-200">64 citations</td>
                <td className="py-3 px-3 text-amber-300">#2.6</td>
                <td className="py-3 px-3 font-sans text-slate-300">Favors JSON-LD structured data and FAQ schema</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="py-3 px-3 font-sans font-semibold text-white">Claude 3.7 Sonnet</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">78%</td>
                <td className="py-3 px-3 text-blue-400">71%</td>
                <td className="py-3 px-3 text-slate-200">92 citations</td>
                <td className="py-3 px-3 text-cyan-300">#1.4</td>
                <td className="py-3 px-3 font-sans text-slate-300">Sensitive to security, HIPAA and developer ergonomics</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="py-3 px-3 font-sans font-semibold text-white">Microsoft Copilot</td>
                <td className="py-3 px-3 text-amber-400">72%</td>
                <td className="py-3 px-3 text-amber-400">58%</td>
                <td className="py-3 px-3 text-slate-200">58 citations</td>
                <td className="py-3 px-3 text-amber-300">#2.4</td>
                <td className="py-3 px-3 font-sans text-slate-300">Grounds primarily in Microsoft Partner & Capterra feeds</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
