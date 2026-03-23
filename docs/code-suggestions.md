# Code Suggestions for Max

> 0xJitsu's suggestions after reviewing the codebase. Each suggestion maps to a specific file. Implement at your discretion.

---

## Suggestion: Fetch allocation data from on-chain

**File:** `src/projects.ts`
**Lines:** 14-162 (entire `OCTANT_PROJECTS` array)
**Current behavior:** Allocation history is hardcoded. Adding new epochs or projects requires editing source code.
**Suggested change:** Add an `on-chain-fetcher.ts` module that reads allocation events from the Octant contract (`0x879133Fd79b7F48CE1c368b0fCA9ea168eaF117c`) using ethers.js or viem. Keep `projects.ts` as a fallback for when RPC is unavailable.
**Rationale:** Judges may question why allocation data is hardcoded when it's available on-chain. Live fetching demonstrates the agent can operate autonomously without manual data curation.
**Priority:** HIGH

---

## Suggestion: Add retry logic for Venice AI calls

**File:** `src/venice.ts`
**Lines:** 14-32 (`veniceChat` function)
**Current behavior:** A single failed Venice API call (`res.ok` check) throws immediately, causing that project to be skipped entirely.
**Suggested change:** Add exponential backoff retry (3 attempts, 1s/2s/4s delays). Venice occasionally returns 5xx errors under load.
```typescript
// Pseudocode
for (let attempt = 1; attempt <= 3; attempt++) {
  const res = await fetch(...)
  if (res.ok) return parseResponse(res)
  if (attempt < 3) await sleep(1000 * Math.pow(2, attempt - 1))
}
throw new Error(`Venice API failed after 3 attempts`)
```
**Rationale:** The live demo runs once. If Venice hiccups during the demo, losing a project from the analysis looks bad. Retries make the agent more resilient.
**Priority:** HIGH

---

## Suggestion: Add `.env.example` file

**File:** `.env.example` (new file)
**Lines:** N/A
**Current behavior:** No `.env.example` exists. Users must read the README to know which env vars are needed.
**Suggested change:** Create `.env.example`:
```
VENICE_API_KEY=your_venice_api_key_here
GITHUB_TOKEN=optional_github_token_for_higher_rate_limits
```
**Rationale:** Standard practice. Judges cloning the repo should see immediately what's needed.
**Priority:** MEDIUM

---

## Suggestion: Handle GitHub stats 202 response explicitly

**File:** `src/github.ts`
**Lines:** 43-52 (commit activity fetch)
**Current behavior:** The `stats/commit_activity` endpoint returns `202 Accepted` when GitHub is computing stats (first request for a repo). The current code catches this silently, defaulting to 0 commits.
**Suggested change:** On 202 response, wait 2 seconds and retry once. GitHub usually computes stats within 1-3 seconds.
```typescript
let activity = await fetchJSON(url)
if (!Array.isArray(activity)) {
  await sleep(2000)
  activity = await fetchJSON(url)
}
```
**Rationale:** Several projects in the analysis may show 0 commits/90d not because they're inactive, but because the stats hadn't been computed yet. This inflates red flags incorrectly.
**Priority:** MEDIUM

---

## Suggestion: Add a `--project` CLI flag for single-project analysis

**File:** `src/index.ts`
**Lines:** 37-190 (`main` function)
**Current behavior:** The agent always analyzes all 10 projects. No way to run a quick analysis on a single project.
**Suggested change:** Accept `--project "Protocol Guild"` CLI argument to filter `OCTANT_PROJECTS` to a single entry. Useful for demos and debugging.
**Rationale:** During the live demo, running 10 projects takes ~100 seconds. A single-project mode would finish in ~15 seconds, useful for live Q&A.
**Priority:** MEDIUM

---

## Suggestion: Validate Venice JSON response schema

**File:** `src/venice.ts`
**Lines:** 96-101 (JSON parsing)
**Current behavior:** Venice response is regex-matched for JSON and parsed with `JSON.parse`. No validation that the parsed object actually matches `ProjectAnalysis`.
**Suggested change:** Add basic schema validation:
```typescript
const parsed = JSON.parse(jsonMatch[0])
if (typeof parsed.impactScore !== 'number' || typeof parsed.overallScore !== 'number') {
  throw new Error('Venice returned invalid schema')
}
```
Or use zod for proper validation.
**Rationale:** Venice occasionally returns malformed JSON or JSON with missing fields (especially under prompt variation). Schema validation prevents corrupt data from entering the report.
**Priority:** MEDIUM

---

## Suggestion: Add eval_criteria/v001_baseline.md

**File:** `agent/eval_criteria/v001_baseline.md` (new file — .md file, within docs/strategy boundaries)
**Lines:** N/A
**Current behavior:** No eval_criteria file exists. The evaluation criteria are embedded in the Venice prompt in `venice.ts`.
**Suggested change:** Extract the evaluation criteria into a versioned markdown file. This is the foundation for the planned AutoEval Loop — the criteria document becomes the "editable asset."
**Rationale:** The MEL³ narrative centers on self-improving evaluation criteria. Having a v001 criteria file — even if the TypeScript agent doesn't read it yet — shows the roadmap is grounded.
**Priority:** LOW (0xJitsu can create this file since it's .md)

---

## Suggestion: Add test coverage

**File:** `test/` (new directory)
**Lines:** N/A
**Current behavior:** No tests exist.
**Suggested change:** At minimum:
- Unit test for trend detection logic (`venice.ts:57-62`)
- Unit test for category analysis grouping (`index.ts:148-163`)
- Integration test mocking Venice API responses
**Rationale:** Judges (especially AI judges) may check for test coverage. Even 2-3 tests show engineering discipline.
**Priority:** LOW

---

## Suggestion: Add structured logging with log levels

**File:** `src/index.ts`
**Lines:** 22-31 (`log` function)
**Current behavior:** All log entries have the same structure. No distinction between info, warning, and error levels.
**Suggested change:** Add a `level` field to `LogEntry`:
```typescript
interface LogEntry {
  timestamp: string
  level: 'info' | 'warn' | 'error'
  step: string
  project?: string
  data?: unknown
  error?: string
}
```
**Rationale:** Makes the execution log more parseable for downstream analysis. Minor improvement.
**Priority:** LOW
