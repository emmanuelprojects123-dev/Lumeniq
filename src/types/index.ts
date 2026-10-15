export type UserRole = 
  | 'Business Owner' 
  | 'Marketing Manager' 
  | 'SEO/AEO Specialist' 
  | 'Agency' 
  | 'Enterprise Admin';

export type TimeRange = '7d' | '30d' | '90d' | '12m';

export interface ScoreDimensions {
  mentionVisibility: number;     // 0-100
  recommendationStrength: number; // 0-100
  citationStrength: number;       // 0-100
  competitiveShare: number;       // 0-100
  queryCoverage: number;          // 0-100
  aiReferralQuality: number;      // 0-100
  accuracyScore: number;          // 0-100
}

export interface ShareOfVoiceItem {
  id: string;
  name: string;
  percentage: number;
  trend: string;
  isTarget: boolean;
  color: string;
  mentionsCount: number;
  recommendationsCount: number;
}

export type QueryIntent = 'Informational' | 'Commercial' | 'Comparison' | 'Alternatives' | 'Transactional' | 'Local';

export interface MonitoredQuery {
  id: string;
  query: string;
  intent: QueryIntent;
  engineVisibility: {
    chatgpt: string;
    perplexity: string;
    gemini: string;
    claude: string;
    copilot: string;
  };
  ourRank: number;
  topWinner: string;
  brandMentioned: boolean;
  recommended: boolean;
  searchVolumeEstimate: string;
  citations: string[];
  lastChecked: string;
  trend: 'up' | 'down' | 'stable';
  language?: string;
  location?: string;
}

export interface VisibilityGapItem {
  id: string;
  category: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  impactScore: number;       // 0-100
  confidenceScore: number;   // 0-100
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedOpportunity: string;
  description: string;
  suggestedFix: string;
  affectedQueriesCount: number;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Ignored';
}

export type ActionStatus = 'Draft' | 'Review' | 'Approved' | 'Executing' | 'Published' | 'Rejected';

export interface ActionPlanItem {
  id: string;
  title: string;
  category: 'Content' | 'Technical AEO' | 'Authority / Citations' | 'Brand Accuracy' | 'Schema Markup';
  priority: 'High' | 'Medium' | 'Low';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  expectedImpact: string;
  status: ActionStatus;
  owner: string;
  aiSuggestion: string;
  proposedCodeOrBrief?: string;
  createdAt: string;
  reviewedBy?: string;
  history: Array<{ timestamp: string; action: string; user: string }>;
}

export interface CitationItem {
  id: string;
  domain: string;
  url: string;
  pageTitle: string;
  citationCount: number;
  competitorCitationsCount: number;
  authorityScore: number; // 0-100
  influencingEngines: string[];
  contextType: 'Product Comparison' | 'Roundup List' | 'Technical Review' | 'Forum Discussion' | 'Documentation';
  status: 'Citing You' | 'Competitor Only' | 'Opportunity';
  firstSeen: string;
}

export interface InfluenceNode {
  id: string;
  label: string;
  type: 'engine' | 'source' | 'content' | 'mention' | 'referral' | 'conversion';
  subtext?: string;
  volume?: string;
}

export interface InfluenceEdge {
  from: string;
  to: string;
  label?: string;
  conversionRate?: string;
}

export interface TrafficByEngine {
  engine: string;
  visits: number;
  bounceRate: string;
  avgDuration: string;
  leadsGenerated: number;
  conversionRate: string;
  revenueInfluenced: number;
}

export type AttributionModel = 'First Touch' | 'Last Touch' | 'Multi-Touch' | 'AI-Assisted';

export interface OpportunityItem {
  id: string;
  title: string;
  category: 'Emerging Query' | 'Competitor Gap' | 'Unanswered Query' | 'Citation Goldmine' | 'High-Intent Commercial';
  impact: 'High' | 'Medium' | 'Low';
  trafficPotential: string;
  revenuePotential: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  recommendedAction: string;
}

export interface ContentDecayItem {
  id: string;
  pageUrl: string;
  pageTitle: string;
  previousCitations: number;
  currentCitations: number;
  decayPercentage: number;
  reason: string;
  refreshAction: string;
}

export interface TechnicalReadinessItem {
  id: string;
  criterion: string;
  score: number;
  status: 'Passed' | 'Warning' | 'Failed';
  details: string;
  codeSnippet?: string;
}

export interface FactCheckItem {
  id: string;
  topic: string;
  engine: string;
  hallucinatedText: string;
  verifiedTruth: string;
  severity: 'High' | 'Medium' | 'Low';
  detectedDate: string;
  fixStatus: 'Action Required' | 'Remediation Deployed' | 'Resolved';
  remedy: string;
}

export interface CompetitorMoveAlert {
  id: string;
  date: string;
  competitor: string;
  change: string;
  reason: string;
  recommendedResponse: string;
  urgency: 'Immediate' | 'Moderate' | 'FYI';
}

export interface PlanConfig {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  description: string;
  popular?: boolean;
  features: string[];
  limits: {
    websites: number;
    aiQueriesPerMonth: number;
    competitors: number;
    seats: number;
    reports: string;
  };
}

export interface Workspace {
  id: string;
  name: string;
  website: string;
  industry: string;
  role: UserRole;
  plan: string;
  monitoredLanguages: string[];
  targetLocations: string[];
}
