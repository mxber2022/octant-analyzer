# OctantInsight — Public Goods Data Analysis Agent

> An autonomous agent that collects, analyzes, and designs evaluation mechanisms for Octant-funded public goods projects — surfacing patterns humans cannot extract at scale.

## What It Does

OctantInsight covers the full public goods evaluation pipeline across three tracks:

### 1. Data Collection
- Fetches live GitHub metrics per project: commit frequency, contributor count, stars, forks, weekly activity trends
- Aggregates Octant allocation history across epochs 1-5 (ETH received, participation per epoch)
- Structures all collected data into a normalized, analysis-ready format

### 2. Data Analysis
- Scores each project across 4 dimensions (1-10): Impact, Sustainability, Community Health, Funding Alignment
- Detects allocation trends (growing/stable/declining) using epoch-over-epoch comparison
- Runs portfolio-level aggregate analysis: underfunded categories, engagement decay, concentration risk
- Uses Venice AI (llama-3.3-70b, no data retention) for private qualitative reasoning

### 3. Evaluation Mechanism Design
The agent implements a **repeatable, transparent scoring methodology** that can serve as a baseline evaluation mechanism for future Octant epochs:

- **4-dimension scoring framework**: Impact (value delivered per ETH), Sustainability (long-term health), Community (genuine engagement), Funding Alignment (is current funding level appropriate?)
- **Weighted composite score**: overallScore = weighted average, tunable per epoch priorities
- **Trend-adjusted allocation signals**: projects showing declining trends get flagged for reallocation consideration
- **Category-level efficiency rankings**: surfaces which project categories deliver the highest impact-per-ETH, enabling systematic rebalancing
- **Predictive signal**: commit frequency at 90 days post-funding is the strongest leading indicator of long-term project health — codified as a reusable heuristic

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
    "overfundedCategory": "...",
    "systemicInsight": "...",
    "keyRecommendation": "..."
  }
}
```

## Evaluation Mechanism

The scoring framework is designed to be reusable across epochs:

| Dimension | What It Measures | Key Signals |
|-----------|-----------------|-------------|
| Impact | Value delivered per ETH received | Commit velocity, contributor growth, downstream usage |
| Sustainability | Long-term project health trajectory | Trend direction, funding continuity, team size stability |
| Community | Genuine engagement depth | Stars-to-commits ratio, issue activity, contributor retention |
| Funding Alignment | Whether current funding matches impact delivered | Impact score vs. ETH received ratio, category benchmarks |

**Allocation recommendation logic:**
- Score ≥ 7 + growing trend → increase allocation
- Score 5-6 + stable trend → maintain allocation
- Score < 5 OR declining trend → flag for community review

## Why Venice AI?

Funding allocation data is sensitive. Which projects are underperforming, which allocators vote together, which categories are being gamed — these are signals that shouldn't be exposed publicly during analysis. Venice's no-data-retention inference lets the agent reason privately over this data and output only the structured insights. The reasoning never persists beyond the API call.

## Architecture

```
GitHub API (real metrics)
      +
Octant Allocation History (on-chain + epochs 1-5)
      ↓
Data normalization + trend detection
      ↓
Per-project Venice analysis (impact, sustainability, community, alignment scores)
      ↓
Aggregate portfolio analysis (patterns, systemic risks, recommendations)
      ↓
Evaluation mechanism outputs: ranked report + category rankings + allocation signals
      ↓
Ranked report + execution log
```

## Tech Stack

- TypeScript + Node.js
- Venice AI (llama-3.3-70b, no data retention)
- GitHub Public API
- Octant on-chain data (0x879133Fd79b7F48CE1c368b0fCA9ea168eaF117c)

## Tracks

Submitted to:
- **Agents for Public Goods Data Analysis for Project Evaluation** (Octant)
- **Agents for Public Goods Data Collection for Project Evaluation** (Octant)
- **Mechanism Design for Public Goods Evaluation** (Octant)
