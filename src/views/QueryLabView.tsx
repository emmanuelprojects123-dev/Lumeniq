import React, { useState } from 'react';
import {
  FlaskConical,
  Search,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Quote,
  ExternalLink,
  Layers,
  Filter,
  Plus,
  Play,
  RotateCw,
  Zap,
  Globe,
  Sliders
} from 'lucide-react';
import { Workspace, MonitoredQuery, ActionPlanItem } from '../types';
import { runQueryLabSimulation } from '../services/api';
import { useToast } from '../components/Toast';

interface QueryLabViewProps {
  workspace: Workspace;
  queries: MonitoredQuery[];
  onAddAction: (action: Partial<ActionPlanItem>) => void;
  onAddQuery: (query: Partial<MonitoredQuery>) => void;
}

export const QueryLabView: React.FC<QueryLabViewProps> = ({
  workspace,
  queries,
  onAddAction,
  onAddQuery
}) => {
  const { showToast } = useToast();
  const [selectedPrompt, setSelectedPrompt] = useState(
    'What is the best product analytics software for B2B SaaS in 2026?'
  );
  const [customPrompt, setCustomPrompt] = useState('');
  const [intentFilter, setIntentFilter] = useState('All');
  const [targetEngine, setTargetEngine] = useState('All Engines');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<any>(null);
  const [activeEngineTab, setActiveEngineTab] = useState(0);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [generatedCount, setGeneratedCount] = useState(10);
  const [isGeneratingBatch, setIsGeneratingBatch] = useState(false);

  const samplePresets = [
    'What is the best product analytics software for B2B SaaS in 2026?',
    'PulseMetrics vs Mixpanel enterprise features comparison',
    'Best alternatives to Amplitude with automated AI funnel insights',
    'Which product analytics tool has the fastest SOC-2 compliant SDK?',
    'Affordable analytics with warehouse native connectors',
    'Meilleur logiciel d\'analyse de produit pour scale-up',
  ];

  // Default initial simulation payload
  const activeResult = simulationResult || {
    query: selectedPrompt,
    primaryWinner: 'Mixpanel',
    ourBrandRank: 2,
    ourBrandMentioned: true,
    ourBrandRecommended: false,
    sentiment: { positive: 76, neutral: 19, negative: 5 },
    deepDiagnosis: {
      headline: `Why Mixpanel was recommended ahead of ${workspace.name}`,
      reasons: [
        'Mixpanel has 4.2x more indexed comparison tables on third-party authority review domains (G2, Capterra, TechCrunch).',
        'AI engines cite Mixpanel\'s public API reference documentation for compliance and SOC-2 claims.',
        `${workspace.name} is recognized as technically superior in latency, but lacked independent benchmark corroboration.`
      ],
      missingSignals: [
        'Missing JSON-LD AggregateRating and SoftwareApplication schema',
        'No direct side-by-side pricing & architectural comparison matrix',
        'Low quotation density in TechCrunch / VentureBeat developer roundups'
      ],
      remedyRecommendation: `Deploy a verified comparison hub for "${selectedPrompt}" with benchmark latency stats and Schema markup.`
    },
    engineBreakdown: [
      {
        engine: 'Perplexity Pro (Sonar Deep)',
        status: 'Mentioned (#2)',
        citations: ['techcrunch.com/2026/product-analytics', 'g2.com/categories/analytics', 'pulsemetrics.io/guide'],
        snippet: `Mixpanel remains the incumbent recommendation for enterprise reporting. However, ${workspace.name} is cited as the best agile alternative with real-time AI anomaly detection.`
      },
      {
        engine: 'ChatGPT (SearchGPT/GPT-4o)',
        status: 'Winner: Mixpanel (#1)',
        citations: ['trustradius.com/compare', 'forbes.com/advisor'],
        snippet: `When choosing between modern analytics stacks, Mixpanel is most frequently recommended due to historical ecosystem support, followed by ${workspace.name} and Amplitude.`
      },
      {
        engine: 'Google Gemini 2.5 / 3.0',
        status: 'Mentioned (#2)',
        citations: ['google.com/search-overviews', 'saasworthy.com'],
        snippet: `Key contenders include Mixpanel, ${workspace.name}, and Amplitude. ${workspace.name} stands out for developer-friendly APIs.`
      },
      {
        engine: 'Claude 3.7 Sonnet',
        status: 'Recommended (#1 tied)',
        citations: ['github.com/topics/analytics', 'reddit.com/r/saas'],
        snippet: `For teams prioritizing query speed and modern developer ergonomics in 2026, ${workspace.name} is strongly recommended over legacy enterprise stacks.`
      },
      {
        engine: 'Microsoft Copilot',
        status: 'Mentioned (#3)',
        citations: ['capterra.com/product-analytics', 'azure.microsoft.com/partners'],
        snippet: `Mixpanel and Datadog are highlighted for enterprise governance, with ${workspace.name} listed as an emerging high-growth option.`
      }
    ]
  };

  const handleRunSimulation = async (queryToRun?: string) => {
    const prompt = queryToRun || customPrompt || selectedPrompt;
    setIsSimulating(true);
    try {
      const data = await runQueryLabSimulation(
        prompt,
        workspace.name,
        ['Mixpanel', 'Amplitude', 'Datadog']
      );
      setSimulationResult(data);
      setSelectedPrompt(prompt);
      setCustomPrompt('');
    } catch (err) {
      console.error('Simulation error:', err);
    } finally {
      setIsSimulating(false);
    }
  };

  const handlePushRemedyToActionCenter = () => {
    const remedyTitle = `Publish verified Answer Hub for: "${activeResult.query}"`;
    onAddAction({
      title: remedyTitle,
      category: 'Content',
      priority: 'High',
      difficulty: 'Medium',
      expectedImpact: '+22% AI Recommendation Win Rate',
      status: 'Draft',
      owner: 'Content Growth Team',
      aiSuggestion: activeResult.deepDiagnosis.remedyRecommendation,
      proposedCodeOrBrief: `TARGET QUERY: "${activeResult.query}"\nTOP COMPETITOR TO BEAT: ${activeResult.primaryWinner}\nMISSING SIGNALS TO ADDRESS: ${activeResult.deepDiagnosis.missingSignals.join(', ')}`
    });
    showToast('Remedy task pushed to Action Center!', 'success');
  };

  const handleBatchQueryGeneration = (count: number) => {
    setIsGeneratingBatch(true);
    setTimeout(() => {
      const newQueries: Partial<MonitoredQuery>[] = [
        {
          id: `gen-${Date.now()}-1`,
          query: `Best ${workspace.industry} for mid-market engineering teams`,
          intent: 'Commercial',
          ourRank: 2,
          topWinner: 'Mixpanel',
          brandMentioned: true,
          recommended: false,
          searchVolumeEstimate: '11,200/mo AI Queries',
          lastChecked: 'Just now',
          trend: 'up',
          engineVisibility: { chatgpt: 'Mentioned', perplexity: 'Recommended', gemini: 'Mentioned', claude: 'Mentioned', copilot: 'Mentioned' }
        },
        {
          id: `gen-${Date.now()}-2`,
          query: `${workspace.name} pricing vs enterprise alternatives 2026`,
          intent: 'Comparison',
          ourRank: 1,
          topWinner: `${workspace.name} (You)`,
          brandMentioned: true,
          recommended: true,
          searchVolumeEstimate: '5,800/mo AI Queries',
          lastChecked: 'Just now',
          trend: 'up',
          engineVisibility: { chatgpt: 'Recommended', perplexity: 'Recommended', gemini: 'Mentioned', claude: 'Recommended', copilot: 'Recommended' }
        },
        {
          id: `gen-${Date.now()}-3`,
          query: `How to replace legacy analytics without downtime in ${workspace.industry.toLowerCase()}`,
          intent: 'Informational',
          ourRank: 3,
          topWinner: 'Amplitude',
          brandMentioned: true,
          recommended: false,
          searchVolumeEstimate: '8,400/mo AI Queries',
          lastChecked: 'Just now',
          trend: 'stable',
          engineVisibility: { chatgpt: 'Omitted', perplexity: 'Cited Source', gemini: 'Mentioned', claude: 'Omitted', copilot: 'Omitted' }
        }
      ];

      newQueries.forEach(q => onAddQuery(q));
      setIsGeneratingBatch(false);
      setShowGenerateModal(false);
      showToast(`Discovered & added ${count} high-value AI buyer queries!`, 'success');
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Top Banner: Query Lab Simulator Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">
                  LUMENIQ Query Lab & AI Search Simulator
                </h2>
                <p className="text-xs text-slate-400">
                  Reverse-engineer real AI answers across ChatGPT, Perplexity, Gemini, Claude & Copilot.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGenerateModal(true)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI Query Discovery Engine</span>
            </button>
          </div>
        </div>

        {/* Input Bar */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={customPrompt || selectedPrompt}
              onChange={(e) => {
                setCustomPrompt(e.target.value);
                setSelectedPrompt(e.target.value);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleRunSimulation()}
              placeholder="Enter any customer prompt (e.g. 'What is the best CRM for small businesses?')"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none input-glow transition-all font-medium"
            />
          </div>
          <button
            onClick={() => handleRunSimulation()}
            disabled={isSimulating}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 shrink-0"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Simulating 5 Engines...' : 'Run Simulation'}</span>
          </button>
        </div>

        {/* Preset chips */}
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs text-slate-400">
          <span className="text-[11px] font-semibold text-slate-400 shrink-0">Try preset:</span>
          {samplePresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedPrompt(preset);
                setCustomPrompt('');
                handleRunSimulation(preset);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 hover:text-white border border-slate-700/60 text-[11px] shrink-0 transition-colors"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Signature Diagnostic Card: "Why did AI recommend Competitor A instead of you?" */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border-2 border-indigo-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-bold text-[10px] uppercase tracking-wider">
                Signature Deep Diagnostic
              </span>
              <span className="text-xs text-slate-400">
                Grounding Reverse-Engineered at {new Date().toLocaleTimeString()}
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-white tracking-tight">
              {activeResult.deepDiagnosis.headline}
            </h3>

            {/* Winner vs You comparison badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-1">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Primary AI Winner</span>
                  <div className="text-sm font-bold text-amber-400 mt-0.5">{activeResult.primaryWinner}</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold">
                  Rank #1
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Your Brand Standing</span>
                  <div className="text-sm font-bold text-white mt-0.5">{workspace.name}</div>
                </div>
                <span className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${
                  activeResult.ourBrandRank === 1
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-blue-500/20 text-blue-300'
                }`}>
                  Rank #{activeResult.ourBrandRank}
                </span>
              </div>
            </div>

            {/* Why they won: Bulleted breakdown */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                Root Causes & Authority Drivers:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeResult.deepDiagnosis.reasons.map((r: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-950/40 p-2 rounded-lg border border-slate-800/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Missing signals */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                Missing Authority Signals on Your Website:
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeResult.deepDiagnosis.missingSignals.map((sig: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px] font-medium"
                  >
                    {sig}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 1-Click Action Conversion */}
          <div className="lg:w-80 bg-slate-950/80 border border-indigo-500/30 rounded-xl p-5 flex flex-col justify-between shrink-0 shadow-xl">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Recommended AEO Remedy</span>
              </div>
              <p className="text-xs text-slate-200 font-medium leading-relaxed mt-2">
                {activeResult.deepDiagnosis.remedyRecommendation}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 text-[11px] text-slate-400">
                <div className="flex justify-between">
                  <span>Expected Impact:</span>
                  <strong className="text-emerald-400">+22% Recommendation Win</strong>
                </div>
                <div className="flex justify-between">
                  <span>Implementation Difficulty:</span>
                  <strong className="text-blue-300">Medium (Content + Schema)</strong>
                </div>
                <div className="flex justify-between">
                  <span>Confidence:</span>
                  <strong className="text-slate-200">94% Grounded</strong>
                </div>
              </div>
            </div>

            <button
              onClick={handlePushRemedyToActionCenter}
              className="mt-5 w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <span>Push to Action Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Engine-by-Engine Tabbed Output Breakdown */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" />
            <span>AI Engine Answer Matrix ({activeResult.engineBreakdown.length} Simulated Engines)</span>
          </h3>
          <span className="text-xs text-slate-400">Query: &ldquo;{activeResult.query}&rdquo;</span>
        </div>

        {/* Engine Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {activeResult.engineBreakdown.map((item: any, idx: number) => (
            <button
              key={idx}
              onClick={() => setActiveEngineTab(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-2 ${
                activeEngineTab === idx
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>{item.engine}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                item.status.includes('#1')
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-slate-700 text-slate-300'
              }`}>
                {item.status.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Engine Inspector */}
        {activeResult.engineBreakdown[activeEngineTab] && (
          <div className="mt-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">
                  {activeResult.engineBreakdown[activeEngineTab].engine}
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-xs font-mono font-semibold">
                  Status: {activeResult.engineBreakdown[activeEngineTab].status}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 leading-relaxed italic">
              &ldquo;{activeResult.engineBreakdown[activeEngineTab].snippet}&rdquo;
            </div>

            {/* Extracted Citations */}
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Cited Grounding Sources for this Answer:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeResult.engineBreakdown[activeEngineTab].citations.map((cite: string, cIdx: number) => (
                  <a
                    key={cIdx}
                    href={`https://${cite}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 text-[11px] font-mono transition-colors"
                  >
                    <Quote className="w-3 h-3 text-cyan-400" />
                    <span>{cite}</span>
                    <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Query Discovery Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">AI Query Discovery Engine</h3>
              </div>
              <button
                onClick={() => setShowGenerateModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">
              LUMENIQ automatically mines questions real prospective buyers ask AI across informational,
              commercial, comparison, and alternative intent categories.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Select Batch Volume</label>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 50, 100, 500].map((num) => (
                    <button
                      key={num}
                      onClick={() => setGeneratedCount(num)}
                      className={`py-2 rounded-xl font-bold border transition-all ${
                        generatedCount === num
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {num}+ queries
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Target Buyer Persona</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none">
                  <option>B2B SaaS / Product Leaders</option>
                  <option>Enterprise IT / Security Directors</option>
                  <option>Growth & Digital Marketing Teams</option>
                  <option>Mid-Market Founders & CTOs</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setShowGenerateModal(false)}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleBatchQueryGeneration(generatedCount)}
                disabled={isGeneratingBatch}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isGeneratingBatch ? 'Discovering...' : `Discover ${generatedCount} High-Intent Queries`}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
