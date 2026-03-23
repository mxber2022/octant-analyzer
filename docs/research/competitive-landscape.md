# Competitive Landscape: Public Goods Funding Evaluation

> Analysis of existing platforms and their evaluation gaps — where OctantInsight / MEL³ adds value.

---

## Overview

Five major platforms fund Ethereum public goods. Each has a different evaluation model, and each has evaluation blind spots that agent-based evaluation can address.

---

## 1. Gitcoin

### What It Does Well
- **Quadratic Funding (QF):** Aggregates community preferences through matching. Many small donations count more than fewer large ones, reducing plutocratic capture.
- **Gitcoin Passport:** Identity verification reduces sybil attacks on QF rounds.
- **Ecosystem reach:** The largest public goods funding platform in crypto, with broad community participation.
- **Grants Stack:** Open-source tooling that other organizations can use to run their own QF rounds.

### Where Evaluation Breaks
- **QF captures preference, not impact.** A project can receive high QF matching because it's well-marketed, not because it delivers measurable value. There is no feedback loop from "how much did this project actually accomplish?" to "how much should it receive next round?"
- **No longitudinal tracking.** Projects are evaluated round-by-round. There is no systematic mechanism to track whether Round 15 funding produced the outcomes that justified the allocation in Round 18.
- **Sybil defense ≠ evaluation.** Passport verifies that voters are real humans. It says nothing about whether their collective preferences lead to optimal funding allocation.
- **Popularity bias.** QF systematically favors projects with large communities over niche infrastructure that few people interact with directly but many depend on.

### How OctantInsight Fills the Gap
- Dimensional scoring separates Impact from Community — popular projects are not automatically rated high-impact.
- Allocation trend analysis reveals whether community funding patterns actually track project outcomes.
- Category efficiency analysis identifies systematically underfunded project types (e.g., Core Infrastructure vs. Funding Mechanisms).

---

## 2. Octant

### What It Does Well
- **Novel value capture:** Funded by Golem Foundation's GLM staking rewards rather than donations — sustainable and non-extractive.
- **Epoch model:** Regular funding cycles (roughly quarterly) create natural evaluation checkpoints.
- **Community allocation:** Token holders direct funding, creating a decentralized evaluation mechanism.
- **Growing self-awareness:** Octant's explicit request for "mechanism design for evaluation" (this hackathon track) shows recognition that their current approach has limitations.

### Where Evaluation Breaks
- **No formal evaluation framework.** Allocators rely on personal judgment, project familiarity, and social proof. There is no standardized rubric.
- **Concentration risk.** A small number of well-known projects receive disproportionate funding. Our analysis shows 45% concentration in two projects.
- **No outcome validation.** There is no mechanism to check whether Epoch 3 funding decisions were vindicated by Epoch 5 outcomes.
- **Scaling ceiling.** Community allocation works at 20-30 projects. As Octant grows, the human evaluation bottleneck will constrain the number of projects that can be meaningfully assessed.

### How OctantInsight Fills the Gap
- Provides the formal evaluation framework Octant lacks (4-dimension scoring + allocation signals).
- Surfaces concentration risk quantitatively (portfolio-level aggregate analysis).
- Creates a foundation for outcome validation (planned IPA metric).
- Scales evaluation to any number of projects without additional human evaluators.

---

## 3. Artizen

### What It Does Well
- **Fluid Quadratic Funding:** Continuous funding rather than round-based, reducing timing pressure.
- **Artifact model:** Projects create "Artifacts" (digital collectibles) that represent their work, creating a tangible asset for funders.
- **Art-impact bridge:** Uniquely positioned at the intersection of creative work and public goods.
- **Aesthetic quality:** The platform itself demonstrates that public goods funding can be beautiful.

### Where Evaluation Breaks
- **Art-impact gap.** Artizen funds creative and cultural public goods, but measuring "impact" for art, media, and cultural projects is fundamentally harder than for code-based projects. A GitHub commit count is meaningless for a documentary or community event.
- **Artifact value ≠ project impact.** An Artifact can be valuable as a collectible while the underlying project delivers minimal public goods value.
- **No standardized metrics.** Each project type (film, software, event, research) requires different evaluation dimensions, making cross-project comparison difficult.

### How OctantInsight Fills the Gap
- The 4-dimension framework could be adapted for creative public goods by reweighting dimensions (Community weight increased, GitHub-based signals replaced with audience/participation metrics).
- Venice AI's qualitative reasoning capability is well-suited to evaluating creative projects where purely quantitative metrics fail.
- Category-level analysis could surface whether creative public goods are systematically under/overfunded relative to technical ones.

---

## 4. Ethereum Foundation ESP (Ecosystem Support Program)

