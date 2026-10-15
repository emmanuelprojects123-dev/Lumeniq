import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// The AI Studio dev server must always run on port 3000. Do not bind to 8080 (used by Nginx proxy).
const port = 3000;
const isProd = process.env.NODE_ENV === 'production';

// ─── Security & Performance Headers ─────────────────────────────────────────
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// ─── Simple in-memory rate limiter (per IP, 60 API calls/minute) ─────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 60;
const RATE_WINDOW_MS = 60_000;

function apiRateLimit(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return next();
  }
  if (record.count >= RATE_LIMIT) {
    res.status(429).json({ success: false, error: 'Rate limit exceeded. Please wait 60 seconds.' });
    return;
  }
  record.count++;
  next();
}

app.use(express.json({ limit: '10mb' }));

// Server-side Google GenAI initialization with User-Agent as required by skill
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Helper for Gemini generation with fallback
async function generateAIAnalysis(prompt: string, fallbackData: any): Promise<any> {
  if (!aiClient || !process.env.GEMINI_API_KEY) {
    return fallbackData;
  }

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    if (response && response.text) {
      try {
        return JSON.parse(response.text.trim());
      } catch (parseErr) {
        console.warn('Could not parse Gemini JSON response, using fallback:', parseErr);
        return fallbackData;
      }
    }
  } catch (apiErr) {
    console.error('Gemini API call failed, using high-fidelity fallback:', apiErr);
  }
  return fallbackData;
}

// ─── Health check endpoint (load balancer / Cloud Run probes) ───────────────
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', version: '2.0.0', ts: new Date().toISOString() });
});

