import React, { useState } from 'react';
import {
  Sliders,
  Activity,
  Server,
  DollarSign,
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  Terminal,
  Cpu
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const [featureFlags, setFeatureFlags] = useState({
    geminiLiveGrounding: true,
    sonarDeepResearchRAG: true,
    autopilotDirectCMSPublishing: false,
    multiLanguagePortuguese: true,
    strictHallucinationGate: true
  });

  const toggleFlag = (key: keyof typeof featureFlags) => {
    setFeatureFlags(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              LUMENIQ Internal SaaS Admin Console
            </h2>
            <p className="text-xs text-slate-400">
              System health telemetry, query processing queues, MRR metrics, and platform feature flags.
            </p>
          </div>
        </div>
      </div>

      {/* SaaS High-Level Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Monthly Recurring Revenue (MRR)</span>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono mt-1">$142,500</div>
          <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">+18.4% Net New</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Active Workspaces</span>
          <div className="text-3xl font-extrabold text-white font-mono mt-1">1,248</div>
          <span className="text-[11px] text-blue-400 font-semibold mt-1 block">94.2% Retention</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Daily Monitored AI Queries</span>
          <div className="text-3xl font-extrabold text-cyan-400 font-mono mt-1">482,900</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Avg latency: 240ms</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">LLM API Health & Error Rate</span>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono mt-1">99.98%</div>
          <span className="text-[11px] text-slate-400 mt-1 block">0.02% 5xx Failover</span>
        </div>
      </div>

      {/* Provider Connectivity Status */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Server className="w-4 h-4 text-cyan-400" />
          <span>AI Search Provider Telemetry & Ingestion Nodes</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          {[
            { provider: 'Google Gemini 2.5 / 3.0 API', status: 'Healthy', latency: '190ms', cost: '$0.0004 / scan' },
            { provider: 'Perplexity Sonar Deep Cluster', status: 'Healthy', latency: '380ms', cost: '$0.0012 / scan' },
            { provider: 'OpenAI SearchGPT & GPT-4o Gateway', status: 'Healthy', latency: '410ms', cost: '$0.0018 / scan' },
            { provider: 'Anthropic Claude 3.7 Evaluator', status: 'Healthy', latency: '290ms', cost: '$0.0015 / scan' },
            { provider: 'Microsoft Copilot Bing Indexer', status: 'Healthy', latency: '340ms', cost: '$0.0008 / scan' },
            { provider: 'Knowledge Graph Entity Ingestion', status: 'Active', latency: '120ms', cost: 'Local Cache' },
          ].map((node, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-sans font-semibold text-white">{node.provider}</span>
                <span className="text-[10px] px-2 py-0.2 rounded bg-emerald-500/20 text-emerald-400">
                  {node.status}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 flex justify-between pt-1">
                <span>Latency: {node.latency}</span>
                <span className="text-cyan-400">{node.cost}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Flags */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-purple-400" />
          <span>Platform Feature Flags & Governance Gates</span>
        </h3>

        <div className="divide-y divide-slate-800 text-xs">
          {Object.entries(featureFlags).map(([key, enabled]) => (
            <div key={key} className="py-3 flex items-center justify-between">
              <div>
                <span className="font-semibold text-white font-mono">{key}</span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Controls pipeline activation across all client accounts.
                </p>
              </div>
              <button
                onClick={() => toggleFlag(key as any)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  enabled
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {enabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