### What It Does Well
- **Deep expertise.** ESP reviewers are domain experts who understand the technical nuance of funded projects.
- **Milestone-based funding.** Large grants are disbursed in tranches tied to deliverables, creating built-in accountability.
- **Strategic alignment.** ESP funding targets ecosystem-critical work (client diversity, security audits, research) that QF mechanisms tend to underfund.
- **Track record:** ESP has funded some of the most impactful Ethereum infrastructure projects.

### Where Evaluation Breaks
- **Committee bottleneck.** A small team reviews all applications. This creates throughput limitations and potential bias (evaluators have existing relationships with applicants).
- **Opaque criteria.** ESP's evaluation criteria are not public. Applicants cannot know in advance how their application will be assessed.
- **No systematic post-funding evaluation.** Milestone completion is verified, but there is no systematic assessment of whether completed milestones produced ecosystem-level impact.
- **Scalability.** Committee-based evaluation cannot scale beyond a few hundred applications per year without proportionally increasing headcount.

### How OctantInsight Fills the Gap
- Transparent, codified evaluation criteria that applicants can see and prepare for.
- Automated post-funding evaluation (GitHub activity monitoring, usage metrics).
- Scalable evaluation that augments (not replaces) committee expertise.
- Cross-project pattern detection that individual committee members cannot perform at scale.

---

## 5. Abundance Protocol

### What It Does Well
- **Value consensus mechanism.** Novel approach to determining the "value" of public goods through collective agreement rather than market pricing.
- **Non-extractive funding.** Like Octant, designed to fund without taking from the funded.
- **Philosophical depth.** Addresses fundamental questions about how decentralized communities can collectively value non-market goods.

### Where Evaluation Breaks
- **Early stage.** Limited track record of funded projects and evaluation outcomes.
- **Consensus ≠ accuracy.** Collective agreement about a project's value may not correlate with actual impact. Consensus is a social process, not an analytical one.
- **Complexity barrier.** The value consensus mechanism is conceptually sophisticated but may be too complex for broad participation.

### How OctantInsight Fills the Gap
- Evidence-based scoring provides an objective input to value consensus discussions.
- Agent analysis can surface information asymmetries (some voters may not know a project's GitHub has been inactive for 6 months).
- IPA metric could validate whether value consensus decisions predict actual outcomes.

---

## Comparative Matrix

| Feature | Gitcoin | Octant | Artizen | ESP | Abundance | OctantInsight |
|---------|---------|--------|---------|-----|-----------|---------------|
| Evaluation method | QF voting | Community allocation | Fluid QF + Artifacts | Expert committee | Value consensus | AI agent scoring |
| Formal criteria | No | No | No | Yes (private) | Emerging | Yes (public, versioned) |
| Multi-dimensional | No | No | No | Informally | No | Yes (4 dimensions) |
| Cross-project analysis | No | No | No | Limited | No | Yes (aggregate) |
| Outcome tracking | No | No | No | Milestone-based | No | Planned (IPA) |
| Self-improving | No | No | No | No | No | Planned (AutoEval) |
| Scales to 100+ projects | With QF | Not well | With QF | No | Unknown | Yes |
| Privacy in evaluation | N/A | N/A | N/A | Internal | N/A | Yes (Venice) |

---

## The Gap OctantInsight Fills

Across all five platforms, the same three gaps appear:

### Gap 1: No Systematic Outcome Validation
No platform systematically checks whether funding decisions produced the intended outcomes. OctantInsight's planned IPA metric addresses this directly.

### Gap 2: No Cross-Project Pattern Detection
Each platform evaluates projects in isolation. No one asks "is this category systematically underfunded across the ecosystem?" OctantInsight's aggregate analysis does exactly this.

### Gap 3: No Evaluation Evolution
Evaluation criteria are static across all platforms. OctantInsight's AutoEval Loop makes criteria evolution the core mechanism — a first in public goods funding.

---

## OctantInsight's Position

OctantInsight is not a replacement for any of these platforms. It is an **evaluation layer** that could sit on top of any of them:

```
Gitcoin QF rounds  ─┐
Octant epochs       ─┤
Artizen Artifacts   ─┼──→  OctantInsight evaluation  ──→  Evidence-based signals
ESP applications    ─┤         (agent-powered)              for human decision-makers
Abundance consensus ─┘
```

The value proposition is clear: humans make final funding decisions, but agents provide the analytical foundation that no human evaluator can produce at scale.

---

## References

- Gitcoin Grants Stack documentation (grants-stack, gitcoinco/grants-stack)
- Octant app and allocation data (octant.app)
- Artizen Fund (artizen.fund)
- Ethereum Foundation ESP (esp.ethereum.foundation)
- Abundance Protocol documentation
- [docs/ARCHITECTURE.md](../ARCHITECTURE.md) — System architecture
- [docs/submission/octant-track1-mechanism-design.md](../submission/octant-track1-mechanism-design.md) — Mechanism design submission
