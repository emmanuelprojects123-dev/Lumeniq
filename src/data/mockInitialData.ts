import {
  ScoreDimensions,
  ShareOfVoiceItem,
  MonitoredQuery,
  VisibilityGapItem,
  ActionPlanItem,
  CitationItem,
  InfluenceNode,
  InfluenceEdge,
  TrafficByEngine,
  OpportunityItem,
  ContentDecayItem,
  TechnicalReadinessItem,
  FactCheckItem,
  CompetitorMoveAlert,
  PlanConfig,
  Workspace
} from '../types';

export const initialWorkspace: Workspace = {
  id: 'ws-main',
  name: 'PulseMetrics Global',
  website: 'https://pulsemetrics.io',
  industry: 'Product Analytics & AI Intelligence',
  role: 'Marketing Manager',
  plan: 'Growth',
  monitoredLanguages: ['English', 'Spanish', 'French', 'Portuguese'],
  targetLocations: ['United States', 'United Kingdom', 'Canada', 'Germany', 'Australia']
};

export const initialScoreDimensions: ScoreDimensions = {
  mentionVisibility: 82,
  recommendationStrength: 68,
  citationStrength: 76,
  competitiveShare: 61,
  queryCoverage: 79,
  aiReferralQuality: 65,
  accuracyScore: 88
};

export const initialShareOfVoice: ShareOfVoiceItem[] = [
  {
    id: 'sov-1',
    name: 'PulseMetrics (You)',
    percentage: 31,
    trend: '+5.4%',
    isTarget: true,
    color: '#3B82F6',
    mentionsCount: 842,
    recommendationsCount: 512
  },
  {
    id: 'sov-2',
    name: 'Mixpanel',
    percentage: 28,
    trend: '-2.1%',
    isTarget: false,
    color: '#8B5CF6',
    mentionsCount: 790,
    recommendationsCount: 540
  },
  {
    id: 'sov-3',
    name: 'Amplitude',
    percentage: 22,
    trend: '-1.4%',
    isTarget: false,
    color: '#EC4899',
    mentionsCount: 610,
    recommendationsCount: 430
  },
  {
    id: 'sov-4',
    name: 'Datadog Product Analytics',
    percentage: 12,
    trend: '+4.2%',
    isTarget: false,
    color: '#F59E0B',
    mentionsCount: 380,
    recommendationsCount: 220
  },
  {
    id: 'sov-5',
    name: 'Others / Open Source',
    percentage: 7,
    trend: '-6.1%',
    isTarget: false,
    color: '#64748B',
    mentionsCount: 210,
    recommendationsCount: 95
  }
];

