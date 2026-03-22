// Venice AI — private analysis of Octant project data
// No data retention — funding patterns stay private

import type { GitHubMetrics } from './github.ts'
import type { OctantProject } from './projects.ts'

const VENICE_API = 'https://api.venice.ai/api/v1/chat/completions'
const MODEL = 'llama-3.3-70b'

async function veniceChat(systemPrompt: string, userContent: string): Promise<string> {
  const apiKey = process.env.VENICE_API_KEY
  if (!apiKey) throw new Error('VENICE_API_KEY not set')

  const res = await fetch(VENICE_API, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userContent }
      ],
      temperature: 0.2
    })
  })

  if (!res.ok) throw new Error(`Venice API ${res.status}`)
  const data = await res.json() as { choices: Array<{ message: { content: string } }> }
  return data.choices[0].message.content.trim()
}

export interface ProjectAnalysis {
  impactScore: number        // 1-10: value delivered relative to funding
  sustainabilityScore: number // 1-10: long-term health of project
  communityScore: number     // 1-10: genuine community engagement
  fundingAlignmentScore: number // 1-10: is funding level appropriate for impact?
  overallScore: number       // weighted average
  trend: 'growing' | 'stable' | 'declining'
  redFlags: string[]
  strengths: string[]
  insight: string            // key non-obvious insight
  recommendation: string     // for future funding decisions
}

export async function analyzeProject(
  project: OctantProject,
  github: GitHubMetrics
): Promise<ProjectAnalysis> {
  const totalEth = project.allocations.reduce((s, a) => s + a.ethReceived, 0)
  const epochCount = project.allocations.length
  const avgPerEpoch = totalEth / epochCount

  // Check allocation trend
  const allocs = project.allocations.map(a => a.ethReceived)
  const firstHalf = allocs.slice(0, Math.ceil(allocs.length / 2))
  const secondHalf = allocs.slice(Math.ceil(allocs.length / 2))
  const firstAvg = firstHalf.reduce((s, v) => s + v, 0) / firstHalf.length
  const secondAvg = secondHalf.reduce((s, v) => s + v, 0) / secondHalf.length
  const allocTrend = secondAvg > firstAvg * 1.1 ? 'growing' : secondAvg < firstAvg * 0.9 ? 'declining' : 'stable'

  const systemPrompt = `You are an expert analyst evaluating public goods projects funded by Octant.
Octant is a community funding platform backed by Golem Foundation's GLM staking rewards.
Your job is to assess whether projects deliver genuine value relative to their funding.
Return ONLY valid JSON with no markdown, no explanation outside the JSON.`

  const userContent = JSON.stringify({
    project: {
      name: project.name,
      description: project.description,
      category: project.category,
      website: project.website,
      totalEthReceived: totalEth,
      epochsParticipated: epochCount,
      avgEthPerEpoch: avgPerEpoch,
      allocationTrend: allocTrend,
      allocations: project.allocations
    },
    githubMetrics: {
      stars: github.stars,
      forks: github.forks,
      openIssues: github.openIssues,
      contributors: github.contributors,
      commitsLast90Days: github.commitsLast90Days,
      weeklyCommitAverage: github.weeklyCommitAvg,
      lastCommitAt: github.lastCommitAt,
      primaryLanguage: github.language
    },
    task: `Score this project across 4 dimensions (1-10 each). Identify red flags and strengths. Surface the single most non-obvious insight about this project's funding efficiency. Return JSON: { "impactScore": number, "sustainabilityScore": number, "communityScore": number, "fundingAlignmentScore": number, "overallScore": number, "trend": "growing"|"stable"|"declining", "redFlags": string[], "strengths": string[], "insight": string, "recommendation": string }`
  })

  const raw = await veniceChat(systemPrompt, userContent)

  // Parse JSON from Venice response
  const jsonMatch = raw.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error(`Venice returned non-JSON: ${raw.slice(0, 200)}`)

  const parsed = JSON.parse(jsonMatch[0]) as ProjectAnalysis
  return parsed
}

export interface AggregateInsights {
  topPattern: string
  underfundedCategory: string
  overfundedCategory: string
  engagementDecayProjects: string[]
  highImpactLowFunding: string[]
  fundingConcentrationRisk: string
  keyRecommendation: string
  systemicInsight: string
}

export async function analyzeAggregate(
  results: Array<{ project: OctantProject; analysis: ProjectAnalysis }>
): Promise<AggregateInsights> {
  const systemPrompt = `You are a senior public goods researcher analyzing patterns across Octant's entire funding portfolio.
Your job is to surface systemic patterns that individual project analysis cannot reveal.
Return ONLY valid JSON with no markdown.`

  const summary = results.map(r => ({
    name: r.project.name,
    category: r.project.category,
    totalEth: r.project.allocations.reduce((s, a) => s + a.ethReceived, 0),
    scores: {
      impact: r.analysis.impactScore,
      sustainability: r.analysis.sustainabilityScore,
      community: r.analysis.communityScore,
      fundingAlignment: r.analysis.fundingAlignmentScore,
      overall: r.analysis.overallScore
    },
    trend: r.analysis.trend,
    redFlagCount: r.analysis.redFlags.length
  }))

  const userContent = JSON.stringify({
    portfolioSummary: summary,
    totalProjects: results.length,
    totalEthDistributed: summary.reduce((s, p) => s + p.totalEth, 0),
    task: `Analyze this portfolio as a whole. Find: what category is systematically underfunded vs. impact? Which projects show engagement decay? What is the biggest systemic risk? Return JSON: { "topPattern": string, "underfundedCategory": string, "overfundedCategory": string, "engagementDecayProjects": string[], "highImpactLowFunding": string[], "fundingConcentrationRisk": string, "keyRecommendation": string, "systemicInsight": string }`
  })

  const raw = await veniceChat(systemPrompt, userContent)
  const jsonMatch = raw.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error(`Venice aggregate returned non-JSON`)

  return JSON.parse(jsonMatch[0]) as AggregateInsights
}