// 1. SCAN API: Website Onboarding & Full AI Visibility Audit
app.post('/api/scan', apiRateLimit, async (req: Request, res: Response) => {
  const { url, brandName = '', industry = 'B2B SaaS', competitors = [], markets = ['United States', 'Global'] } = req.body;
  const targetBrand = brandName || (url ? url.replace(/^https?:\/\/(www\.)?/, '').split('.')[0] : 'Acme SaaS');

  const defaultScan = {
    brand: targetBrand,
    website: url || `https://${targetBrand.toLowerCase()}.com`,
    industry,
    overallScore: 68,
    scoreDimensions: {
      mentionVisibility: 76,
      recommendationStrength: 62,
      citationStrength: 71,
      competitiveShare: 58,
      queryCoverage: 74,
      aiReferralQuality: 65,
      accuracyScore: 88,
    },
    shareOfVoice: [
      { name: targetBrand, percentage: 31, trend: '+4%', isTarget: true },
      { name: competitors[0] || 'MarketLeader Inc', percentage: 38, trend: '-2%', isTarget: false },
      { name: competitors[1] || 'CloudNext AI', percentage: 19, trend: '+6%', isTarget: false },
      { name: 'Other Alternatives', percentage: 12, trend: '-8%', isTarget: false },
    ],
    topQueries: [
      {
        id: 'q1',
        query: `What is the best ${industry} tool for high-growth teams?`,
        intent: 'Commercial',
        engineVisibility: { chatgpt: 'Mentioned (#2)', perplexity: 'Recommended (#1)', gemini: 'Mentioned (#3)', claude: 'Omitted', copilot: 'Mentioned (#2)' },
        ourRank: 2,
        topWinner: competitors[0] || 'MarketLeader Inc',
        brandMentioned: true,
        recommended: false,
      },
      {
        id: 'q2',
        query: `${targetBrand} vs ${competitors[0] || 'MarketLeader Inc'} comparison 2026`,
        intent: 'Comparison',
        engineVisibility: { chatgpt: 'Recommended (#1)', perplexity: 'Recommended (#1)', gemini: 'Mentioned (#2)', claude: 'Mentioned (#1)', copilot: 'Recommended (#1)' },
        ourRank: 1,
        topWinner: targetBrand,
        brandMentioned: true,
        recommended: true,
      },
      {
        id: 'q3',
        query: `Top enterprise alternatives to ${competitors[0] || 'MarketLeader Inc'}`,
        intent: 'Alternatives',
        engineVisibility: { chatgpt: 'Mentioned (#4)', perplexity: 'Mentioned (#3)', gemini: 'Omitted', claude: 'Mentioned (#2)', copilot: 'Mentioned (#3)' },
        ourRank: 3,
        topWinner: competitors[1] || 'CloudNext AI',
        brandMentioned: true,
        recommended: false,
      },
      {
        id: 'q4',
        query: `How to automate workflows in ${industry.toLowerCase()} securely`,
        intent: 'Informational',
        engineVisibility: { chatgpt: 'Omitted', perplexity: 'Cited Source', gemini: 'Mentioned (#2)', claude: 'Omitted', copilot: 'Omitted' },
        ourRank: 4,
        topWinner: competitors[0] || 'MarketLeader Inc',
        brandMentioned: false,
        recommended: false,
      },
    ],
    visibilityGaps: [
      {
        id: 'gap-1',
        category: 'Missing comparison content',
        severity: 'High',
        impact: 89,
        confidence: 94,
        difficulty: 'Medium',
        estimatedOpportunity: '+16% AI recommendation rate',
        description: `Competitors are cited 3.8x more frequently because they host detailed side-by-side comparison tables against ${targetBrand} and industry incumbents.`,
        suggestedFix: `Publish direct "${targetBrand} vs ${competitors[0] || 'Competitor'}" architectural comparison matrix with verified benchmark metrics.`,
      },
      {
        id: 'gap-2',
        category: 'Weak third-party authority citations',
        severity: 'High',
        impact: 82,
        confidence: 91,
        difficulty: 'Hard',
        estimatedOpportunity: '+22% citation count in Perplexity & SearchGPT',
        description: 'Perplexity and ChatGPT rely heavily on G2, Gartner Peer Insights, and specialized review roundups where your brand has fewer than 15 indexed mentions.',
        suggestedFix: 'Run targeted digital PR and customer review syndication on the top 8 influencer industry domains.',
      },
      {
        id: 'gap-3',
        category: 'Outdated feature & pricing schema',
        severity: 'Medium',
        impact: 68,
        confidence: 88,
        difficulty: 'Easy',
        estimatedOpportunity: '+11% accuracy on commercial intent queries',
        description: 'Gemini and Claude hallucinate that you do not offer enterprise SSO and multi-tenant security due to lack of JSON-LD Organization & SoftwareApplication schema.',
        suggestedFix: 'Inject rich JSON-LD SoftwareApplication schema markup highlighting ISO-27001, SSO, and transparent tier specs.',
      },
    ],
    actionPlan: [
      {
        id: 'act-1',
        title: `Publish "${targetBrand} vs ${competitors[0] || 'MarketLeader'}" Verified Comparison Hub`,
        category: 'Content',
        priority: 'High',
        difficulty: 'Medium',
        expectedImpact: '+18% Recommendation Rate',
        status: 'Draft',
        owner: 'Content Team',
        aiSuggestion: 'Include feature checklist, pricing parity table, and direct customer quote embeds.',
      },
      {
        id: 'act-2',
        title: 'Inject Schema.org SoftwareApplication & FAQPage JSON-LD',
        category: 'Technical AEO',
        priority: 'High',
        difficulty: 'Easy',
        expectedImpact: '+12% Citation Accuracy',
        status: 'Review',
        owner: 'Engineering',
        aiSuggestion: 'Embed verified JSON-LD on pricing page and technical docs to feed LLM grounding crawlers.',
      },
      {
        id: 'act-3',
        title: 'Syndicate Expert Case Studies to Top AI Citation Sources',
        category: 'Authority / Citations',
        priority: 'Medium',
        difficulty: 'Medium',
        expectedImpact: '+14% Perplexity Referral Traffic',
        status: 'Approved',
        owner: 'Marketing',
        aiSuggestion: 'Distribute technical whitepaper to TechCrunch, VentureBeat, and Substack tech authorities.',
      },
    ],
    brandAccuracy: {
      score: 87,
      incorrectClaims: [
        {
          engine: 'Claude 3.7',
          claim: 'Pricing is quote-only and requires enterprise sales inquiry.',
          reality: 'Has self-serve Starter tier starting at transparent monthly pricing.',
          severity: 'Moderate',
        },
        {
          engine: 'ChatGPT (GPT-4o)',
          claim: 'Lacks native API webhooks for third-party orchestration.',
          reality: 'Full REST API & Webhook suite documented publicly.',
          severity: 'High',
        },
      ],
    },
  };

  const prompt = `You are LUMENIQ, an enterprise AI Search Visibility and Answer Engine Optimization (AEO/GEO) intelligence engine.
Analyze the brand "${targetBrand}" with website "${url}", industry "${industry}", competitors: ${JSON.stringify(competitors)}, and target markets: ${JSON.stringify(markets)}.
Return a realistic, deep JSON analysis of how major AI search engines (ChatGPT, Perplexity, Gemini, Claude, Microsoft Copilot) perceive, cite, recommend, and index this business.

Format as JSON with keys matching this exact structure:
{
  "brand": "${targetBrand}",
  "website": "${url}",
  "industry": "${industry}",
  "overallScore": number (0-100),
  "scoreDimensions": {
    "mentionVisibility": number (0-100),
    "recommendationStrength": number (0-100),
    "citationStrength": number (0-100),
    "competitiveShare": number (0-100),
    "queryCoverage": number (0-100),
    "aiReferralQuality": number (0-100),
    "accuracyScore": number (0-100)
  },
  "shareOfVoice": [
    {"name": string, "percentage": number, "trend": string, "isTarget": boolean}
  ],
  "topQueries": [
    {
      "id": string,
      "query": string,
      "intent": "Informational" | "Commercial" | "Comparison" | "Alternatives" | "Transactional",
      "engineVisibility": {"chatgpt": string, "perplexity": string, "gemini": string, "claude": string, "copilot": string},
      "ourRank": number,
      "topWinner": string,
      "brandMentioned": boolean,
      "recommended": boolean
    }
  ],
  "visibilityGaps": [
    {
      "id": string,
      "category": string,
      "severity": "High" | "Medium" | "Low",
      "impact": number,
      "confidence": number,
      "difficulty": "Easy" | "Medium" | "Hard",
      "estimatedOpportunity": string,
      "description": string,
      "suggestedFix": string
    }
  ],
  "actionPlan": [
    {
      "id": string,
      "title": string,
      "category": string,
      "priority": "High" | "Medium" | "Low",
      "difficulty": "Easy" | "Medium" | "Hard",
      "expectedImpact": string,
      "status": "Draft" | "Review" | "Approved" | "Executing" | "Complete",
      "owner": string,
      "aiSuggestion": string
    }
  ],
  "brandAccuracy": {
    "score": number,
    "incorrectClaims": [
      {
        "engine": string,
        "claim": string,
        "reality": string,
        "severity": "Low" | "Moderate" | "High"
      }
    ]
  }
}`;

  const analysis = await generateAIAnalysis(prompt, defaultScan);
  res.json({ success: true, data: analysis });
});

