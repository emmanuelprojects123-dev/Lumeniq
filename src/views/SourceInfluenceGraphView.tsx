import React, { useState } from 'react';
import {
  GitFork,
  Bot,
  Globe,
  FileText,
  Sparkles,
  ArrowRight,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Info
} from 'lucide-react';
import { InfluenceNode, InfluenceEdge } from '../types';

interface SourceInfluenceGraphViewProps {
  nodes: InfluenceNode[];
  edges: InfluenceEdge[];
}

export const SourceInfluenceGraphView: React.FC<SourceInfluenceGraphViewProps> = ({
  nodes,
  edges
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('eng-1');

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  // Group nodes by step
  const engines = nodes.filter(n => n.type === 'engine');
  const sources = nodes.filter(n => n.type === 'source');
  const contents = nodes.filter(n => n.type === 'content');
  const mentions = nodes.filter(n => n.type === 'mention');
  const referrals = nodes.filter(n => n.type === 'referral');
  const conversions = nodes.filter(n => n.type === 'conversion');

  const columns = [
    { title: '1. AI Engines', subtitle: 'Retrieval & RAG', items: engines, color: 'border-blue-500/40 text-blue-400' },
    { title: '2. Authority Sources', subtitle: 'Influencer Domains', items: sources, color: 'border-indigo-500/40 text-indigo-400' },
    { title: '3. Grounded Content', subtitle: 'Target Pages Cited', items: contents, color: 'border-cyan-500/40 text-cyan-400' },
    { title: '4. AI Mention', subtitle: 'Rank & Recommendation', items: mentions, color: 'border-purple-500/40 text-purple-400' },
    { title: '5. Web Referral', subtitle: 'Direct Search Sessions', items: referrals, color: 'border-emerald-500/40 text-emerald-400' },
    { title: '6. Conversion', subtitle: 'Qualified Pipeline & Rev', items: conversions, color: 'border-emerald-400 text-emerald-300' },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                <GitFork className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">
                  AI Source Influence Graph
                </h2>
                <p className="text-xs text-slate-400">
                  Visual attribution mapping: Discover which external sources trigger AI recommendations and convert into revenue.
                </p>
              </div>
            </div>
          </div>
          <span className="text-xs px-3 py-1.5 rounded-xl bg-blue-950/40 text-blue-300 border border-blue-500/30 font-semibold">
            Signature LUMENIQ Attribution Model
          </span>
        </div>
      </div>

      {/* Interactive Visual Graph Columns */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl overflow-x-auto">
        <div className="min-w-[900px] grid grid-cols-6 gap-4">
          {columns.map((col, cIdx) => (
            <div key={cIdx} className="space-y-3">
              <div className="border-b border-slate-800 pb-2">
                <h3 className={`text-xs font-bold ${col.color}`}>{col.title}</h3>
                <span className="text-[10px] text-slate-400 block">{col.subtitle}</span>
              </div>

              <div className="space-y-2.5">
                {col.items.map((node) => {
                  const isSelected = selectedNode.id === node.id;
                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-blue-600/20 border-blue-400 shadow-lg shadow-blue-500/20 text-white'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="font-semibold text-[11px] truncate">{node.label}</div>
                      {node.subtext && (
                        <div className="text-[10px] text-slate-400 truncate mt-0.5">{node.subtext}</div>
                      )}
                      {node.volume && (
                        <div className="text-[10px] font-mono font-bold text-cyan-300 mt-1">
                          {node.volume}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Node Inspector & Flow Drill-Down */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400">
            Selected Node Attribution Inspector
          </span>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>{selectedNode.label}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase font-mono">
              {selectedNode.type}
            </span>
          </h3>
          <p className="text-xs text-slate-300 max-w-xl">
            This node feeds grounding vectors into major search answer models. Web visitors originating from this pathway show a <strong>6.1% demo conversion rate</strong>, outperforming standard organic search by 2.4x.
          </p>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl flex items-center gap-4 shrink-0">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Influenced Pipeline</span>
            <div className="text-xl font-extrabold text-emerald-400 font-mono mt-0.5">$48,200</div>
          </div>
          <div className="border-l border-slate-800 pl-4">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Citation Weight</span>
            <div className="text-xl font-extrabold text-cyan-400 font-mono mt-0.5">94 / 100</div>
          </div>
        </div>
      </div>
    </div>
  );
};
