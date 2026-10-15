import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar, NavTab } from './components/Sidebar';
import { OverviewView } from './views/OverviewView';
import { AIVisibilityView } from './views/AIVisibilityView';
import { QueryLabView } from './views/QueryLabView';
import { CompetitorsView } from './views/CompetitorsView';
import { CitationsView } from './views/CitationsView';
import { SourceInfluenceGraphView } from './views/SourceInfluenceGraphView';
import { TrafficRevenueView } from './views/TrafficRevenueView';
import { VisibilityGapsView } from './views/VisibilityGapsView';
import { ActionCenterView } from './views/ActionCenterView';
import { ContentOptimizerView } from './views/ContentOptimizerView';
import { BrandAccuracyView } from './views/BrandAccuracyView';
import { OpportunityRadarView } from './views/OpportunityRadarView';
import { AIReadinessView } from './views/AIReadinessView';
import { CopilotView } from './views/CopilotView';
import { HealthReportView } from './views/HealthReportView';
import { AgencyView } from './views/AgencyView';
import { AdminView } from './views/AdminView';
import { BillingSettingsView } from './views/BillingSettingsView';
import { OnboardingModal } from './components/OnboardingModal';
import { FreeVisibilityCheckerModal } from './components/FreeVisibilityCheckerModal';

import {
  initialWorkspace,
  initialScoreDimensions,
  initialShareOfVoice,
  initialMonitoredQueries,
  initialVisibilityGaps,
  initialActionPlan,
  initialCitations,
  initialInfluenceNodes,
  initialInfluenceEdges,
  initialTrafficByEngine,
  initialOpportunities,
  initialContentDecay,
  initialTechnicalReadiness,
  initialFactChecks,
  initialCompetitorMoves
} from './data/mockInitialData';

import {
  Workspace,
  ScoreDimensions,
  ShareOfVoiceItem,
  MonitoredQuery,
  VisibilityGapItem,
  ActionPlanItem,
  CitationItem,
  TrafficByEngine,
  TimeRange,
  ActionStatus,
  CompetitorMoveAlert
} from './types';

import { ToastProvider, useToast } from './components/Toast';
import { ErrorBoundary } from './components/ErrorBoundary';

