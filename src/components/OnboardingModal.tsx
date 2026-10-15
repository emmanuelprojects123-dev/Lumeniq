import React, { useState } from 'react';
import {
  Sparkles,
  Globe,
  Building,
  Users,
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  RefreshCw,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { runAIScan } from '../services/api';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteScan: (scannedData: any) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onCompleteScan
}) => {
  const [step, setStep] = useState(1);
  const [websiteUrl, setWebsiteUrl] = useState('https://pulsemetrics.io');
  const [companyName, setCompanyName] = useState('PulseMetrics AI');
  const [industry, setIndustry] = useState('B2B SaaS / Product Analytics');
  const [competitors, setCompetitors] = useState(['Mixpanel', 'Amplitude', 'Datadog']);
  const [newCompInput, setNewCompInput] = useState('');
  const [targetMarkets, setTargetMarkets] = useState(['United States', 'Global']);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepIndex, setScanStepIndex] = useState(0);

  if (!isOpen) return null;

  const scanSteps = [
    'Queued in discovery pipeline...',
    'Querying ChatGPT (SearchGPT) & Perplexity Sonar...',
    'Analyzing Google Gemini & Claude 3.7 responses...',
    'Extracting brand mentions, citations & recommendation bias...',
    'Calculating LUMENIQ Visibility Score (0-100)...',
    'Generating prioritized Action Plan & Health Report...'
  ];

  const handleAddCompetitor = () => {
    if (newCompInput.trim() && !competitors.includes(newCompInput.trim())) {
      setCompetitors([...competitors, newCompInput.trim()]);
      setNewCompInput('');
    }
  };

  const handleRemoveCompetitor = (name: string) => {
    setCompetitors(competitors.filter(c => c !== name));
  };

  const handleStartScan = async () => {
    setIsScanning(true);
    setScanStepIndex(0);

    const interval = setInterval(() => {
      setScanStepIndex((prev) => {
        if (prev < scanSteps.length - 1) return prev + 1;
        return prev;
      });
    }, 900);

    try {
      const data = await runAIScan({
        url: websiteUrl,
        brandName: companyName,
        industry,
        competitors,
        markets: targetMarkets
      });

      clearInterval(interval);
      setTimeout(() => {
        setIsScanning(false);
        onCompleteScan(data);
        onClose();
      }, 1000);
    } catch (err) {
      console.error('Scan error:', err);
      clearInterval(interval);
      setIsScanning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm">
              L
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">LUMENIQ Brand Onboarding</h2>
              <span className="text-[11px] text-slate-400">Step {step} of 5</span>
            </div>
          </div>
          {!isScanning && (
            <button onClick={onClose} className="text-slate-400 hover:text-white text-xs font-bold">
              ✕
            </button>
          )}
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Step 1: Website */}
        {step === 1 && (
          <div className="space-y-4 text-xs">
            <div>
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">STEP 1</span>
              <h3 className="text-base font-bold text-white mt-1">What is your primary website?</h3>
              <p className="text-slate-400 mt-1">
                LUMENIQ will analyze how AI search engines crawl and cite your domain.
              </p>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Company Website URL</label>
              <input
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://yourbrand.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none input-glow"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={!websiteUrl.trim()}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5 transition-all disabled:opacity-50"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Company Details & Category */}
        {step === 2 && (
          <div className="space-y-4 text-xs">
            <div>
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">STEP 2</span>
              <h3 className="text-base font-bold text-white mt-1">Confirm Company Information</h3>
              <p className="text-slate-400 mt-1">
                Help LUMENIQ align with relevant buyer intent categories and topical authority graphs.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Brand / Product Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none input-glow"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Category / Industry</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                >
                  <option value="B2B SaaS / Product Analytics">B2B SaaS / Product Analytics</option>
                  <option value="E-Commerce & Retail">E-Commerce & Retail</option>
                  <option value="Financial & FinTech">Financial & FinTech</option>
                  <option value="Healthcare & Life Sciences">Healthcare & Life Sciences</option>
                  <option value="Professional Services & Agency">Professional Services & Agency</option>
                  <option value="Cybersecurity & Infrastructure">Cybersecurity & Infrastructure</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-slate-400 hover:text-white font-semibold"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5 transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Select Competitors */}
        {step === 3 && (
          <div className="space-y-4 text-xs">
            <div>
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">STEP 3</span>
              <h3 className="text-base font-bold text-white mt-1">Select 3–5 Competitors</h3>
              <p className="text-slate-400 mt-1">
                LUMENIQ will analyze why AI recommends them over you and detect competitive moves.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCompInput}
                  onChange={(e) => setNewCompInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCompetitor()}
                  placeholder="Add competitor name..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
                <button
                  onClick={handleAddCompetitor}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {competitors.map((comp) => (
                  <span
                    key={comp}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 font-semibold"
                  >
                    <span>{comp}</span>
                    <button
                      onClick={() => handleRemoveCompetitor(comp)}
                      className="hover:text-rose-400 ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 text-slate-400 hover:text-white font-semibold"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={competitors.length === 0}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5 transition-all disabled:opacity-50"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Target Markets */}
        {step === 4 && (
          <div className="space-y-4 text-xs">
            <div>
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">STEP 4</span>
              <h3 className="text-base font-bold text-white mt-1">Select Target Markets & Languages</h3>
              <p className="text-slate-400 mt-1">
                Monitor multilingual discovery across North America, Europe, and global regions.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {['United States', 'Global', 'United Kingdom', 'European Union (FR, DE)', 'Canada', 'Australia'].map((m) => {
                const isSelected = targetMarkets.includes(m);
                return (
                  <button
                    key={m}
                    onClick={() => {
                      if (isSelected) setTargetMarkets(targetMarkets.filter(x => x !== m));
                      else setTargetMarkets([...targetMarkets, m]);
                    }}
                    className={`p-3 rounded-xl border text-left font-semibold transition-all ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {m}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex justify-between">
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2 text-slate-400 hover:text-white font-semibold"
              >
                Back
              </button>
              <button
                onClick={() => setStep(5)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5 transition-all"
              >
                <span>Ready to Scan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Run AI Scan */}
        {step === 5 && (
          <div className="space-y-5 text-center text-xs py-2">
            {!isScanning ? (
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 mx-auto flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">
                    Ready to Generate Your LUMENIQ Report
                  </h3>
                  <p className="text-slate-400 max-w-md mx-auto mt-1">
                    We will query 5 major AI answer engines to establish your baseline Visibility Score, Citation Profile, and Competitive Share of Voice.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleStartScan}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Launch Comprehensive AI Scan</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-5 py-4">
                {/* Animated scan orb */}
                <div className="relative w-20 h-20 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 animate-spin" />
                  <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-blue-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest block mb-1">
                    AI SCAN IN PROGRESS
                  </span>
                  <h3 className="text-sm font-bold text-white">
                    {scanSteps[scanStepIndex]}
                  </h3>
                  <p className="text-slate-400 text-[11px] mt-1">
                    Reverse-engineering LLM grounding vectors for <strong className="text-white">{companyName}</strong>…
                  </p>
                </div>

                {/* Step progress list */}
                <div className="space-y-1.5 text-left">
                  {scanSteps.map((s, i) => (
                    <div key={i} className={`flex items-center gap-2 text-[11px] transition-all ${
                      i < scanStepIndex  ? 'text-emerald-400' :
                      i === scanStepIndex ? 'text-cyan-300 font-semibold' :
                      'text-slate-600'
                    }`}>
                      {i < scanStepIndex
                        ? <CheckCircle2 className="w-3 h-3 shrink-0" />
                        : i === scanStepIndex
                        ? <RefreshCw className="w-3 h-3 shrink-0 animate-spin" />
                        : <div className="w-3 h-3 rounded-full border border-slate-700 shrink-0" />
                      }
                      <span>{s}</span>
                    </div>
                  ))}
                </div>

                {/* Overall progress bar */}
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700"
                    style={{ width: `${((scanStepIndex + 1) / scanSteps.length) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
