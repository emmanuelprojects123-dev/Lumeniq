import React, { useState } from 'react';
import {
  Sparkles,
  Globe,
  Bell,
  ChevronDown,
  RefreshCw,
  Search,
  ExternalLink,
  ShieldCheck,
  Building,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Workspace, UserRole, TimeRange } from '../types';

interface HeaderProps {
  workspace: Workspace;
  onUpdateWorkspace: (updated: Partial<Workspace>) => void;
  timeRange: TimeRange;
  onChangeTimeRange: (range: TimeRange) => void;
  onOpenScanModal: () => void;
  onOpenFreeChecker: () => void;
  onOpenReportModal: () => void;
  isScanning: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  workspace,
  onUpdateWorkspace,
  timeRange,
  onChangeTimeRange,
  onOpenScanModal,
  onOpenFreeChecker,
  onOpenReportModal,
  isScanning
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showWsMenu, setShowWsMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const roles: UserRole[] = [
    'Business Owner',
    'Marketing Manager',
    'SEO/AEO Specialist',
    'Agency',
    'Enterprise Admin'
  ];

  const sampleWorkspaces = [
    { id: 'ws-main', name: 'PulseMetrics Global', url: 'pulsemetrics.io' },
    { id: 'ws-2', name: 'NovaHealth Care', url: 'novahealth.io' },
    { id: 'ws-3', name: 'Apex FinTech', url: 'apexfin.com' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/85 backdrop-blur-xl border-b border-slate-800/80
                       px-4 lg:px-6 py-3 flex items-center justify-between gap-4 shadow-lg">
      {/* Left: Brand Identity & Active Workspace */}
      <div className="flex items-center gap-4 lg:gap-5">
        <div className="flex items-center gap-2.5">
          {/* Animated logo ring */}
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400
                            animate-gradient opacity-90 shadow-lg shadow-blue-500/30" />
            <div className="absolute inset-0.5 bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base tracking-tight text-gradient-hero">
                LUMENIQ
              </span>
              <span className="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded
                               bg-blue-500/12 text-blue-400 border border-blue-500/25">
                AEO / GEO
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
              AI Search Visibility & Discovery
            </p>
          </div>
        </div>

        {/* Workspace Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setShowWsMenu(!showWsMenu);
              setShowRoleMenu(false);
              setShowNotifMenu(false);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 text-xs font-medium transition-all"
          >
            <Building className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-semibold max-w-[130px] truncate">{workspace.name}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showWsMenu && (
            <div className="absolute left-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50">
              <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Active Workspaces
              </div>
              {sampleWorkspaces.map((ws) => (
                <button
                  key={ws.id}
                  onClick={() => {
                    onUpdateWorkspace({ name: ws.name, website: `https://${ws.url}` });
                    setShowWsMenu(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-800/80 transition-colors ${
                    workspace.name === ws.name ? 'text-blue-400 font-semibold bg-blue-950/30' : 'text-slate-300'
                  }`}
                >
                  <div>
                    <div>{ws.name}</div>
                    <div className="text-[10px] text-slate-400">{ws.url}</div>
                  </div>
                  {workspace.name === ws.name && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                </button>
              ))}
              <div className="border-t border-slate-800 mt-2 pt-2 px-2">
                <button
                  onClick={() => {
                    setShowWsMenu(false);
                    onOpenScanModal();
                  }}
                  className="w-full py-1.5 px-3 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-medium text-center transition-colors"
                >
                  + Add New Brand Workspace
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center/Right: Role Adaptation, Time Range, Actions */}
      <div className="flex items-center gap-2 lg:gap-3">
        {/* Role Persona Toggle */}
        <div className="relative hidden md:block">
          <button
            onClick={() => {
              setShowRoleMenu(!showRoleMenu);
              setShowWsMenu(false);
              setShowNotifMenu(false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-300 text-xs border border-slate-700/50"
            title="Switch Persona to adapt insights & metrics"
          >
            <span className="text-[10px] text-slate-400">View:</span>
            <span className="font-semibold text-slate-200">{workspace.role}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50">
              <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Tailored Perspective
              </div>
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    onUpdateWorkspace({ role: r });
                    setShowRoleMenu(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-800/80 transition-colors ${
                    workspace.role === r ? 'text-blue-400 font-semibold bg-blue-950/30' : 'text-slate-300'
                  }`}
                >
                  <span>{r}</span>
                  {workspace.role === r && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Time range selector */}
        <div className="flex items-center bg-slate-800/70 rounded-lg p-0.5 border border-slate-700/50 text-xs">
          {(['7d', '30d', '90d'] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => onChangeTimeRange(range)}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                timeRange === range
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Free AI Checker Lead Magnet Button */}
        <button
          onClick={onOpenFreeChecker}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-medium transition-all"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Public Checker</span>
        </button>

        {/* Signature Report Button */}
        <button
          onClick={onOpenReportModal}
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          <span>Health Report</span>
        </button>

        {/* Trigger Scan Button */}
        <button
          onClick={onOpenScanModal}
          disabled={isScanning}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg
                     bg-gradient-to-r from-blue-600 to-indigo-600
                     hover:from-blue-500 hover:to-indigo-500
                     text-white text-xs font-bold shadow-lg shadow-blue-500/25
                     transition-all disabled:opacity-50 glow-blue"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">{isScanning ? 'Scanning AI…' : 'Rescan Brand'}</span>
          <span className="sm:hidden">{isScanning ? '…' : 'Scan'}</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifMenu(!showNotifMenu);
              setShowWsMenu(false);
              setShowRoleMenu(false);
            }}
            className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 flex items-center justify-center text-slate-300 relative transition-all"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-slate-900" />
          </button>

          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50">
              <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">AI Intelligence Alerts</span>
                <span className="text-[10px] text-blue-400 font-medium">3 New</span>
              </div>
              <div className="divide-y divide-slate-800/50 max-h-72 overflow-y-auto">
                <div className="p-3 hover:bg-slate-800/50 text-xs">
                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-0.5">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Competitor Move Alert</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">Datadog gained +14% visibility on enterprise DevOps queries.</p>
                  <span className="text-[10px] text-slate-500 mt-1 block">18 mins ago</span>
                </div>
                <div className="p-3 hover:bg-slate-800/50 text-xs">
                  <div className="flex items-center gap-1.5 text-blue-400 font-semibold mb-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Citation Surge</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">Your brand was cited in 12 new Perplexity answers today.</p>
                  <span className="text-[10px] text-slate-500 mt-1 block">2 hours ago</span>
                </div>
                <div className="p-3 hover:bg-slate-800/50 text-xs">
                  <div className="flex items-center gap-1.5 text-rose-400 font-semibold mb-0.5">
                    <AlertTriangle className="w-3 h-3" />
                    <span>AI Accuracy Flag</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">Claude 3.7 incorrectly claimed you lack self-serve pricing.</p>
                  <span className="text-[10px] text-slate-500 mt-1 block">5 hours ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Plan Badge */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-[11px] font-medium text-slate-300">
          <ShieldCheck className="w-3 h-3 text-cyan-400" />
          <span>{workspace.plan} Tier</span>
        </div>
      </div>
    </header>
  );
};
