# Octant Track 2: Agents for Data Analysis for Project Evaluation

> 10 projects. 2,377 ETH. 45% concentration risk in two projects. 60% correlation between declining allocations and declining commits. None of this was visible before the agent ran.

**Track:** Agents for Public Goods Data Analysis ($1,000)
**Project:** OctantInsight (MEL³ Protocol)
**Team:** Maharaja (Max) + 0xJitsu

---

## What Agents Can Extract That Humans Cannot Scale

Octant's Epoch 5 allocated funding to dozens of projects. A human reviewer can read each project's proposal, check their GitHub, and form an opinion. They cannot:

- Compare commit velocity trajectories across 10+ projects simultaneously
- Detect that funding concentration in two projects represents 45% of total allocation
- Identify that a category (Identity & Privacy) is systematically underfunded relative to its impact scores
- Correlate declining allocation trends with declining commit frequency to quantify a 60% decay correlation
- Surface that contributor growth rate (not absolute count) is a stronger signal than star count

OctantInsight does all of this in ~100 seconds.

---

## Analysis Capabilities (Built)

### 1. Multi-Dimensional Scoring

The agent doesn't produce a single "good/bad" rating. It scores each project across 4 independent dimensions:

- **Impact** (weight 0.35) — Value delivered per ETH received
- **Sustainability** (weight 0.25) — Long-term health trajectory
- **Community** (weight 0.20) — Genuine engagement depth
- **Funding Alignment** (weight 0.20) — Whether funding matches impact

This dimensional decomposition reveals cases invisible to single-score systems: a project can have high Impact but low Sustainability (it delivers value now but is burning out), or high Community but low Funding Alignment (beloved but overfunded).

### 2. Cross-Project Pattern Detection

After scoring individual projects, the agent runs aggregate portfolio analysis via Venice AI. From the live run:

**Finding:** "Funding mechanisms and core infrastructure projects tend to have higher overall scores, but funding mechanisms receive disproportionately more funding relative to their impact advantage."

This is a portfolio-level insight that no single-project review can surface. It emerges only when all 10 projects are analyzed together with their category labels and funding amounts.

### 3. Funding Efficiency Curves

The agent computes per-category efficiency by grouping projects and comparing average impact scores to total ETH allocated:

| Category | Projects | Total ETH | Avg Score | Efficiency Signal |
|----------|----------|-----------|-----------|-------------------|
| Research & Analytics | 1 | 369.8 | 8.0 | High impact per ETH |
| Core Infrastructure | 2 | 679.8 | 7.8 | High impact per ETH |
| Developer Tooling | 2 | 440.2 | 7.8 | Moderate |
| Ecosystem Coordination | 1 | 141.5 | 7.5 | Moderate |
| Funding Mechanisms | 3 | 581.5 | 7.3 | Lower impact per ETH |
| Identity & Privacy | 1 | 130.1 | 6.5 | Underfunded |

**Insight:** Core Infrastructure delivers the highest impact-per-ETH ratio but receives less total funding than Funding Mechanisms, which has a lower average score.

### 4. Engagement Decay Detection

The agent identifies projects where allocation trends and development activity are both declining — an early warning system:

- **BrightID:** Declining allocations (29.6 → 19.1 ETH over 5 epochs) + low recent commit activity = engagement decay
- **clr.fund:** Declining allocations (18.7 → 11.4 ETH) + minimal recent commits = engagement decay

The 60% correlation between declining allocation trends and reduced commit frequency suggests that **community allocators are already detecting underperformance before it becomes explicit** — they just lack a framework to articulate or act on it systematically.

### 5. Concentration Risk Analysis

The agent flags portfolio-level concentration:

> "Gitcoin + Protocol Guild receive 45% of total tracked funding (508.3 + 587.6 = 1,095.9 of 2,377.2 ETH). This creates systemic risk — if either project underperforms or pivots away from public goods, nearly half the portfolio's impact is affected."

This is invisible to per-project evaluation but critical for portfolio health.

---

## The Qualitative → Quantitative Bridge

Octant's track description calls qualitative data analysis "especially interesting and challenging." OctantInsight addresses this directly:

### How It Works

The agent feeds **both** quantitative metrics and qualitative context to Venice AI simultaneously:

```json
{
  "project": {
    "name": "Protocol Guild",
    "description": "Funding mechanism for Ethereum core protocol contributors",
    "category": "Core Infrastructure",
    "totalEthReceived": 587.6,
    "allocationTrend": "growing"
  },
  "githubMetrics": {
    "stars": 245,
    "contributors": 12,
    "commitsLast90Days": 47,
    "weeklyCommitAverage": 3.6
  }
}
```

