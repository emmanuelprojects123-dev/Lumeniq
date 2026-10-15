import React, { useState } from 'react';
import {
  CreditCard,
  Check,
  ShieldCheck,
  Zap,
  Key,
  Globe,
  CheckCircle2,
  ExternalLink,
  Layers
} from 'lucide-react';
import { initialPlans } from '../data/mockInitialData';
import { Workspace } from '../types';
import { useToast } from '../components/Toast';

interface BillingSettingsViewProps {
  workspace: Workspace;
  onUpdateWorkspace: (updated: Partial<Workspace>) => void;
}

export const BillingSettingsView: React.FC<BillingSettingsViewProps> = ({
  workspace,
  onUpdateWorkspace
}) => {
  const { showToast } = useToast();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [activeTab, setActiveTab] = useState<'plans' | 'integrations' | 'api-keys'>('plans');
  const [apiKeyGenerated, setApiKeyGenerated] = useState('lq_live_9f82a17cb09e44318721fa093');

  const plans = initialPlans;

  const integrations = [
    { name: 'Google Search Console', desc: 'Sync organic keyword rankings with AI query discovery.', connected: true },
    { name: 'HubSpot CRM', desc: 'Track deals influenced by AI search referral sessions.', connected: true },
    { name: 'Salesforce', desc: 'Enterprise pipeline attribution and closed-won tracking.', connected: false },
    { name: 'WordPress / CMS Plugin', desc: 'Publish approved comparison briefs & schema automatically.', connected: false },
    { name: 'Webflow', desc: 'Push generated answer pages directly to Webflow collections.', connected: false },
  ];

  const handleSelectPlan = (planName: string) => {
    onUpdateWorkspace({ plan: planName });
    showToast(`Successfully upgraded to the ${planName} plan!`, 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Billing, Subscriptions & Platform Integrations
              </h2>
              <p className="text-xs text-slate-400">
                Manage your LUMENIQ subscription, connected CRM/CMS tools, and developer API keys.
              </p>
            </div>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('plans')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'plans' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Subscription Plans
          </button>
          <button
            onClick={() => setActiveTab('integrations')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'integrations' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Integrations
          </button>
          <button
            onClick={() => setActiveTab('api-keys')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'api-keys' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            API Keys
          </button>
        </div>
      </div>

      {/* Tab: Plans */}
      {activeTab === 'plans' && (
        <div className="space-y-6 animate-fade-in-up">
          {/* Monthly / Annual Toggle */}
          <div className="flex items-center justify-center gap-3">
            <span className={`text-xs font-semibold ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="w-12 h-6 rounded-full bg-blue-600 p-0.5 relative transition-colors cursor-pointer"
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-semibold ${billingCycle === 'annual' ? 'text-white' : 'text-slate-400'}`}>
                Annual Billing
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Save 20%
              </span>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {plans.map((p) => {
              const isCurrent = workspace.plan.toLowerCase() === p.name.toLowerCase().split(' ')[0];
              const price = billingCycle === 'annual' ? p.priceAnnual : p.priceMonthly;

              return (
                <div
                  key={p.id}
                  className={`p-4 rounded-2xl border flex flex-col justify-between transition-all relative ${
                    p.popular
                      ? 'bg-gradient-to-b from-slate-900 to-blue-950/40 border-blue-500 shadow-xl shadow-blue-500/10'
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  {p.popular && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-bold text-white">{p.name}</h3>
                    <div className="my-3 font-mono">
                      <span className="text-2xl font-extrabold text-white">${price}</span>
                      <span className="text-slate-400 text-xs">/mo</span>
                    </div>
                    <p className="text-[11px] text-slate-400 min-h-[32px] leading-snug mb-3">
                      {p.description}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-slate-800 text-[11px] text-slate-300">
                      {p.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span className="leading-tight">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectPlan(p.name)}
                    disabled={isCurrent}
                    className={`mt-5 w-full py-2 rounded-xl text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-slate-800 text-slate-400 cursor-default'
                        : p.popular
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    {isCurrent ? 'Current Plan' : 'Select Plan'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab: Integrations */}
      {activeTab === 'integrations' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <h3 className="text-sm font-bold text-white">Supported Marketing & CRM Connectors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integrations.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <h4 className="font-bold text-white">{item.name}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                  </div>

                  <button
                    onClick={() => showToast(`${item.name} integration status updated!`, 'info')}
                    className={`px-3 py-1.5 rounded-lg font-bold text-xs shrink-0 transition-all ${
                      item.connected
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-blue-600 hover:bg-blue-500 text-white'
                    }`}
                  >
                    {item.connected ? 'Connected' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: API Keys */}
      {activeTab === 'api-keys' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 max-w-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-cyan-400" />
            <span>Developer REST API & Webhooks</span>
          </h3>
          <p className="text-xs text-slate-300">
            Use your secure API key to query visibility scores, fetch citations, and export AI responses programmatically.
          </p>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 flex items-center justify-between">
            <span className="truncate">{apiKeyGenerated}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(apiKeyGenerated);
                showToast('API Key copied to clipboard!', 'success');
              }}
              className="px-2.5 py-1 rounded bg-slate-800 text-white hover:bg-slate-700 text-xs font-sans shrink-0 ml-2"
            >
              Copy
            </button>
          </div>

          <button
            onClick={() => {
              setApiKeyGenerated(`lq_live_${Math.random().toString(36).substring(2, 15)}`);
              showToast('New API Key rolled successfully!', 'success');
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            Regenerate Secret Key
          </button>
        </div>
      )}
    </div>
  );
};