export const initialMonitoredQueries: MonitoredQuery[] = [
  {
    id: 'q-101',
    query: 'What is the best product analytics software for B2B SaaS in 2026?',
    intent: 'Commercial',
    engineVisibility: {
      chatgpt: 'Recommended (#1)',
      perplexity: 'Recommended (#2)',
      gemini: 'Mentioned (#3)',
      claude: 'Recommended (#1)',
      copilot: 'Mentioned (#2)'
    },
    ourRank: 1,
    topWinner: 'PulseMetrics (You)',
    brandMentioned: true,
    recommended: true,
    searchVolumeEstimate: '18,500/mo AI Queries',
    citations: ['techcrunch.com/2026/product-analytics', 'g2.com/categories/analytics', 'pulsemetrics.io/guide'],
    lastChecked: '18 mins ago',
    trend: 'up',
    language: 'English',
    location: 'United States'
  },
  {
    id: 'q-102',
    query: 'PulseMetrics vs Mixpanel enterprise features comparison',
    intent: 'Comparison',
    engineVisibility: {
      chatgpt: 'Recommended (#1)',
      perplexity: 'Recommended (#1)',
      gemini: 'Mentioned (#2)',
      claude: 'Mentioned (#1)',
      copilot: 'Recommended (#1)'
    },
    ourRank: 1,
    topWinner: 'PulseMetrics (You)',
    brandMentioned: true,
    recommended: true,
    searchVolumeEstimate: '6,200/mo AI Queries',
    citations: ['pulsemetrics.io/vs/mixpanel', 'trustradius.com/compare', 'saasworthy.com/review'],
    lastChecked: '42 mins ago',
    trend: 'up',
    language: 'English',
    location: 'Global'
  },
  {
    id: 'q-103',
    query: 'Best alternatives to Amplitude with automated AI funnel insights',
    intent: 'Alternatives',
    engineVisibility: {
      chatgpt: 'Mentioned (#3)',
      perplexity: 'Recommended (#1)',
      gemini: 'Omitted',
      claude: 'Mentioned (#2)',
      copilot: 'Mentioned (#3)'
    },
    ourRank: 2,
    topWinner: 'Mixpanel',
    brandMentioned: true,
    recommended: false,
    searchVolumeEstimate: '9,400/mo AI Queries',
    citations: ['reddit.com/r/saas', 'g2.com/alternatives/amplitude'],
    lastChecked: '1 hour ago',
    trend: 'down',
    language: 'English',
    location: 'United States'
  },
  {
    id: 'q-104',
    query: 'How to track event retention without engineering bottlenecks',
    intent: 'Informational',
    engineVisibility: {
      chatgpt: 'Cited Source',
      perplexity: 'Cited (#1 Source)',
      gemini: 'Mentioned (#2)',
      claude: 'Omitted',
      copilot: 'Cited'
    },
    ourRank: 2,
    topWinner: 'Mixpanel',
    brandMentioned: true,
    recommended: false,
    searchVolumeEstimate: '14,100/mo AI Queries',
    citations: ['pulsemetrics.io/blog/retention-guide', 'posthog.com/tutorials'],
    lastChecked: '3 hours ago',
    trend: 'stable',
    language: 'English',
    location: 'Global'
  },
  {
    id: 'q-105',
    query: 'Which analytics tool has the fastest SOC-2 compliant SDK?',
    intent: 'Transactional',
    engineVisibility: {
      chatgpt: 'Mentioned (#2)',
      perplexity: 'Recommended (#1)',
      gemini: 'Mentioned (#1)',
      claude: 'Recommended (#1)',
      copilot: 'Mentioned (#2)'
    },
    ourRank: 1,
    topWinner: 'PulseMetrics (You)',
    brandMentioned: true,
    recommended: true,
    searchVolumeEstimate: '4,800/mo AI Queries',
    citations: ['pulsemetrics.io/security', 'github.com/pulsemetrics/sdk-ts'],
    lastChecked: '5 hours ago',
    trend: 'up',
    language: 'English',
    location: 'United States'
  },
  {
    id: 'q-106',
    query: 'Meilleur logiciel d\'analyse de produit pour scale-up',
    intent: 'Commercial',
    engineVisibility: {
      chatgpt: 'Mentioned (#3)',
      perplexity: 'Mentioned (#2)',
      gemini: 'Omitted',
      claude: 'Mentioned (#2)',
      copilot: 'Omitted'
    },
    ourRank: 3,
    topWinner: 'Mixpanel France',
    brandMentioned: true,
    recommended: false,
    searchVolumeEstimate: '2,900/mo AI Queries',
    citations: ['frenchweb.fr/saas-analytics', 'journaldunet.com'],
    lastChecked: '7 hours ago',
    trend: 'down',
    language: 'French',
    location: 'France'
  }
];

