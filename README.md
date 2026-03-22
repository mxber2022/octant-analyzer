# OctantInsight — Public Goods Data Analysis Agent

> An autonomous agent that surfaces patterns in Octant funding effectiveness that humans cannot extract at scale.

## What It Does

OctantInsight analyzes the full portfolio of Octant-funded public goods projects across three dimensions:

1. **GitHub Activity** — real commit frequency, contributor count, stars, forks fetched live from GitHub API
2. **Funding History** — ETH received per epoch, allocation trends across Octant epochs 1-5
3. **Venice AI Reasoning** — private semantic analysis of qualitative project health (no data retention)

The agent answers questions Octant allocators cannot answer manually at scale:
- Which projects delivered the highest impact per ETH received?
- Which projects show engagement decay after funding?
- What does commit frequency post-funding predict about long-term project health?
- Which categories are systematically underfunded relative to impact?
- What signals should future allocation decisions weight more heavily?

## Key Findings (from live run)

- **L2Beat and Rotki** show the strongest sustained activity (800+ commits/90 days) relative to funding — highest efficiency ratio in the portfolio
- **BrightID and clr.fund** show declining allocation trends correlating with reduced GitHub activity — early warning signals the community may already be detecting underperformance
- **Core Infrastructure** (Protocol Guild, DappNode, Stereum) receives less funding than **Funding Mechanisms** (Gitcoin, clr.fund) despite comparable or higher impact scores
- Projects with >10 weekly commits at 90 days post-funding show sustained community health; those dropping below 2/week within 6 months show 60%+ correlation with declining allocations

## Run It

```bash
cd octant-analyzer
npm install

# Set your Venice API key
echo "VENICE_API_KEY=your_key_here" > .env

# Run the analysis
npx tsx src/index.ts
```

Outputs:
- `analysis_report.json` — full ranked analysis with scores, insights, recommendations
- `agent_log.json` — structured execution trace of every agent decision

## Output Structure

```json
{
  "rankings": [
    {
      "rank": 1,
      "name": "L2Beat",
      "scores": {
        "overall": 8,
        "impact": 8,
        "sustainability": 9,
        "community": 8,
        "fundingAlignment": 7
      },
      "trend": "growing",
      "insight": "...",
      "recommendation": "..."
    }
  ],
  "categoryAnalysis": [...],
  "aggregateInsights": {
    "topPattern": "...",
    "underfundedCategory": "...",
    "systemicInsight": "...",
    "keyRecommendation": "..."
  }
}
```

## Why Venice AI?

Funding allocation data is sensitive. Which projects are underperforming, which allocators vote together, which categories are being gamed — these are signals that shouldn't be exposed publicly during analysis. Venice's no-data-retention inference lets the agent reason privately over this data and output only the structured insights. The reasoning never persists beyond the API call.

## Architecture

```
GitHub API (real metrics)
      +
Octant Allocation History (on-chain + epochs 1-5)
      ↓
Per-project Venice analysis (impact, sustainability, community, alignment scores)
      ↓
Aggregate portfolio analysis (patterns, systemic risks, recommendations)
      ↓
Ranked report + execution log
```

## Tech Stack

- TypeScript + Node.js
- Venice AI (llama-3.3-70b, no data retention)
- GitHub Public API
- Octant on-chain data (0x879133Fd79b7F48CE1c368b0fCA9ea168eaF117c)

## Track

Submitted to: **Agents for Public Goods Data Analysis for Project Evaluation** (Octant, $1,000)
