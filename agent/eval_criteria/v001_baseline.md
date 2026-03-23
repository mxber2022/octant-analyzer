# Evaluation Criteria v001 — Baseline

> This is the first versioned evaluation criteria document for OctantInsight.
> In the planned AutoEval Loop, this file is the "editable asset" — the agent modifies it between iterations to improve Impact Prediction Accuracy (IPA).

---

## Scoring Dimensions

### 1. Impact (Weight: 0.35)

**Definition:** Value delivered relative to ETH received.

**Signals:**
- Commit velocity (commits in last 90 days)
- Contributor growth rate (not absolute count)
- Downstream usage indicators (forks, dependent projects)
- Category-appropriate impact (infrastructure ≠ tooling ≠ coordination)

**Scoring guide:**
- 9-10: Exceptional value delivery, clear ecosystem dependency, high commits-per-ETH ratio
- 7-8: Strong value delivery, measurable community benefit, active development
- 5-6: Moderate value delivery, some measurable impact, steady development
- 3-4: Below-average value relative to funding, declining development signals
- 1-2: Minimal demonstrable value, funding appears misallocated

### 2. Sustainability (Weight: 0.25)

**Definition:** Long-term project health trajectory.

**Signals:**
- Allocation trend direction (growing / stable / declining)
- Funding continuity across epochs
- Team size stability (contributor count over time)
- Diversification of funding sources (not solely dependent on Octant)

**Scoring guide:**
- 9-10: Strong growth trajectory, diversified funding, expanding team
- 7-8: Stable trajectory, consistent funding, maintained team
- 5-6: Flat trajectory, single funding source, static team
- 3-4: Early decline signals, funding uncertainty, team contraction
- 1-2: Clear decline, funding at risk, team dissolution signals

### 3. Community (Weight: 0.20)

**Definition:** Genuine engagement depth (not vanity metrics).

**Signals:**
- Stars-to-commits ratio (high stars + low commits = hype without substance)
- Issue activity (open issues being addressed = healthy community)
- Contributor retention (repeat contributors vs. one-time)
- Community diversity (not dominated by a single contributor)

**Scoring guide:**
- 9-10: Deep, diverse engagement, active issue resolution, strong retention
- 7-8: Healthy engagement, regular community activity, good retention
- 5-6: Moderate engagement, some community activity, average retention
- 3-4: Shallow engagement, star-heavy but commit-light, poor retention
- 1-2: Minimal genuine engagement, possible artificial metrics

### 4. Funding Alignment (Weight: 0.20)

**Definition:** Whether current funding level is appropriate for the impact delivered.

**Signals:**
- Impact score vs. ETH received ratio
- Category benchmark comparison (is this project funded more or less than similar projects?)
- Marginal utility of additional funding (would more ETH produce more impact?)

**Scoring guide:**
- 9-10: Funding perfectly calibrated to impact, strong efficiency
- 7-8: Funding roughly appropriate, minor adjustment needed
- 5-6: Some misalignment — either slightly over or underfunded
- 3-4: Significant misalignment — funding doesn't match impact
- 1-2: Severe misalignment — major reallocation warranted

---

## Composite Score

```
overallScore = (impact × 0.35) + (sustainability × 0.25) + (community × 0.20) + (fundingAlignment × 0.20)
```

---

## Allocation Signal Logic

```
overallScore ≥ 7  AND  trend = "growing"    →  INCREASE allocation
overallScore 5-6  AND  trend = "stable"     →  MAINTAIN allocation
overallScore < 5  OR   trend = "declining"  →  FLAG for community review
```

---

## Red Flag Triggers

The following conditions generate red flags regardless of scores:
- `commitsLast90Days = 0` → "no commits in last 90 days"
- `commitsLast90Days < 10` → "low commitsLast90Days"
- `contributors < 3` → "very small team"
- `trend = "declining"` AND `overallScore < 6` → "declining project with below-average score"
- Allocation dropped >30% between consecutive epochs → "significant funding reduction"

---

## Version History

| Version | Date | Change | IPA Result |
|---------|------|--------|------------|
| v001 | 2026-03-22 | Baseline criteria extracted from Venice prompt | N/A (first version) |

---

## Notes for AutoEval Loop

When the AutoEval Loop is implemented, mutations to this document should focus on:
1. **Weight adjustments** — Does changing Impact from 0.35 to 0.40 improve IPA?
2. **Signal additions** — Does adding "issue close rate" as a Community signal improve prediction?
3. **Threshold tuning** — Does changing the allocation signal boundary from 7 to 7.5 improve outcomes?
4. **Red flag refinement** — Are current red flag triggers producing false positives?

Each mutation produces a new version (v002, v003, ...). Versions that improve IPA are kept. Versions that worsen IPA are reverted.
