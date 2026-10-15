import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Flame,
  Zap
} from 'lucide-react';
import { runAIScan } from '../services/api';

interface FreeVisibilityCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportToWorkspace: (data: any) => void;
}

export const FreeVisibilityCheckerModal: React.FC<FreeVisibilityCheckerModalProps> = ({
  isOpen,
  onClose,
  onImportToWorkspace
}) => {
  const [testUrl, setTestUrl] = useState('https://notion.so');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleRunFreeCheck = async () => {
    if (!testUrl.trim()) return;
    setIsLoading(true);
    try {
      const data = await runAIScan({
        url: testUrl,
        brandName: testUrl.replace(/^https?:\/\/(www\.)?/, '').split('.')[0],
        industry: 'Productivity & Software',
        competitors: ['Asana', 'Monday.com', 'ClickUp'],
        markets: ['Global']
      });
      setResult(data);
    } catch (err) {
      console.error('Free check error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClaimAccount = () => {
    if (result) {
      onImportToWorkspace(result);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Free AI Visibility & AEO Checker</h2>
              <span className="text-[11px] text-indigo-400 font-medium">Public Lead Generation Tool</span>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xs font-bold">
            ✕
          </button>
        </div>

        {/* Input Bar */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">
            Enter Any Website URL to Test AI Discovery:
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={testUrl}
              onChange={(e) => setTestUrl(e.target.value)}
              placeholder="https://company.com"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-medium"
            />
            <button
              onClick={handleRunFreeCheck}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all disabled:opacity-50 shadow-md shadow-indigo-600/20 shrink-0"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Scanning AI...' : 'Scan Website'}</span>
            </button>
          </div>
        </div>

        {/* Results Preview */}
        {result ? (
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-400">Audit Result</span>
                <h3 className="text-base font-bold text-white mt-0.5">{result.brand}</h3>
              </div>
              <div className="text-right">
                <span className="text-3xl font-extrabold text-white font-mono">
                  {result.overallScore}
                </span>
                <span className="text-slate-400 text-xs"> / 100</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Mention Rate</span>
                <strong className="text-cyan-300">{result.scoreDimensions.mentionVisibility}%</strong>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Recommendation Win</span>
                <strong className="text-emerald-400">{result.scoreDimensions.recommendationStrength}%</strong>
              </div>
            </div>

            {result.visibilityGaps && result.visibilityGaps.length > 0 && (
              <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-1">
                  Primary Visibility Gap Identified:
                </span>
                <p className="text-rose-200 text-xs leading-relaxed">
                  {result.visibilityGaps[0].description}
                </p>
              </div>
            )}

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Full 6-dimension report and action plan available in LUMENIQ.
              </span>
              <button
                onClick={handleClaimAccount}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all"
              >
                <span>Import Brand to Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-950/40 border border-dashed border-slate-800 text-center text-xs text-slate-400">
            Enter any company URL above to reverse-engineer how ChatGPT, Perplexity, Gemini, Claude, and Copilot discover and recommend it.
          </div>
        )}
      </div>
    </div>
  );
};