function AppContent() {
  const { showToast } = useToast();
  const [currentTab, setCurrentTab] = useState<NavTab>('overview');
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [workspace, setWorkspace] = useState<Workspace>(initialWorkspace);

  // Core Data States
  const [scoreDimensions, setScoreDimensions] = useState<ScoreDimensions>(initialScoreDimensions);
  const [shareOfVoice, setShareOfVoice] = useState<ShareOfVoiceItem[]>(initialShareOfVoice);
  const [queries, setQueries] = useState<MonitoredQuery[]>(initialMonitoredQueries);
  const [visibilityGaps, setVisibilityGaps] = useState<VisibilityGapItem[]>(initialVisibilityGaps);
  const [actions, setActions] = useState<ActionPlanItem[]>(initialActionPlan);
  const [citations, setCitations] = useState<CitationItem[]>(initialCitations);
  const [trafficByEngine, setTrafficByEngine] = useState<TrafficByEngine[]>(initialTrafficByEngine);
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [decayItems, setDecayItems] = useState(initialContentDecay);
  const [readinessItems, setReadinessItems] = useState(initialTechnicalReadiness);
  const [factChecks, setFactChecks] = useState(initialFactChecks);
  const [competitorMoves, setCompetitorMoves] = useState<CompetitorMoveAlert[]>(initialCompetitorMoves);

  // Modals & Scanners
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isFreeCheckerOpen, setIsFreeCheckerOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // Update Workspace Partial
  const handleUpdateWorkspace = (updated: Partial<Workspace>) => {
    setWorkspace(prev => ({ ...prev, ...updated }));
  };

  // Add Action from Query Lab / Gaps / Citations
  const handleAddAction = (actionPartial: Partial<ActionPlanItem>) => {
    const newAct: ActionPlanItem = {
      id: `act-${Date.now()}`,
      title: actionPartial.title || 'New Optimization Task',
      category: actionPartial.category || 'Content',
      priority: actionPartial.priority || 'High',
      difficulty: actionPartial.difficulty || 'Medium',
      expectedImpact: actionPartial.expectedImpact || '+15% Recommendation Rate',
      status: actionPartial.status || 'Draft',
      owner: actionPartial.owner || 'Growth Team',
      aiSuggestion: actionPartial.aiSuggestion || 'Address identified gap',
      proposedCodeOrBrief: actionPartial.proposedCodeOrBrief || '',
      createdAt: new Date().toISOString().split('T')[0],
      history: [
        {
          timestamp: new Date().toLocaleString(),
          action: 'Created task via LUMENIQ Intelligence Engine',
          user: workspace.role
        }
      ]
    };
    setActions(prev => [newAct, ...prev]);
    showToast(`Task "${newAct.title}" added to Action Center!`, 'success');
  };

  // Add Query to Monitored List
  const handleAddQuery = (qPartial: Partial<MonitoredQuery>) => {
    const newQ: MonitoredQuery = {
      id: qPartial.id || `q-${Date.now()}`,
      query: qPartial.query || 'New buyer query',
      intent: qPartial.intent || 'Commercial',
      engineVisibility: qPartial.engineVisibility || { chatgpt: 'Pending', perplexity: 'Pending', gemini: 'Pending', claude: 'Pending', copilot: 'Pending' },
      ourRank: qPartial.ourRank || 2,
      topWinner: qPartial.topWinner || 'Mixpanel',
      brandMentioned: qPartial.brandMentioned !== undefined ? qPartial.brandMentioned : true,
      recommended: qPartial.recommended || false,
      searchVolumeEstimate: qPartial.searchVolumeEstimate || '6,500/mo AI Queries',
      citations: qPartial.citations || ['pulsemetrics.io'],
      lastChecked: 'Just now',
      trend: 'up'
    };
    setQueries(prev => [newQ, ...prev]);
    showToast(`Added query "${newQ.query}" to monitoring queue.`, 'info');
  };

  // Action status update (Approve, Reject, Execute, Publish)
  const handleUpdateActionStatus = (id: string, newStatus: ActionStatus, note?: string) => {
    setActions(prev => prev.map(a => {
      if (a.id === id) {
        return {
          ...a,
          status: newStatus,
          history: [
            ...a.history,
            {
              timestamp: new Date().toLocaleString(),
              action: note || `Changed status to ${newStatus}`,
              user: workspace.role
            }
          ]
        };
      }
      return a;
    }));
    showToast(`Task status updated to ${newStatus}`, 'success');
  };

  // Add Competitor
  const handleAddCompetitor = (name: string) => {
    const newSOV: ShareOfVoiceItem = {
      id: `sov-${Date.now()}`,
      name,
      percentage: 10,
      trend: '+1.0%',
      isTarget: false,
      color: '#A855F7',
      mentionsCount: 280,
      recommendationsCount: 160
    };
    setShareOfVoice(prev => [...prev, newSOV]);
    showToast(`Competitor "${name}" added to continuous AI Search Radar!`, 'success');
  };

  // Handle Response Task from Competitor Move Alert
  const handleCreateResponseTask = (move: CompetitorMoveAlert) => {
    handleAddAction({
      title: `Counter Move: ${move.competitor} (${move.change})`,
      category: 'Content',
      priority: 'High',
      difficulty: 'Medium',
      expectedImpact: '+12% Recovery on Competitive Queries',
      status: 'Draft',
      owner: 'Marketing Team',
      aiSuggestion: move.recommendedResponse,
      proposedCodeOrBrief: `COMPETITOR: ${move.competitor}\nTRIGGER: ${move.change}\nRESPONSE STRATEGY: ${move.recommendedResponse}`
    });
    showToast('Strategic counter-task created in Action Center!', 'warning');
  };

  // Onboarding Scan Completed
  const handleCompleteScan = (data: any) => {
    if (!data) return;
    if (data.brand) {
      setWorkspace(prev => ({
        ...prev,
        name: data.brand,
        website: data.website || prev.website,
        industry: data.industry || prev.industry
      }));
    }
    if (data.scoreDimensions) {
      setScoreDimensions(data.scoreDimensions);
    }
    if (data.shareOfVoice && data.shareOfVoice.length > 0) {
      setShareOfVoice(data.shareOfVoice.map((s: any, idx: number) => ({
        id: `sov-scan-${idx}`,
        name: s.name,
        percentage: s.percentage,
        trend: s.trend || '+2%',
        isTarget: s.isTarget || false,
        color: s.isTarget ? '#3B82F6' : idx === 1 ? '#8B5CF6' : idx === 2 ? '#EC4899' : '#F59E0B',
        mentionsCount: Math.round(s.percentage * 25),
        recommendationsCount: Math.round(s.percentage * 16)
      })));
    }
    if (data.topQueries && data.topQueries.length > 0) {
      setQueries(data.topQueries);
    }
    if (data.visibilityGaps && data.visibilityGaps.length > 0) {
      setVisibilityGaps(data.visibilityGaps.map((g: any, idx: number) => ({
        id: g.id || `gap-scan-${idx}`,
        category: g.category,
        severity: g.severity,
        impactScore: g.impact || 85,
        confidenceScore: g.confidence || 92,
        difficulty: g.difficulty || 'Medium',
        estimatedOpportunity: g.estimatedOpportunity || '+18%',
        description: g.description,
        suggestedFix: g.suggestedFix,
        affectedQueriesCount: 8,
        status: 'Open'
      })));
    }
    if (data.actionPlan && data.actionPlan.length > 0) {
      setActions(data.actionPlan.map((a: any, idx: number) => ({
        id: a.id || `act-scan-${idx}`,
        title: a.title,
        category: a.category || 'Content',
        priority: a.priority || 'High',
        difficulty: a.difficulty || 'Medium',
        expectedImpact: a.expectedImpact || '+15%',
        status: a.status || 'Draft',
        owner: a.owner || 'Growth Team',
        aiSuggestion: a.aiSuggestion,
        createdAt: new Date().toISOString().split('T')[0],
        history: [{ timestamp: new Date().toLocaleString(), action: 'Discovered during brand audit', user: 'LUMENIQ Agent' }]
      })));
    }
    showToast(`AI Scan Complete! Baseline Visibility Report generated for ${data.brand || 'your brand'}.`, 'success');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white bg-gradient-mesh bg-grid-pattern">
      {/* Top Header */}
      <Header
        workspace={workspace}
        onUpdateWorkspace={handleUpdateWorkspace}
        timeRange={timeRange}
        onChangeTimeRange={setTimeRange}
        onOpenScanModal={() => setIsOnboardingOpen(true)}
        onOpenFreeChecker={() => setIsFreeCheckerOpen(true)}
        onOpenReportModal={() => setCurrentTab('health-report')}
        isScanning={isScanning}
      />

      <div className="flex flex-1">
        {/* Sleek Sidebar Navigation */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          gapsCount={visibilityGaps.length}
          actionsCount={actions.filter(a => a.status === 'Draft' || a.status === 'Review').length}
          isAgencyMode={workspace.role === 'Agency'}
        />

        {/* Main Workspace Body */}
        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          <ErrorBoundary key={currentTab} onReset={() => setCurrentTab('overview')}>
          {currentTab === 'overview' && (
            <OverviewView
              workspace={workspace}
              scoreDimensions={scoreDimensions}
              shareOfVoice={shareOfVoice}
              queries={queries}
              actions={actions}
              gaps={visibilityGaps}
              competitorMoves={competitorMoves}
              trafficByEngine={trafficByEngine}
              onNavigate={setCurrentTab}
              onRunScan={() => setIsOnboardingOpen(true)}
              onOpenReport={() => setCurrentTab('health-report')}
            />
          )}

          {currentTab === 'ai-visibility' && (
            <AIVisibilityView
              scoreDimensions={scoreDimensions}
              timeRange={timeRange}
              onChangeTimeRange={setTimeRange}
              brandName={workspace.name}
            />
          )}

          {currentTab === 'query-lab' && (
            <QueryLabView
              workspace={workspace}
              queries={queries}
              onAddAction={handleAddAction}
              onAddQuery={handleAddQuery}
            />
          )}

          {currentTab === 'competitors' && (
            <CompetitorsView
              shareOfVoice={shareOfVoice}
              competitorMoves={competitorMoves}
              onAddCompetitor={handleAddCompetitor}
              onCreateResponseAction={handleCreateResponseTask}
            />
          )}

          {currentTab === 'citations' && (
            <CitationsView
              citations={citations}
              onAddAction={handleAddAction}
              brandName={workspace.name}
            />
          )}

          {currentTab === 'source-influence' && (
            <SourceInfluenceGraphView
              nodes={initialInfluenceNodes}
              edges={initialInfluenceEdges}
            />
          )}

          {currentTab === 'traffic-revenue' && (
            <TrafficRevenueView
              trafficByEngine={trafficByEngine}
            />
          )}

          {currentTab === 'visibility-gaps' && (
            <VisibilityGapsView
              gaps={visibilityGaps}
              onAddAction={handleAddAction}
            />
          )}

          {currentTab === 'action-center' && (
            <ActionCenterView
              actions={actions}
              onUpdateActionStatus={handleUpdateActionStatus}
              onAddNewAction={(act) => setActions(prev => [act, ...prev])}
            />
          )}

          {currentTab === 'content-optimizer' && (
            <ContentOptimizerView
              brandName={workspace.name}
            />
          )}

          {currentTab === 'brand-accuracy' && (
            <BrandAccuracyView
              factChecks={factChecks}
              brandName={workspace.name}
              website={workspace.website}
              onAddAction={handleAddAction}
            />
          )}

          {currentTab === 'opportunity-radar' && (
            <OpportunityRadarView
              opportunities={opportunities}
              decayItems={decayItems}
              onAddAction={handleAddAction}
            />
          )}

          {currentTab === 'ai-readiness' && (
            <AIReadinessView
              items={readinessItems}
              brandName={workspace.name}
            />
          )}

          {currentTab === 'copilot' && (
            <CopilotView
              workspace={workspace}
              scoreDimensions={scoreDimensions}
            />
          )}

          {currentTab === 'health-report' && (
            <HealthReportView
              workspace={workspace}
              scoreDimensions={scoreDimensions}
              shareOfVoice={shareOfVoice}
              queries={queries}
              actions={actions}
              gaps={visibilityGaps}
              brandName={workspace.name}
            />
          )}

          {currentTab === 'agency' && (
            <AgencyView />
          )}

          {currentTab === 'admin' && (
            <AdminView />
          )}

          {currentTab === 'billing-settings' && (
            <BillingSettingsView
              workspace={workspace}
              onUpdateWorkspace={handleUpdateWorkspace}
            />
          )}
          </ErrorBoundary>
        </main>
      </div>

      {/* 5-Step Brand Onboarding Wizard Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onCompleteScan={handleCompleteScan}
      />

      {/* PLG Free AI Visibility Checker Modal */}
      <FreeVisibilityCheckerModal
        isOpen={isFreeCheckerOpen}
        onClose={() => setIsFreeCheckerOpen(false)}
        onImportToWorkspace={handleCompleteScan}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