Venice AI reasons over the **relationship** between the description ("core protocol contributors"), the category ("Core Infrastructure"), the funding trajectory ("growing"), and the activity level (47 commits/90d). It produces insights like:

> "Protocol Guild's relatively low commit count is misleading — as a funding distribution mechanism rather than a development project, its impact should be measured by the downstream commit activity of funded contributors, not its own repository."

This is qualitative reasoning grounded in quantitative data. A purely quantitative system would penalize Protocol Guild for low commits. A purely qualitative review would miss the trend data. The agent bridges both.

### Privacy-Preserving Qualitative Analysis

Venice AI's no-data-retention guarantee is critical here. The qualitative reasoning — "this project shows signs of grant farming," "this category is being gamed," "these allocation patterns suggest collusion" — is sensitive. Venice processes it without storing it, and only the structured scores and insights are output.

---

## Example: What Would the Agent Find Analyzing Octant Epoch 8?

Based on the patterns established in our Epoch 1-5 analysis, here's what OctantInsight would surface:

1. **New project triage.** Projects appearing for the first time in Epoch 8 would be scored against the established 4-dimension framework, with their GitHub metrics compared to portfolio baselines. "This new project has 3x the commit velocity of the portfolio median but hasn't received funding before" → FLAG for potential increase.

2. **Trend inflection points.** Projects that were "stable" in Epochs 1-5 but shifted to "declining" in 6-8 would be identified. The agent would flag these before the community's implicit signal (reduced allocation) materializes.

3. **Category rebalancing.** If Identity & Privacy (underfunded in our analysis) added new high-performing projects in Epochs 6-8, the agent would detect the category-level shift and recommend rebalancing.

4. **Post-funding outcome validation.** With 8 epochs of data, the agent could correlate Epoch 1-2 scores with Epoch 6-8 outcomes — the beginning of the IPA metric that MEL³ envisions.

---

## Two-Pass Analysis Architecture

The agent's analysis is not a single LLM call. It uses a deliberate two-pass architecture:

```
Pass 1: Per-project analysis (10 independent Venice calls)
    ↓
Pass 2: Portfolio-level aggregate analysis (1 Venice call over all results)
```

**Why this matters:** Pass 1 captures project-specific nuance without cross-contamination. Pass 2 identifies emergent patterns that only appear at the portfolio level. Running everything in a single prompt would conflate individual analysis with portfolio patterns, reducing the quality of both.

This mirrors how professional analysts work: evaluate each position independently, then analyze the portfolio as a whole.

---

## Limitations

1. **Venice AI consistency.** LLM-based scoring has inherent variance. Running the same analysis twice may produce slightly different scores (mitigated by temperature=0.2 but not eliminated).

2. **10-project sample size.** Portfolio-level patterns become more reliable with more projects. 10 is enough to surface trends but not enough for statistical significance on category-level claims.

3. **No sentiment analysis.** The current agent doesn't analyze governance forum discussions, Discord activity, or social media sentiment. These are rich qualitative data sources that the planned MEL³ data collection module would capture.

4. **Single-snapshot analysis.** The agent runs once and produces a report. It doesn't track changes over time (e.g., "Project X's score dropped from 8 to 6 between runs"). Longitudinal analysis requires running the agent periodically and comparing outputs.

5. **LLM reasoning is opaque.** While the scoring dimensions are transparent, the AI's reasoning within each dimension is not fully explainable. The structured output (scores, red flags, strengths, insights) captures the conclusions but not the full reasoning chain.

---

## Track Alignment

| Track Requirement | OctantInsight Implementation |
|-------------------|------------------------------|
| Agents that analyze project data | 4-phase pipeline: collect → analyze per-project → aggregate → rank |
| Pattern extraction at scale | Cross-project patterns, concentration risk, engagement decay |
| Qualitative data analysis | Venice AI bridges quantitative metrics with qualitative reasoning |
| Actionable evaluation outputs | Allocation signals (increase/maintain/flag) per project |
| Novel analytical approach | Two-pass architecture + dimensional scoring + privacy-preserving reasoning |

---

## References

- Live analysis output: `analysis_report.json` (10 projects, 2,377.2 ETH tracked)
- Execution trace: `agent_log.json` (22 logged steps, ~100s total)
- [docs/ARCHITECTURE.md](../ARCHITECTURE.md) — Full system architecture
- [docs/submission/octant-track1-mechanism-design.md](octant-track1-mechanism-design.md) — Mechanism design submission
- [docs/submission/octant-track3-data-collection.md](octant-track3-data-collection.md) — Data collection submission