export const initialVisibilityGaps: VisibilityGapItem[] = [
  {
    id: 'gap-1',
    category: 'Missing comparison content',
    severity: 'Critical',
    impactScore: 92,
    confidenceScore: 95,
    difficulty: 'Medium',
    estimatedOpportunity: '+24% AI recommendation rate',
    description: 'Mixpanel and Amplitude are cited 4.3x more frequently on commercial intent queries because they host comprehensive, neutral comparison matrices across 18 specialized queries.',
    suggestedFix: 'Deploy dedicated comparison hub: "PulseMetrics vs Amplitude: 2026 Deep Architecture & Cost Breakdown" with verified customer benchmarks.',
    affectedQueriesCount: 14,
    status: 'In Progress'
  },
  {
    id: 'gap-2',
    category: 'Weak third-party authority citations',
    severity: 'High',
    impactScore: 86,
    confidenceScore: 91,
    difficulty: 'Hard',
    estimatedOpportunity: '+19% Perplexity & SearchGPT citation indexation',
    description: 'Perplexity and ChatGPT heavily rely on G2 Enterprise Grid, Capterra roundups, and HackerNews discussions where PulseMetrics has 62% fewer verified citations than Mixpanel.',
    suggestedFix: 'Syndicate customer case studies and participate in technical Reddit/HN developer discussions with source links.',
    affectedQueriesCount: 22,
    status: 'Open'
  },
  {
    id: 'gap-3',
    category: 'Missing structured data & entity signals',
    severity: 'High',
    impactScore: 78,
    confidenceScore: 94,
    difficulty: 'Easy',
    estimatedOpportunity: '+15% precision on pricing & enterprise compliance queries',
    description: 'AI engines hallucinate that PulseMetrics lacks EU data residency and custom data modeling because the documentation lacks Schema.org SoftwareApplication and FAQPage JSON-LD.',
    suggestedFix: 'Inject JSON-LD SoftwareApplication schema with structured feature specs and transparent pricing tiers.',
    affectedQueriesCount: 8,
    status: 'In Progress'
  },
  {
    id: 'gap-4',
    category: 'Content decay on high-volume tutorial pages',
    severity: 'Medium',
    impactScore: 65,
    confidenceScore: 87,
    difficulty: 'Easy',
    estimatedOpportunity: '+9% informational query citations',
    description: 'Your 2024 "Funnel Conversion Guide" citation rate dropped 38% after competitors refreshed theirs with 2026 AI-assisted pipeline workflows.',
    suggestedFix: 'Refresh the tutorial with modern diagrams, revised benchmark data, and dateModified schema updates.',
    affectedQueriesCount: 6,
    status: 'Open'
  },
  {
    id: 'gap-5',
    category: 'Weak multilingual entity recognition',
    severity: 'Medium',
    impactScore: 62,
    confidenceScore: 83,
    difficulty: 'Medium',
    estimatedOpportunity: '+14% international share of voice (FR, ES, DE)',
    description: 'In French and Spanish AI search queries, your brand is omitted 68% of the time due to lack of localized hreflang and regional case studies.',
    suggestedFix: 'Publish localized landing pages for European and Latin American markets with localized currency and case studies.',
    affectedQueriesCount: 11,
    status: 'Open'
  }
];

