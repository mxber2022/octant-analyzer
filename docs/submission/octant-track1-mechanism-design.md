# Octant Track 1: Mechanism Design for Public Goods Evaluation

> Octant's allocators distributed 2,377 ETH across 5 epochs without a single formal evaluation framework. This submission builds one.

**Track:** Mechanism Design for Public Goods Evaluation ($1,000)
**Project:** OctantInsight (MEL³ Protocol)
**Team:** Maharaja (Max) + 0xJitsu

---

## The Problem

Public goods evaluation is broken in three specific ways:

1. **Static criteria.** Gitcoin, Octant, and ESP all use evaluation frameworks that were designed once and applied repeatedly. But what makes a "good" public good changes as the ecosystem evolves. Evaluation criteria should evolve too — and they should evolve based on evidence, not committee meetings.

2. **Human bottleneck.** Octant's community allocation model works at 20-30 projects per epoch. It cannot work at 200. The evaluation step — deciding which projects deserve more or less funding — requires synthesizing GitHub activity, on-chain usage, community sentiment, and funding history simultaneously. Humans cannot do this across a portfolio at scale.

3. **No feedback loop.** Current mechanisms have no way to learn from their own predictions. If Octant allocated 145 ETH to Protocol Guild in Epoch 5, there is no systematic way to ask: "Did that allocation produce the expected impact?" The answer exists in the data, but no mechanism captures it.

---

## What We Built: A 4-Dimension Scoring Engine With Allocation Signals

Not a whitepaper. Not a theoretical framework. A working system that takes 10 projects, 2,377 ETH of allocation history, and live GitHub data — and outputs ranked evaluations with concrete increase/maintain/flag signals in 100 seconds.

### What's Built

The agent implements a **4-dimension scoring framework** with weighted composite scoring:

| Dimension | Weight | What It Measures | Key Signals |
|-----------|--------|-----------------|-------------|
| **Impact** | 0.35 | Value delivered per ETH received | Commit velocity, contributor growth, downstream usage |
| **Sustainability** | 0.25 | Long-term project health trajectory | Trend direction, funding continuity, team size stability |
| **Community** | 0.20 | Genuine engagement depth | Stars-to-commits ratio, issue activity, contributor retention |
| **Funding Alignment** | 0.20 | Whether current funding matches impact delivered | Impact score vs. ETH received ratio, category benchmarks |

Each dimension is scored 1-10 by Venice AI (llama-3.3-70b) using a structured prompt that includes both quantitative metrics (GitHub data) and contextual information (project description, category, allocation history).

### Allocation Signal Logic

The scoring produces three clear signals:

```
Score ≥ 7  AND  trend = growing   →  INCREASE allocation
Score 5-6  AND  trend = stable    →  MAINTAIN allocation
Score < 5  OR   trend = declining →  FLAG for community review
```

This is not a recommendation engine that replaces community decision-making. It is a **triage mechanism** that tells allocators where to focus their attention.

### Trend Detection

The agent detects allocation trends by splitting each project's epoch history into two halves:

```
if secondHalfAvg > firstHalfAvg × 1.1  →  "growing"
if secondHalfAvg < firstHalfAvg × 0.9  →  "declining"
otherwise                                →  "stable"
```

This captures a crucial signal: **community sentiment shifts precede explicit underperformance.** When allocators collectively reduce funding to a project across epochs, that behavioral signal often arrives before any single metric drops below a threshold.

---

## Concrete Example: One Full Pipeline Run

**Input:** 10 Octant-funded projects, epochs 1-5, live GitHub metrics.

**Phase 1 — Collection:**
The agent fetches real GitHub data for each project. For L2Beat: 369.8 total ETH, growing trend, high commit velocity. For BrightID: 130.1 total ETH, declining trend, low recent activity.

**Phase 2 — Per-Project Analysis:**
Venice AI scores each project. L2Beat receives Impact: 8, Sustainability: 9, Community: 8, Funding Alignment: 7, Overall: 8.0. BrightID receives Impact: 7, Sustainability: 6, Community: 6, Funding Alignment: 6, Overall: 6.5.

**Phase 3 — Aggregate Analysis:**
The agent identifies that Identity & Privacy is the most underfunded category, Funding Mechanisms is overfunded relative to impact, and two projects (BrightID, clr.fund) show engagement decay.

**Phase 4 — Signals:**
- L2Beat → INCREASE (score 8, growing)
- BrightID → FLAG (score 6.5, declining)
- Protocol Guild → INCREASE (score 8, stable — though technically "maintain" by the rules, the high absolute score signals continued investment)

**Output:** `analysis_report.json` with full rankings, category analysis, and portfolio-level insights. `agent_log.json` with timestamped execution trace.

Total execution: ~100 seconds. A human doing equivalent analysis would need hours.

---

## The MEL³ Vision: Self-Improving Evaluation

What's built today is the scoring engine. The designed (but not yet implemented) MEL³ protocol extends this into a self-improving system:

### AutoEval Loop

Inspired by Karpathy's autoresearch pattern — where an AI agent iteratively improves its own research methodology — the AutoEval Loop applies the same principle to evaluation criteria:

```
eval_criteria.md (v1) → agent evaluates projects → compute IPA
    → did IPA improve? → yes: keep criteria, mutate for v2
                        → no: revert to previous version
    → repeat
```

The key insight: **the evaluation criteria themselves become the editable asset**, just as `program.md` is the editable asset in Karpathy's autoresearch.

### Impact Prediction Accuracy (IPA)

Unlike Karpathy's single metric (`val_bpb`), public goods evaluation requires a composite metric:

1. **Correlation coefficient** — How well do scores at time T predict outcomes at T+6 months?
2. **Threshold accuracy** — What % of projects scored ≥7 actually delivered measurable impact?
3. **Inverted MAE** — How close were score predictions to actual measured outcomes?

This multi-dimensional IPA deliberately challenges the single-metric assumption. Public goods impact cannot be collapsed into one number without losing critical signal.

### Evaluation Reputation Tokens (ERTs)

Designed as non-transferable, time-decaying tokens that represent an evaluator agent's track record:

- Good predictions → ERT balance increases
- Bad predictions → ERT balance decreases
- Time decay → old reputation fades, requiring continuous accuracy
- Non-transferable → reputation cannot be bought or sold

ERTs create a **novel DPI (Decentralized Physical Infrastructure) capital issuance mechanism** for evaluation: agents earn the right to evaluate by proving they evaluate well.

---

## Why This Challenges Existing Approaches

### vs. Gitcoin Passport
Passport verifies identity, not evaluation quality. OctantInsight evaluates project impact directly.

### vs. Committee Review
Committee models don't scale past ~30 projects. Agent evaluation scales to thousands while maintaining consistency.

### vs. Pure QF
Quadratic funding captures preference, not impact. A project can receive high QF allocation because it's popular, not because it delivers value. OctantInsight's 4-dimension framework separates these signals.

### vs. Single-Metric Scoring
Most automated scoring uses a single composite number. OctantInsight preserves dimensional transparency — allocators can see that a project scores high on Impact but low on Sustainability, enabling nuanced decisions.

---

## Limitations and Attack Vectors

### Built System

1. **LLM scoring variance.** Venice AI may score the same project differently on repeated runs (mitigated by low temperature=0.2, but not eliminated). Solution: ensemble scoring across multiple runs.

2. **GitHub metrics as proxy.** Commit count ≠ impact. A project could game commits while delivering no value. Mitigation: the agent uses multiple signals (stars, contributors, issues, commit quality) and the community score dimension captures engagement depth.

3. **Hardcoded allocation data.** Epoch allocations are currently hardcoded in `projects.ts`, not fetched live from on-chain sources. This limits the system to pre-curated projects.

4. **No outcome ground truth.** The mechanism scores projects but has no way to verify whether scores predicted actual outcomes. This is exactly what the planned IPA metric would address.

### Designed System (MEL³)

5. **Criteria gaming.** If eval_criteria.md is public, projects could optimize for criteria rather than impact. Mitigation: criteria mutation between versions + private reasoning via Venice.

6. **IPA bootstrapping.** The first iteration has no historical accuracy data to compute IPA against. Requires a synthetic or retroactive baseline.

7. **ERT sybil attacks.** Multiple agent identities could be created to accumulate reputation. Mitigation: staking requirements + on-chain identity verification.

---

## Track Alignment

This submission addresses Octant's "Mechanism Design for Public Goods Evaluation" track:

| Track Requirement | OctantInsight Implementation |
|-------------------|------------------------------|
| Novel evaluation mechanism | 4-dimension weighted scoring with allocation signals |
| Transparent methodology | Scoring dimensions, weights, and signal logic are fully documented and reusable |
| Reusable across epochs | Framework is epoch-agnostic — add new allocation data, re-run |
| Goes beyond simple metrics | Combines quantitative (GitHub) + qualitative (Venice AI reasoning) + trend detection |
| Addresses limitations honestly | See "Limitations and Attack Vectors" above |

---

## References

- Karpathy, A. (2025). "AI-Assisted Research." Blog post on autoresearch methodology.
- Chase, H. (2025). "autoresearch-agents." GitHub repository adapting Karpathy's pattern.
- Octant Epochs 1-5 allocation data (on-chain, contract `0x879133Fd79b7F48CE1c368b0fCA9ea168eaF117c`)
- Venice AI documentation (no-data-retention inference)
- [docs/ARCHITECTURE.md](../ARCHITECTURE.md) — Full system architecture
- [docs/submission/octant-track2-data-analysis.md](octant-track2-data-analysis.md) — Companion data analysis submission
- [docs/submission/octant-track3-data-collection.md](octant-track3-data-collection.md) — Companion data collection submission
