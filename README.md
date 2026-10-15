# LUMENIQ — AI Search Visibility & AEO/GEO Optimization Platform

> **Enterprise-grade AI answer engine optimization.** Monitor, diagnose, and improve how ChatGPT, Perplexity, Gemini, Claude & Copilot discover, cite, and recommend your brand.

---

## What is LUMENIQ?

LUMENIQ is a full-stack SaaS platform for **Answer Engine Optimization (AEO)** and **Generative Engine Optimization (GEO)**. As AI-powered search displaces traditional search engines, LUMENIQ gives brands the intelligence to:

- **Diagnose** why AI engines recommend competitors over them
- **Monitor** brand citations, recommendation rates, and share of voice across 5 AI engines
- **Optimize** content specifically for LLM discoverability
- **Execute** a prioritized action plan with AI-generated implementation specs
- **Prove ROI** with revenue attribution from AI referral traffic

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite 8 |
| Styling | Tailwind CSS v4 + Custom Design System |
| Backend | Express.js + TypeScript (tsx) |
| AI Engine | Google Gemini 2.0 Flash (@google/genai) |
| Icons | Lucide React |
| Deploy | Cloud Run / Railway / Render / Docker |

---

## Features

- 🔍 **Query Lab** — Simulate any buyer query across 5 AI engines simultaneously
- 📊 **AI Visibility Score** — 6-dimension composite brand index (0-100)
- 🚨 **Visibility Gap Engine** — 20-vector diagnostic identifying exactly why AI skips your brand
- 🏆 **Competitor Intelligence** — Share of Voice tracking + competitor move alerts
- ✍️ **Content Optimizer** — AEO content briefs with JSON-LD schema snippets
- 🤖 **Growth Copilot** — On-demand AI strategist powered by Gemini 2.0 Flash
- 📋 **Action Center** — Workflow: Draft → Review → Approved → Executing → Published
- 🏥 **Health Report** — Exportable executive brand health report
- 🛡️ **Brand Accuracy** — AI hallucination detection and correction
- 📈 **Traffic & Revenue** — AI referral attribution by engine
- 🏢 **Agency Mode** — Multi-workspace client management

---

## Quick Start

```bash
# 1. Install
npm install

# 2. Add API key
cp .env.example .env
# Edit .env → GEMINI_API_KEY=your_key_from_aistudio.google.com

# 3. Run
npm run dev
# → http://localhost:3000
```

> The app works fully in demo mode without an API key using rich fallback data.

---

## Production

```bash
npm run build       # Vite bundle → /dist (232KB app, gzip: ~130KB total)
npm run type-check  # TypeScript validation — 0 errors
```

## Docker

```bash
docker build -t lumeniq .
docker run -p 3000:3000 -e GEMINI_API_KEY=your_key lumeniq
```

## Cloud Run

```bash
gcloud run deploy lumeniq \
  --source . --platform managed \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=your_key \
  --port 3000 --region us-central1
```

---

## API Reference

| Endpoint | Description | Rate Limit |
|----------|-------------|-----------|
| `GET /api/health` | Health probe | - |
| `POST /api/scan` | Full 5-engine brand scan | 60/min |
| `POST /api/query-lab` | Simulate buyer query | 60/min |
| `POST /api/copilot` | Copilot chat | 60/min |
| `POST /api/optimize-content` | AEO content brief | 60/min |
| `POST /api/fact-check` | Hallucination detection | 60/min |

---

## White-labelling

1. `src/data/mockInitialData.ts` — update brand name, website, competitors
2. `src/components/Header.tsx` — replace LUMENIQ with client name
3. `src/index.css` — update `--color-brand-*` CSS variables
4. `index.html` — update title, meta description

---

## License

MIT
