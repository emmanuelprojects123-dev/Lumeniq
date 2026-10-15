import React, { useState } from 'react';
import {
  FileCode2,
  Sparkles,
  Layers,
  Copy,
  Check,
  ArrowRight,
  Code2,
  FileText,
  Quote,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { generateContentOptimizationBrief } from '../services/api';

interface ContentOptimizerViewProps {
  brandName: string;
}

export const ContentOptimizerView: React.FC<ContentOptimizerViewProps> = ({
  brandName
}) => {
  const [targetQuery, setTargetQuery] = useState(
    'Best product analytics software with automated AI insights in 2026'
  );
  const [contentType, setContentType] = useState('Comparison Hub');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [brief, setBrief] = useState<any>({
    targetQuery: 'Best product analytics software with automated AI insights in 2026',
    contentType: 'Comparison Hub',
    searchIntent: 'High Commercial Buyer Intent',
    aiVisibilityOpportunity: '+24% recommendation probability in Perplexity & SearchGPT',
    suggestedTitle: `The 2026 Guide: Best Product Analytics Software Compared for High-Growth Teams`,
    keyEntitiesToInclude: [
      'Multi-tenant cloud architecture',
      'Warehouse-native telemetry',
      'SOC 2 Type II compliance',
      'Automated cohort anomaly detection',
      'Sub-second query latencies'
    ],
    recommendedStructure: [
      { heading: 'Executive Summary for Decision Makers', purpose: 'Direct concise answer optimized for LLM answer snippet extraction' },
      { heading: 'Side-by-Side Architectural Feature Matrix', purpose: 'Structured tabular data favored by Perplexity Sonar & SearchGPT' },
      { heading: 'Transparent Pricing & Total Cost Comparison', purpose: 'Eliminates AI hallucinations regarding quote-only requirements' },
      { heading: 'Developer Quickstart & SDK Ergonomics', purpose: 'Grounding citations for engineering evaluation queries' },
      { heading: 'Frequently Asked Questions (FAQ)', purpose: 'Direct Q&A format indexed by Google Gemini & Claude' }
    ],
    citationSourcesToTarget: [
      'g2.com/categories/product-analytics',
      'trustradius.com/compare',
      'reddit.com/r/saas',
      'techcrunch.com/enterprise-software'
    ],
    jsonLdSchemaSnippet: `{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "${brandName}",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Cloud / Web",
  "offers": {
    "@type": "Offer",
    "price": "39.00",
    "priceCurrency": "USD"
  }
}`
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const data = await generateContentOptimizationBrief(targetQuery, brandName, contentType);
      setBrief(data);
    } catch (err) {
      console.error('Error generating brief:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <FileCode2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">
                  LUMENIQ Content Optimizer & AEO Generator
                </h2>
                <p className="text-xs text-slate-400">
                  Generate content briefs engineered specifically for LLM discoverability, answer citations, and entity grounding.
                </p>
              </div>
            </div>
          </div>
          <span className="text-xs px-3 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold font-mono">
            Answer Engine Optimization (AEO)
          </span>
        </div>

        {/* Input Bar */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-2">
          <div className="sm:col-span-7">
            <input
              type="text"
              value={targetQuery}
              onChange={(e) => setTargetQuery(e.target.value)}
              placeholder="Target Buyer Query (e.g. Best CRM for small business)"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none input-glow"
            />
          </div>
          <div className="sm:col-span-3">
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none input-glow"
            >
              <option value="Comparison Hub">Comparison Hub</option>
              <option value="Direct Answer Page">Direct Answer Page</option>
              <option value="Alternative Page">Alternative Page</option>
              <option value="FAQ Hub with Schema">FAQ Hub with Schema</option>
              <option value="Technical Entity Whitepaper">Technical Entity Whitepaper</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full h-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Engineering...' : 'Generate Brief'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Generated Content Brief Inspector */}
      {brief && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Brief Structure (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5 card-hover">
            <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                  {brief.contentType} • {brief.searchIntent}
                </span>
                <h3 className="text-base font-bold text-white mt-1">
                  {brief.suggestedTitle}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-300 font-mono">
                {brief.aiVisibilityOpportunity}
              </span>
            </div>

            {/* Key Entities To Anchor */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Required Semantic Entities for LLM Knowledge Graph:
              </span>
              <div className="flex flex-wrap gap-2">
                {brief.keyEntitiesToInclude.map((ent: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-medium"
                  >
                    {ent}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Outline Structure */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                AEO Content Hierarchy (Favored by SearchGPT & Perplexity):
              </span>
              <div className="space-y-2">
                {brief.recommendedStructure.map((struct: any, idx: number) => (
                  <div key={idx} className={`p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs
                                               animate-fade-in-up stagger-${Math.min(idx + 1, 6)}`}>
                    <div className="font-semibold text-white mb-0.5">
                      {idx + 1}. {struct.heading}
                    </div>
                    <div className="text-[11px] text-slate-400">{struct.purpose}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Citations */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Third-Party Authority Sources to Target for Cross-Citations:
              </span>
              <div className="flex flex-wrap gap-2">
                {brief.citationSourcesToTarget.map((src: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono text-[11px]"
                  >
                    {src}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: JSON-LD Schema Snippet (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4 card-hover">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  Structured Data (JSON-LD)
                </span>
                <button
                  onClick={() => handleCopy(brief.jsonLdSchemaSnippet)}
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Schema'}</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                Embed this exact schema markup into your page &lt;head&gt; tag to enable Gemini, Copilot, and ChatGPT to reliably extract your specs without hallucinations.
              </p>

              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-cyan-300 font-mono overflow-x-auto max-h-80 whitespace-pre-wrap">
                {brief.jsonLdSchemaSnippet}
              </pre>
            </div>

            <button
              onClick={() => handleCopy(JSON.stringify(brief, null, 2))}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all border border-slate-700"
            >
              <span>Export Full AEO Content Brief</span>
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