export const initialActionPlan: ActionPlanItem[] = [
  {
    id: 'act-01',
    title: 'Deploy "PulseMetrics vs Amplitude 2026" Architectural Comparison Hub',
    category: 'Content',
    priority: 'High',
    difficulty: 'Medium',
    expectedImpact: '+18% Recommendation Rate across Commercial Queries',
    status: 'Approved',
    owner: 'Content Growth Team',
    aiSuggestion: 'Structure with direct feature comparison table, latency benchmark figures, and ROI calculator embed.',
    createdAt: '2026-10-02',
    reviewedBy: 'Sarah Lin (VP Marketing)',
    history: [
      { timestamp: '2026-10-02 09:15', action: 'Draft generated by LUMENIQ Content Optimizer', user: 'System Agent' },
      { timestamp: '2026-10-03 14:20', action: 'Reviewed and requested latency benchmark addition', user: 'Sarah Lin' },
      { timestamp: '2026-10-04 11:00', action: 'Approved for publication staging', user: 'Sarah Lin' }
    ],
    proposedCodeOrBrief: `TARGET QUERY: "Best Amplitude alternative for B2B product analytics"
RECOMMENDED H1: PulseMetrics vs Amplitude: 2026 Architecture, Query Speeds & Total Cost
KEY ENTITIES TO ANCHOR: SOC 2 Type II, Real-time event streaming, AI anomaly detection, Self-hosted warehouse connector.`
  },
  {
    id: 'act-02',
    title: 'Inject Schema.org SoftwareApplication & FAQPage JSON-LD on Docs & Pricing',
    category: 'Technical AEO',
    priority: 'High',
    difficulty: 'Easy',
    expectedImpact: '+12% Citation Accuracy on Pricing & Compliance Queries',
    status: 'Executing',
    owner: 'Frontend Engineering',
    aiSuggestion: 'Add JSON-LD script tag with pricing tiers ($39/mo Starter, $99/mo Growth) and HIPAA/GDPR certifications.',
    createdAt: '2026-10-03',
    reviewedBy: 'Alex Chen (Tech Lead)',
    history: [
      { timestamp: '2026-10-03 10:30', action: 'Drafted by LUMENIQ Optimization Agent', user: 'System Agent' },
      { timestamp: '2026-10-04 16:00', action: 'Approved by Engineering', user: 'Alex Chen' },
      { timestamp: '2026-10-06 12:45', action: 'Status moved to Executing in CI/CD pipeline', user: 'Alex Chen' }
    ],
    proposedCodeOrBrief: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "PulseMetrics",
  "operatingSystem": "Cloud / Web",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "39",
    "highPrice": "599",
    "priceCurrency": "USD"
  }
}
</script>`
  },
  {
    id: 'act-03',
    title: 'Syndicate Customer Case Studies to High-Authority AI Sources (G2, HackerNews, Medium)',
    category: 'Authority / Citations',
    priority: 'Medium',
    difficulty: 'Hard',
    expectedImpact: '+28 New High-Authority Citations in Perplexity Sonar',
    status: 'Review',
    owner: 'PR & Community Lead',
    aiSuggestion: 'Publish technical deep dive: "How ScaleUp reduced churn by 32% using real-time event analytics" to HackerNews and Substack.',
    createdAt: '2026-10-05',
    history: [
      { timestamp: '2026-10-05 15:30', action: 'Action proposed based on Citation Gap analysis', user: 'Citation Agent' }
    ]
  },
  {
    id: 'act-04',
    title: 'Correct Claude & Copilot Hallucination on Pricing Models',
    category: 'Brand Accuracy',
    priority: 'High',
    difficulty: 'Easy',
    expectedImpact: 'Eliminate false claim that PulseMetrics is quote-only',
    status: 'Draft',
    owner: 'Product Marketing',
    aiSuggestion: 'Publish public pricing table matrix with explicit self-serve signup callouts to retrain AI grounding vectors.',
    createdAt: '2026-10-07',
    history: [
      { timestamp: '2026-10-07 08:00', action: 'Flagged by AI Brand Accuracy Monitor', user: 'Fact Checker Agent' }
    ]
  }
];

export const initialCitations: CitationItem[] = [
  {
    id: 'cite-01',
    domain: 'techcrunch.com',
    url: 'https://techcrunch.com/2026/02/modern-product-analytics-breakthroughs',
    pageTitle: 'The New Generation of Product Analytics: From Vanity Metrics to Actionable Intelligence',
    citationCount: 48,
    competitorCitationsCount: 32,
    authorityScore: 94,
    influencingEngines: ['Perplexity Pro', 'ChatGPT', 'Claude 3.7'],
    contextType: 'Roundup List',
    status: 'Citing You',
    firstSeen: '2026-02-14'
  },
  {
    id: 'cite-02',
    domain: 'g2.com',
    url: 'https://g2.com/categories/product-analytics/grid-2026',
    pageTitle: 'G2 Grid for Product Analytics Software | High Performers 2026',
    citationCount: 114,
    competitorCitationsCount: 182,
    authorityScore: 91,
    influencingEngines: ['Perplexity Pro', 'SearchGPT', 'Microsoft Copilot'],
    contextType: 'Product Comparison',
    status: 'Citing You',
    firstSeen: '2025-11-20'
  },
  {
    id: 'cite-03',
    domain: 'reddit.com/r/saas',
    url: 'https://reddit.com/r/saas/comments/analytics_stack_recommendations',
    pageTitle: 'What product analytics are you guys actually using in 2026?',
    citationCount: 62,
    competitorCitationsCount: 94,
    authorityScore: 88,
    influencingEngines: ['Perplexity Pro', 'ChatGPT', 'Google Gemini'],
    contextType: 'Forum Discussion',
    status: 'Citing You',
    firstSeen: '2026-03-01'
  },
  {
    id: 'cite-04',
    domain: 'capterra.com',
    url: 'https://capterra.com/product-analytics-software/compare',
    pageTitle: 'Top 10 Alternatives to Amplitude and Mixpanel Evaluated',
    citationCount: 14,
    competitorCitationsCount: 88,
    authorityScore: 89,
    influencingEngines: ['SearchGPT', 'Microsoft Copilot'],
    contextType: 'Product Comparison',
    status: 'Opportunity',
    firstSeen: '2026-01-10'
  },
  {
    id: 'cite-05',
    domain: 'venturebeat.com',
    url: 'https://venturebeat.com/ai/realtime-behavioral-data-infrastructure',
    pageTitle: 'How Enterprise Software Engineering Uses AI Behavioral Data',
    citationCount: 0,
    competitorCitationsCount: 42,
    authorityScore: 92,
    influencingEngines: ['Perplexity Pro', 'Claude 3.7'],
    contextType: 'Technical Review',
    status: 'Competitor Only',
    firstSeen: '2026-02-28'
  }
];

export const initialInfluenceNodes: InfluenceNode[] = [
  { id: 'eng-1', label: 'Perplexity Pro', type: 'engine', subtext: 'Sonar Deep Research', volume: '1,420 sessions/mo' },
  { id: 'eng-2', label: 'ChatGPT Search', type: 'engine', subtext: 'GPT-4o Web Grounding', volume: '2,840 sessions/mo' },
  { id: 'eng-3', label: 'Google Gemini', type: 'engine', subtext: 'Search Overviews', volume: '980 sessions/mo' },
  
  { id: 'src-1', label: 'TechCrunch 2026 Guide', type: 'source', subtext: 'Authority: 94', volume: 'Referenced 48x' },
  { id: 'src-2', label: 'G2 Grid Leaderboard', type: 'source', subtext: 'Authority: 91', volume: 'Referenced 114x' },
  { id: 'src-3', label: 'Reddit r/saas Discussion', type: 'source', subtext: 'Authority: 88', volume: 'Referenced 62x' },

  { id: 'cnt-1', label: 'PulseMetrics vs Mixpanel Hub', type: 'content', subtext: 'High-Intent Comparison', volume: '82% Recommendation rate' },
  { id: 'cnt-2', label: 'Real-time Funnel Architecture Doc', type: 'content', subtext: 'Technical Whitepaper', volume: '74% Recommendation rate' },

  { id: 'men-1', label: 'Brand Recommendation #1', type: 'mention', subtext: 'Verified Primary Winner', volume: '412 citations' },
  { id: 'ref-1', label: 'Direct AI Referral Traffic', type: 'referral', subtext: '5,580 monthly visits', volume: '4.8% CTR' },
  { id: 'con-1', label: 'Qualified Enterprise Demo', type: 'conversion', subtext: '342 High-Intent Leads', volume: '$48,200 Influenced Rev' }
];

export const initialInfluenceEdges: InfluenceEdge[] = [
  { from: 'eng-1', to: 'src-1', label: 'Grounds in', conversionRate: '94%' },
  { from: 'eng-1', to: 'src-2', label: 'Extracts data', conversionRate: '88%' },
  { from: 'eng-2', to: 'src-2', label: 'Scrapes reviews', conversionRate: '91%' },
  { from: 'eng-2', to: 'src-3', label: 'User sentiment', conversionRate: '79%' },
  { from: 'eng-3', to: 'src-1', label: 'Web synthesis', conversionRate: '85%' },

  { from: 'src-1', to: 'cnt-1', label: 'Cites page', conversionRate: '72%' },
  { from: 'src-2', to: 'cnt-1', label: 'Direct link', conversionRate: '84%' },
  { from: 'src-3', to: 'cnt-2', label: 'Community link', conversionRate: '68%' },

  { from: 'cnt-1', to: 'men-1', label: 'Synthesizes', conversionRate: '92%' },
  { from: 'cnt-2', to: 'men-1', label: 'Backs claim', conversionRate: '81%' },

  { from: 'men-1', to: 'ref-1', label: 'Generates click', conversionRate: '18.4%' },
  { from: 'ref-1', to: 'con-1', label: 'Converts to lead', conversionRate: '6.1%' }
];

export const initialTrafficByEngine: TrafficByEngine[] = [
  { engine: 'ChatGPT (SearchGPT)', visits: 2840, bounceRate: '34.2%', avgDuration: '3m 48s', leadsGenerated: 168, conversionRate: '5.9%', revenueInfluenced: 22800 },
  { engine: 'Perplexity Pro', visits: 1420, bounceRate: '28.1%', avgDuration: '4m 12s', leadsGenerated: 104, conversionRate: '7.3%', revenueInfluenced: 16200 },
  { engine: 'Google Gemini', visits: 980, bounceRate: '41.0%', avgDuration: '2m 54s', leadsGenerated: 46, conversionRate: '4.7%', revenueInfluenced: 6400 },
  { engine: 'Microsoft Copilot', visits: 340, bounceRate: '39.4%', avgDuration: '3m 05s', leadsGenerated: 24, conversionRate: '7.1%', revenueInfluenced: 2800 }
];

export const initialOpportunities: OpportunityItem[] = [
  {
    id: 'opp-1',
    title: 'Surging Query: "Best product analytics with native AI copilots"',
    category: 'Emerging Query',
    impact: 'High',
    trafficPotential: '+3,800 monthly visits',
    revenuePotential: '+$14,000/mo pipeline',
    difficulty: 'Easy',
    description: 'This query grew 310% over the last 60 days across Perplexity and ChatGPT. Competitors have zero dedicated answer pages.',
    recommendedAction: 'Publish a dedicated feature hub showcasing PulseMetrics AI Copilot with interactive screencast & schema markup.'
  },
  {
    id: 'opp-2',
    title: 'Competitor Vacuum: Mixpanel Pricing Uncertainty on Enterprise Limits',
    category: 'Competitor Gap',
    impact: 'High',
    trafficPotential: '+2,400 monthly visits',
    revenuePotential: '+$18,500/mo pipeline',
    difficulty: 'Medium',
    description: 'AI engines report negative sentiment for competitor over unexpected overage charges. 14 high-intent buyer queries ask for predictable pricing alternatives.',
    recommendedAction: 'Deploy a "Predictable Cost Calculator vs Event-Based Bill Shock" comparison page.'
  },
  {
    id: 'opp-3',
    title: 'Citation Target: 19 High-Influence Industry Domains Missing PulseMetrics',
    category: 'Citation Goldmine',
    impact: 'High',
    trafficPotential: '+5,200 monthly visits',
    revenuePotential: '+$22,000/mo pipeline',
    difficulty: 'Medium',
    description: 'These 19 vetted domains repeatedly influence AI search recommendations across SaaS categories but do not yet list your brand.',
    recommendedAction: 'Initiate digital PR outreach and review profile activation on Capterra, SoftwareAdvice, and VentureBeat.'
  }
];

export const initialContentDecay: ContentDecayItem[] = [
  {
    id: 'decay-1',
    pageUrl: 'https://pulsemetrics.io/blog/b2b-saas-funnel-benchmarks-2024',
    pageTitle: '2024 B2B SaaS Funnel Conversion Benchmarks',
    previousCitations: 54,
    currentCitations: 22,
    decayPercentage: 59,
    reason: 'Outdated date in title & competitor published 2026 verified data.',
    refreshAction: 'Update with 2026 cohort data, rewrite executive summary, and update Schema dateModified tag.'
  },
  {
    id: 'decay-2',
    pageUrl: 'https://pulsemetrics.io/docs/sdk/react-quickstart',
    pageTitle: 'React & Next.js Telemetry Quickstart',
    previousCitations: 38,
    currentCitations: 24,
    decayPercentage: 36,
    reason: 'Perplexity now prefers Next.js 15 Server Action snippet examples.',
    refreshAction: 'Add React Server Components (RSC) and Next.js App Router code blocks.'
  }
];

export const initialTechnicalReadiness: TechnicalReadinessItem[] = [
  {
    id: 'tech-1',
    criterion: 'AI Crawlability & robots.txt Permissions (GPTBot, PerplexityBot, CCBot)',
    score: 95,
    status: 'Passed',
    details: 'robots.txt allows all major AI search discovery crawlers without rate limit blocks.',
    codeSnippet: `User-agent: GPTBot\nAllow: /\nUser-agent: PerplexityBot\nAllow: /`
  },
  {
    id: 'tech-2',
    criterion: 'Schema.org JSON-LD Structured Data (SoftwareApplication, Organization)',
    score: 68,
    status: 'Warning',
    details: 'Organization schema present, but missing SoftwareApplication pricing tiers and AggregateRating.',
    codeSnippet: `<script type="application/ld+json">{"@type":"SoftwareApplication", "name":"PulseMetrics"}</script>`
  },
  {
    id: 'tech-3',
    criterion: 'Entity Clarity & Semantic Headings Hierarchy',
    score: 84,
    status: 'Passed',
    details: 'Clear H1->H2 semantic structure enables LLMs to extract definitive answer chunks.',
  },
  {
    id: 'tech-4',
    criterion: 'FAQ Schema & Direct Answer Formats',
    score: 55,
    status: 'Failed',
    details: 'Only 2 pages include explicit Q&A answer formats. Perplexity relies heavily on direct FAQ snippets.',
  },
  {
    id: 'tech-5',
    criterion: 'Author Credibility & E-E-A-T Signals',
    score: 78,
    status: 'Warning',
    details: 'Blog articles lack author Person schema links to LinkedIn and verified industry credentials.',
  }
];

export const initialFactChecks: FactCheckItem[] = [
  {
    id: 'fact-1',
    topic: 'Pricing Structure',
    engine: 'Claude 3.7 & Copilot',
    hallucinatedText: 'PulseMetrics requires enterprise contact sales for all tiers and has no public pricing.',
    verifiedTruth: 'Offers self-serve Starter ($39/mo) and Growth ($99/mo) with a 14-day free trial.',
    severity: 'High',
    detectedDate: '2 days ago',
    fixStatus: 'Action Required',
    remedy: 'Deploy JSON-LD Offer schema and clear pricing matrix table.'
  },
  {
    id: 'fact-2',
    topic: 'Data Sovereignty & Compliance',
    engine: 'Microsoft Copilot',
    hallucinatedText: 'Does not support European data residency (GDPR compliance unverified).',
    verifiedTruth: 'Full EU Frankfurt data residency and HIPAA BAA options available.',
    severity: 'Medium',
    detectedDate: '5 days ago',
    fixStatus: 'Remediation Deployed',
    remedy: 'Published dedicated EU Trust Center and verified in Sitemap.'
  }
];

export const initialCompetitorMoves: CompetitorMoveAlert[] = [
  {
    id: 'move-1',
    date: 'Yesterday at 16:40',
    competitor: 'Datadog Product Analytics',
    change: 'Gained +14% AI visibility this week on enterprise DevOps queries.',
    reason: 'Published 8 targeted comparison and Kubernetes event tracing solution pages.',
    recommendedResponse: 'Publish 4 high-priority comparison pages contrasting real-time telemetry speeds with heavy APM agents.',
    urgency: 'Immediate'
  },
  {
    id: 'move-2',
    date: '3 days ago',
    competitor: 'Mixpanel',
    change: 'Lost #1 position on "Best Amplitude alternatives" to PulseMetrics.',
    reason: 'PulseMetrics received 12 new high-authority citations on G2 and TechCrunch.',
    recommendedResponse: 'Reinforce win by syndicating user testimonial quotes to Reddit r/saas and ProductHunt discussions.',
    urgency: 'FYI'
  }
];

export const initialPlans: PlanConfig[] = [
  {
    id: 'free',
    name: 'Free Scout',
    priceMonthly: 0,
    priceAnnual: 0,
    description: 'Basic AI visibility scan for early founders and personal brands.',
    features: [
      '1 Monitored Website',
      '5 AI Queries Monitored',
      'Basic AI Visibility Score',
      '1 Competitor Tracked',
      'Weekly Scan Frequency',
      'Community Support'
    ],
    limits: {
      websites: 1,
      aiQueriesPerMonth: 50,
      competitors: 1,
      seats: 1,
      reports: 'Standard Web'
    }
  },
  {
    id: 'starter',
    name: 'Starter',
    priceMonthly: 39,
    priceAnnual: 31,
    description: 'Essential AI search monitoring and query discovery for growing startups.',
    features: [
      '1 Monitored Website',
      '50 Monitored AI Queries',
      'Full 6-Dimension Score Breakdown',
      '3 Competitors Tracked',
      'Daily AI Scan Frequency',
      'Basic Visibility Gap Engine',
      'Email Alerts'
    ],
    limits: {
      websites: 1,
      aiQueriesPerMonth: 500,
      competitors: 3,
      seats: 2,
      reports: 'PDF & Web'
    }
  },
  {
    id: 'growth',
    name: 'Growth',
    priceMonthly: 99,
    priceAnnual: 79,
    popular: true,
    description: 'Complete AEO intelligence, Query Lab, citation intelligence, and AI Copilot.',
    features: [
      '3 Monitored Websites',
      '250 Monitored AI Queries',
      'Interactive Query Lab Simulator',
      'Source Influence Graph',
      'Autonomous Optimization Agent (Proposals)',
      'AI Brand Accuracy & Fact Checker',
      'AI Referral & Revenue Attribution',
      '10 Competitors Tracked',
      'LUMENIQ Growth Copilot Access'
    ],
    limits: {
      websites: 3,
      aiQueriesPerMonth: 2500,
      competitors: 10,
      seats: 5,
      reports: 'White-label PDF & Export'
    }
  },
  {
    id: 'pro',
    name: 'Pro',
    priceMonthly: 249,
    priceAnnual: 199,
    description: 'Advanced AEO execution for scaling marketing teams and high-traffic businesses.',
    features: [
      '10 Monitored Websites',
      '1,000 Monitored AI Queries',
      'All Growth Features included',
      'Autonomous Execution Engine (with Human Approval)',
      'Multi-language AI Monitoring (EN, FR, ES, PT, DE)',
      'Local AI Visibility Tracking',
      'Competitor Move Real-Time Alerts (Slack/Teams)',
      'CMS & CRM Integrations',
      'Priority Hourly Rescanning'
    ],
    limits: {
      websites: 10,
      aiQueriesPerMonth: 10000,
      competitors: 25,
      seats: 15,
      reports: 'Automated Client Reports'
    }
  },
  {
    id: 'agency',
    name: 'Agency Elite',
    priceMonthly: 599,
    priceAnnual: 479,
    description: 'Multi-client workspace hub, branded client portals, and batch scans.',
    features: [
      '35 Monitored Websites',
      '3,500 Monitored AI Queries',
      'Dedicated Multi-Client Agency Dashboard',
      'Custom White-Label Reports & Branding',
      'Client Permission Matrix',
      'Dedicated Strategy Consultant',
      'REST API Access & Webhooks'
    ],
    limits: {
      websites: 35,
      aiQueriesPerMonth: 35000,
      competitors: 75,
      seats: 50,
      reports: 'Custom Whitelabel'
    }
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    priceMonthly: 1299,
    priceAnnual: 999,
    description: 'Custom governance, unlimited scale, dedicated vector nodes, and SLA.',
    features: [
      'Unlimited Websites & Workspaces',
      'Custom AI Query Volume',
      'Dedicated AI Model Reverse-Engineers',
      'SSO (SAML, Okta, Azure AD)',
      'SOC-2 Compliant Tenant Isolation',
      'Custom Data Retention & Audit Logs',
      '99.99% Uptime SLA & 24/7 Phone Support'
    ],
    limits: {
      websites: 999,
      aiQueriesPerMonth: 250000,
      competitors: 250,
      seats: 999,
      reports: 'Custom BI Pipeline'
    }
  }
];

export const initialAgencyClients = [
  { id: 'c-1', name: 'PulseMetrics Global', score: 74, scoreChange: '+8', opportunitiesCount: 14, alertCount: 1, revenueInfluenced: '$48,200', status: 'Healthy' },
  { id: 'c-2', name: 'NovaHealth Telemedicine', score: 81, scoreChange: '+12', opportunitiesCount: 8, alertCount: 0, revenueInfluenced: '$92,400', status: 'Optimal' },
  { id: 'c-3', name: 'Apex FinTech Solutions', score: 56, scoreChange: '-3', opportunitiesCount: 22, alertCount: 4, revenueInfluenced: '$31,000', status: 'Attention Needed' },
  { id: 'c-4', name: 'Solara Clean Energy', score: 67, scoreChange: '+5', opportunitiesCount: 11, alertCount: 2, revenueInfluenced: '$18,500', status: 'Growing' }
];
