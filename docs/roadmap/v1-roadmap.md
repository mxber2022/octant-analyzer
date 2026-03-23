# OctantInsight / MEL³ — Post-Hackathon Roadmap

> From hackathon prototype to production evaluation protocol.

---

## Current State (Hackathon MVP)

**Built:**
- TypeScript agent with 4-phase pipeline (collect → analyze → aggregate → rank)
- 10 Octant-funded projects analyzed across epochs 1-5
- 4-dimension scoring framework (Impact, Sustainability, Community, Funding Alignment)
- Venice AI integration with no-data-retention privacy
- Structured report output + execution logging
- Allocation signal logic (increase / maintain / flag)

**Not yet built:**
- Smart contracts (EvaluationMandate, ReputationOracle, AutoEvalRegistry)
- Python agent with AutoEval Loop
- Live on-chain data fetching
- IPA metric computation
- Evaluation Reputation Tokens (ERTs)

---

## Month 1-2: Open Source + Real Data

### Goals
- Run OctantInsight on real Octant Epoch 8 + 9 data
- Replace hardcoded allocations with live on-chain data
- Open source the evaluation framework for community contributions

### Deliverables
- [ ] Live on-chain data fetcher for Octant allocation contract (`0x879133Fd79b7F48CE1c368b0fCA9ea168eaF117c`)
- [ ] Support for Epoch 6-9 data (extend beyond current Epoch 1-5 coverage)
- [ ] `eval_criteria/v001_baseline.md` — Formalized evaluation criteria document, editable and version-tracked
- [ ] Public repository with contribution guidelines
- [ ] First community-submitted criteria modification (proof of open process)
- [ ] Integration with Octant's project submission API (if available)
- [ ] Comparative analysis: agent scores vs. actual community allocation outcomes

### Success Metric
Agent predictions for Epoch 8 projects correlate with Epoch 9 allocation changes at r > 0.5.

---

## Month 3-4: Smart Contracts + Python Agent

### Goals
- Deploy MEL³ contracts to Base Sepolia (testnet)
- Migrate evaluation logic from TypeScript to Python agent with modular architecture
- Implement AutoEval Loop (Karpathy pattern)

### Deliverables
- [ ] `EvaluationMandate.sol` — On-chain specification of agent evaluation scope
- [ ] `ReputationOracle.sol` — ERT minting, time-decay logic, non-transferability
- [ ] `AutoEvalRegistry.sol` — Criteria version tracking, IPA scores, keep/revert history
- [ ] `autoeval.py` — Main AutoEval loop with iteration tracking
- [ ] `criteria_engine.py` — Loads, modifies, and versions eval_criteria.md
- [ ] `ipa_scorer.py` — 3-component IPA metric (correlation + threshold accuracy + inverted MAE)
- [ ] `chain_submitter.py` — Submits evaluation results to Base chain
- [ ] First complete AutoEval cycle: criteria v1 → evaluate → compute IPA → mutate → criteria v2
- [ ] Testnet deployment with at least 3 complete AutoEval iterations

### Success Metric
IPA improves across 3+ AutoEval iterations on historical Octant data (epochs 1-5 as training, 6-9 as validation).

---

## Month 5-6: Multi-Platform Expansion + Agent Marketplace

### Goals
- Extend evaluation framework beyond Octant to other public goods platforms
- Begin agent marketplace design (multiple competing evaluator agents)

### Deliverables
- [ ] Gitcoin Grants Stack integration (collect GG round data, apply evaluation framework)
- [ ] Artizen Fund integration (adapt framework for creative/art public goods)
- [ ] Ethereum Foundation ESP integration (committee-based evaluation comparison)
- [ ] Standardized evaluation mandate format (draft EIP proposal for cross-platform evaluation)
- [ ] Multi-agent evaluation: 2+ independent agents scoring the same projects
- [ ] Agent agreement scoring (inter-rater reliability across agents)
- [ ] Dashboard v1 — public web interface for browsing evaluation results

### Success Metric
Framework produces meaningful evaluations across 3+ funding platforms without per-platform customization of core scoring logic.

---

## Month 7-12: Protocol Maturation

### Goals
- Production-ready MEL³ protocol on Base mainnet
- Institutional MEL compliance pathway
- Revenue model for sustainability

### Deliverables
- [ ] Base mainnet deployment (EvaluationMandate, ReputationOracle, AutoEvalRegistry)
- [ ] Agent staking and slashing mechanism (stake to evaluate, lose stake for poor predictions)
- [ ] Revenue model: evaluation-as-a-service fees (platforms pay for automated evaluation)
- [ ] Cross-platform evaluation standard (interoperable with Gitcoin, Octant, ESP, Artizen)
- [ ] Institutional MEL framework compliance mapping (USAID, World Bank, Open Society standards)
- [ ] LLM-guided criteria mutations (replace random mutations with Claude/Venice-guided improvements)
- [ ] Governance for meta-criteria (community decides what "good evaluation" means)
- [ ] Dashboard public launch with historical trends, category analysis, and allocation recommendations
- [ ] Security audit for smart contracts
- [ ] Documentation: protocol spec, integration guide, API reference

### Success Metric
At least one public goods platform integrates MEL³ evaluation into their allocation workflow.

---

## Architecture Evolution

```
Hackathon MVP (Now)              Month 3-4                    Month 7-12
┌──────────────────┐    ┌─────────────────────┐    ┌──────────────────────────┐
│ TypeScript Agent │    │ Python Agent         │    │ Multi-Agent Protocol     │
│ GitHub API       │ →  │ AutoEval Loop        │ →  │ Agent Marketplace        │
│ Venice AI        │    │ On-chain submission  │    │ Staking + Slashing       │
│ JSON reports     │    │ IPA metric           │    │ Cross-platform standard  │
│ 10 projects      │    │ Base Sepolia         │    │ Base Mainnet             │
│ Epochs 1-5       │    │ Live on-chain data   │    │ Revenue model            │
└──────────────────┘    └─────────────────────┘    └──────────────────────────┘
```

---

## Risk Factors

| Risk | Mitigation |
|------|-----------|
| LLM scoring variance undermines trust | Ensemble scoring (multiple runs), transparent confidence intervals |
| IPA bootstrapping (no ground truth for v1) | Use historical Octant data as retroactive baseline |
| Smart contract vulnerabilities | Testnet-first deployment, security audit before mainnet |
| Multi-platform data heterogeneity | Standardized data schema with per-platform adapters |
| Community adoption resistance | Open source everything, invite community criteria contributions early |
| Venice AI availability/pricing | Abstract AI provider (Venice today, could be Anthropic/OpenAI/local) |