// 2. QUERY LAB SIMULATOR API: "Why did AI recommend Competitor A instead of you?"
app.post('/api/query-lab', apiRateLimit, async (req: Request, res: Response) => {
  const { promptQuery, brandName = 'LUMENIQ User', competitors = ['MarketLeader Inc', 'SaaSPro', 'CloudPulse'] } = req.body;

  const defaultResult = {
    query: promptQuery || 'What is the best B2B analytics platform for modern marketing teams?',
    analyzedAt: new Date().toISOString(),
    primaryWinner: competitors[0] || 'MarketLeader Inc',
    ourBrandRank: 3,
    ourBrandMentioned: true,
    ourBrandRecommended: false,
    sentiment: {
      positive: 74,
      neutral: 21,
      negative: 5,
    },
    deepDiagnosis: {
      headline: `Why ${competitors[0] || 'MarketLeader Inc'} won over ${brandName}`,
      reasons: [
        `Competitor has 14 high-authority third-party citations on TechCrunch and G2 published within the last 90 days.`,
        `Their documentation features clear comparative matrices and schema-marked pricing.`,
        `${brandName} is acknowledged as a high-potential option, but lacked third-party corroboration for enterprise SLA claims.`,
      ],
      missingSignals: [
        'Missing JSON-LD Review & AggregateRating markup',
        'No direct comparison page addressing high-volume buyer queries',
        'Low backlink density from Perplexity-scraped domain whitelist',
      ],
      remedyRecommendation: `Create a dedicated answer hub for "${promptQuery}" including customer ROI case studies and schema markup.`,
    },
    engineBreakdown: [
      {
        engine: 'Perplexity Pro (Sonar Deep)',
        status: 'Mentioned (#2)',
        citations: ['techcrunch.com/2026/saas-tools', 'g2.com/categories/analytics', 'venturebeat.com/ai-software'],
        snippet: `Top recommendations include ${competitors[0] || 'MarketLeader Inc'} due to broad enterprise compliance, followed closely by ${brandName} for innovative AI discovery features.`,
      },
      {
        engine: 'ChatGPT (SearchGPT/GPT-4o)',
        status: 'Winner (#1 is ' + (competitors[0] || 'Competitor') + ')',
        citations: ['forbes.com/advisor/business', 'trustradius.com/reviews'],
        snippet: `When evaluating solutions, ${competitors[0] || 'MarketLeader Inc'} leads for larger teams. ${brandName} is also frequently cited as a rising contender.`,
      },
      {
        engine: 'Google Gemini 2.5 / 3.0',
        status: 'Omitted from top 3',
        citations: ['google.com/search-overview', 'producthunt.com/posts'],
        snippet: `Recommended choices highlighted ${competitors[0] || 'MarketLeader Inc'} and ${competitors[1] || 'SaaSPro'}.`,
      },
      {
        engine: 'Claude 3.7 Sonnet',
        status: 'Mentioned with praise',
        citations: ['github.com/topics/analytics', 'reddit.com/r/saas'],
        snippet: `${brandName} offers superior UX and agile optimization, though ${competitors[0] || 'MarketLeader Inc'} has higher historical brand recognition.`,
      },
    ],
  };

  const prompt = `You are LUMENIQ Query Lab, an AI Search Simulator and citation reverse-engineering tool.
Analyze this user query: "${promptQuery}".
Target brand: "${brandName}".
Competitors: ${JSON.stringify(competitors)}.

Simulate realistic AI search results across Perplexity, ChatGPT (SearchGPT), Google Gemini, and Claude.
Explain why a competitor was recommended instead of the target brand, identify missing authority signals, and provide an actionable remedy.
Return JSON matching:
{
  "query": "${promptQuery}",
  "analyzedAt": "${new Date().toISOString()}",
  "primaryWinner": string,
  "ourBrandRank": number,
  "ourBrandMentioned": boolean,
  "ourBrandRecommended": boolean,
  "sentiment": {"positive": number, "neutral": number, "negative": number},
  "deepDiagnosis": {
    "headline": string,
    "reasons": string[],
    "missingSignals": string[],
    "remedyRecommendation": string
  },
  "engineBreakdown": [
    {
      "engine": string,
      "status": string,
      "citations": string[],
      "snippet": string
    }
  ]
}`;

  const result = await generateAIAnalysis(prompt, defaultResult);
  res.json({ success: true, data: result });
});

