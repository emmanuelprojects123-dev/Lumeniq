import React, { useState } from 'react';
import {
  Binary,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Copy,
  Check,
  Code2,
  ShieldCheck,
  RotateCw
} from 'lucide-react';
import { TechnicalReadinessItem } from '../types';

interface AIReadinessViewProps {
  items: TechnicalReadinessItem[];
  brandName: string;
}

export const AIReadinessView: React.FC<AIReadinessViewProps> = ({
  items,
  brandName
}) => {
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const averageScore = Math.round(
    items.reduce((acc, curr) => acc + curr.score, 0) / items.length
  );

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                <Binary className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">
                  Technical Website AI Readiness Audit
                </h2>
                <p className="text-xs text-slate-400">
                  Analyze whether AI web crawlers (GPTBot, PerplexityBot, ClaudeBot) can crawl, parse, and verify your website.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 font-mono font-semibold">
              Readiness: {averageScore} / 100
            </span>
          </div>
        </div>
      </div>

      {/* Main Breakdown */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                {item.status === 'Passed' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                {item.status === 'Warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                {item.status === 'Failed' && <XCircle className="w-4 h-4 text-rose-400" />}
                <h3 className="text-sm font-bold text-white">{item.criterion}</h3>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="font-bold text-white">{item.score}/100</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    item.status === 'Passed'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : item.status === 'Warning'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {item.details}
            </p>

            {item.codeSnippet && (
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 font-semibold">
                    <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                    Recommended Implementation Code:
                  </span>
                  <button
                    onClick={() => handleCopy(item.id, item.codeSnippet!)}
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                  >
                    {copiedCodeId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedCodeId === item.id ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-cyan-300 font-mono overflow-x-auto whitespace-pre-wrap">
                  {item.codeSnippet}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
