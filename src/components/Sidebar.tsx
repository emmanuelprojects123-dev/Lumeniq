import React from 'react';
import {
  LayoutDashboard,
  Eye,
  FlaskConical,
  Users,
  Quote,
  GitFork,
  TrendingUp,
  AlertOctagon,
  CheckSquare,
  FileCode2,
  ShieldAlert,
  Radar,
  Binary,
  Bot,
  FileText,
  Briefcase,
  Sliders,
  CreditCard,
  Sparkles
} from 'lucide-react';

export type NavTab = 
  | 'overview'
  | 'ai-visibility'
  | 'query-lab'
  | 'competitors'
  | 'citations'
  | 'source-influence'
  | 'traffic-revenue'
  | 'visibility-gaps'
  | 'action-center'
  | 'content-optimizer'
  | 'brand-accuracy'
  | 'opportunity-radar'
  | 'ai-readiness'
  | 'copilot'
  | 'health-report'
  | 'agency'
  | 'admin'
  | 'billing-settings';

interface NavItem {
  id: NavTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  count?: number;
  badgeColor?: string;
  isAi?: boolean;
  highlight?: boolean;
  show?: boolean;
}

interface NavSection {
  group: string;
  items: NavItem[];
}

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  gapsCount: number;
  actionsCount: number;
  isAgencyMode: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  gapsCount,
  actionsCount,
  isAgencyMode,
}) => {
  const navSections: NavSection[] = [
    {
      group: 'Core AEO Engine',
      items: [
        { id: 'overview' as NavTab, label: 'Overview', icon: LayoutDashboard },
        { id: 'ai-visibility' as NavTab, label: 'AI Visibility Score', icon: Eye, badge: '74' },
        { id: 'query-lab' as NavTab, label: 'Query Lab', icon: FlaskConical, highlight: true },
        { id: 'competitors' as NavTab, label: 'Competitor Radar', icon: Users },
      ],
    },
    {
      group: 'Discovery & Influence',
      items: [
        { id: 'citations' as NavTab, label: 'Citation Intelligence', icon: Quote },
        { id: 'source-influence' as NavTab, label: 'Source Influence Graph', icon: GitFork, badge: 'Flow' },
        { id: 'opportunity-radar' as NavTab, label: 'Opportunity & Decay', icon: Radar },
      ],
    },
    {
      group: 'Execution & Impact',
      items: [
        { id: 'traffic-revenue' as NavTab, label: 'AI Traffic & Revenue', icon: TrendingUp },
        { id: 'visibility-gaps' as NavTab, label: 'Visibility Gap Engine', icon: AlertOctagon, count: gapsCount, badgeColor: 'bg-rose-500/20 text-rose-300' },
        { id: 'action-center' as NavTab, label: 'Action Center', icon: CheckSquare, count: actionsCount, badgeColor: 'bg-blue-500/20 text-blue-300' },
        { id: 'content-optimizer' as NavTab, label: 'Content Optimizer', icon: FileCode2 },
      ],
    },
    {
      group: 'Auditing & Intelligence',
      items: [
        { id: 'brand-accuracy' as NavTab, label: 'AI Brand Fact Checker', icon: ShieldAlert, badge: '88%' },
        { id: 'ai-readiness' as NavTab, label: 'Technical AI Readiness', icon: Binary },
        { id: 'copilot' as NavTab, label: 'LUMENIQ Copilot', icon: Bot, isAi: true },
        { id: 'health-report' as NavTab, label: 'AI Health Report', icon: FileText },
      ],
    },
    {
      group: 'Platform & Scaling',
      items: [
        { id: 'agency' as NavTab, label: 'Agency Hub', icon: Briefcase, show: true },
        { id: 'admin' as NavTab, label: 'Admin Console', icon: Sliders },
        { id: 'billing-settings' as NavTab, label: 'Billing & Settings', icon: CreditCard },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-[calc(100vh-57px)] sticky top-[57px] shrink-0">
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navSections.map((section, idx) => (
          <div key={idx}>
            <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {section.group}
            </div>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl
                                text-xs font-medium transition-all group
                      ${isActive
                        ? 'nav-item-active text-white font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                      }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isActive
                            ? 'text-white'
                            : item.isAi
                            ? 'text-cyan-400 group-hover:scale-110'
                            : item.highlight
                            ? 'text-indigo-400 group-hover:scale-110'
                            : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.isAi && (
                        <Sparkles className="w-3 h-3 text-cyan-300 animate-pulse" />
                      )}
                      {item.badge && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-800 text-slate-300 border border-slate-700'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      {item.count !== undefined && item.count > 0 && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                            isActive
                              ? 'bg-white text-blue-700'
                              : item.badgeColor || 'bg-slate-700 text-slate-200'
                          }`}
                        >
                          {item.count}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer System Status Banner */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/80">
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
          <span className="flex items-center gap-1.5 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            AI Grounding Engine
          </span>
          <span className="text-emerald-400 font-mono text-[10px] font-bold">Active</span>
        </div>
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-slate-500">Monitoring 5 AI environments</span>
          <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono">v2.0</span>
        </div>
      </div>
    </aside>
  );
};