// 3. LUMENIQ COPILOT API: Context-Aware Strategic AI Growth Assistant
app.post('/api/copilot', apiRateLimit, async (req: Request, res: Response) => {
  const { message, context = {} } = req.body;
  const brandName = context.brand || 'Your Brand';

  const defaultReply = {
    reply: `Based on your LUMENIQ AI Visibility score of ${context.score || 72}/100 and recent query monitoring:

1. **Main Visibility Bottleneck**: You are losing approximately 28% of commercial-intent queries to your competitor because they hold strong citations on top technical roundups (G2, Gartner, TechCrunch).
2. **Immediate Action**: I recommend publishing a dedicated comparison hub targeting the query *"Best alternatives to your competitor in 2026"*. This single fix addresses your largest identified visibility gap.
3. **Structured Data**: Adding JSON-LD SoftwareApplication schema to your pricing and documentation pages will eliminate the hallucination where AI engines state your pricing is quote-only.

Would you like me to generate the full comparison content brief or draft the JSON-LD schema for your engineering team right now?`,
    suggestedFollowUps: [
      'Generate comparison page content brief',
      'Create JSON-LD schema markup for pricing',
      'Show our top 5 citation gaps',
      'Why did ChatGPT drop our brand rank this week?',
    ],
  };

  const prompt = `You are LUMENIQ Copilot, the AI search visibility strategist for "${brandName}".
Account Context:
- Overall AI Visibility Score: ${context.score || 72}/100
- Competitors: ${JSON.stringify(context.competitors || ['MarketLeader', 'SaaSPro'])}
- Active Gaps: ${JSON.stringify(context.gaps || ['Missing comparison content', 'Weak 3rd-party authority'])}
- User Question: "${message}"

Provide a sharp, data-backed, executive-level response. Be specific, reference the brand's metrics, explain WHY AI engines recommend or skip the brand, and propose exact next steps.
Return JSON:
{
  "reply": string (markdown supported),
  "suggestedFollowUps": string[]
}`;

  const replyData = await generateAIAnalysis(prompt, defaultReply);
  res.json({ success: true, data: replyData });
});

// 4. AUTONOMOUS CONTENT OPTIMIZER API: Generates AEO / GEO Content Briefs
app.post('/api/optimize-content', apiRateLimit, async (req: Request, res: Response) => {
  const { targetQuery, brandName = 'LUMENIQ Brand', contentType = 'Comparison Page' } = req.body;

  const defaultBrief = {
    targetQuery: targetQuery || 'Best CRM software for high-growth tech teams',
    contentType,
    searchIntent: 'High Commercial Intent',
    aiVisibilityOpportunity: '+24% recommendation probability in Perplexity & ChatGPT',
    suggestedTitle: `The Ultimate 2026 Guide: Best Software for High-Growth Tech Teams Compared`,
    keyEntitiesToInclude: ['Multi-tenant security', 'REST Webhooks', 'Automated attribution', 'SOC 2 Type II', 'Data residency'],
    recommendedStructure: [
      { heading: 'Executive Summary for Decision Makers', purpose: 'Immediate direct answer for LLM retrieval snippet' },
      { heading: 'Side-by-Side Architectural Feature Matrix', purpose: 'Structured comparison tables favored by Perplexity & SearchGPT' },
      { heading: 'Transparent Pricing Breakdown & Total Cost of Ownership', purpose: 'Eliminates AI hallucinations on pricing' },
      { heading: 'Frequently Asked Questions (FAQ)', purpose: 'Direct Q&A format indexed by Gemini and Claude' },
    ],
    citationSourcesToTarget: [
      'g2.com/categories',
      'trustradius.com/buyer-guides',
      'producthunt.com/discussions',
      'github.com/collections',
    ],
    jsonLdSchemaSnippet: `{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "${brandName}",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web, Cloud",
  "offers": {
    "@type": "Offer",
    "price": "39.00",
    "priceCurrency": "USD"
  }
}`,
  };

  const prompt = `You are LUMENIQ Content Optimizer.
Generate an Answer Engine Optimization (AEO/GEO) content brief for:
Target Query: "${targetQuery}"
Brand: "${brandName}"
Content Type: "${contentType}"

Return JSON matching:
{
  "targetQuery": "${targetQuery}",
  "contentType": "${contentType}",
  "searchIntent": string,
  "aiVisibilityOpportunity": string,
  "suggestedTitle": string,
  "keyEntitiesToInclude": string[],
  "recommendedStructure": [
    {"heading": string, "purpose": string}
  ],
  "citationSourcesToTarget": string[],
  "jsonLdSchemaSnippet": string
}`;

  const brief = await generateAIAnalysis(prompt, defaultBrief);
  res.json({ success: true, data: brief });
});

// 5. BRAND FACT CHECKER API: Detects Hallucinations & AI Accuracy Issues
app.post('/api/fact-check', apiRateLimit, async (req: Request, res: Response) => {
  const { brandName = 'Acme Corp', website = 'https://acme.com' } = req.body;

  const defaultFactCheck = {
    brand: brandName,
    overallAccuracy: 86,
    testedDimensions: [
      { dimension: 'Pricing & Tiers', accuracy: 78, status: 'Hallucination Detected', engine: 'ChatGPT / Claude' },
      { dimension: 'Features & APIs', accuracy: 94, status: 'Accurate', engine: 'All Engines' },
      { dimension: 'Founders & HQ', accuracy: 100, status: 'Verified', engine: 'Perplexity / Gemini' },
      { dimension: 'Security & Compliance', accuracy: 72, status: 'Outdated Info', engine: 'Copilot / Gemini' },
    ],
    hallucinations: [
      {
        id: 'hal-1',
        engine: 'Claude 3.7',
        topic: 'Pricing',
        hallucinatedText: `${brandName} requires custom quote enterprise pricing and does not have self-service onboarding.`,
        verifiedTruth: `${brandName} offers transparent self-service plans starting at $39/mo with 14-day free trial.`,
        severity: 'High',
        fixAction: 'Deploy JSON-LD Offer schema and publish clear pricing comparison table.',
      },
      {
        id: 'hal-2',
        engine: 'Microsoft Copilot',
        topic: 'Compliance',
        hallucinatedText: 'Does not support HIPAA or EU GDPR data residency controls.',
        verifiedTruth: 'Full EU data residency and HIPAA BAA options available in settings.',
        severity: 'Medium',
        fixAction: 'Add Trust Center landing page with explicitly indexed security terms.',
      },
    ],
  };

  const prompt = `You are LUMENIQ Brand Fact Checker.
Analyze potential AI hallucinations regarding brand "${brandName}" (${website}) across pricing, security, features, and company information.
Return JSON matching:
{
  "brand": "${brandName}",
  "overallAccuracy": number,
  "testedDimensions": [
    {"dimension": string, "accuracy": number, "status": string, "engine": string}
  ],
  "hallucinations": [
    {
      "id": string,
      "engine": string,
      "topic": string,
      "hallucinatedText": string,
      "verifiedTruth": string,
      "severity": "Low" | "Medium" | "High",
      "fixAction": string
    }
  ]
}`;

  const factData = await generateAIAnalysis(prompt, defaultFactCheck);
  res.json({ success: true, data: factData });
});

// Setup Vite middleware in development or static serving in production
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`LUMENIQ Enterprise Platform server active on port ${port} (${isProd ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting LUMENIQ server:', err);
});
