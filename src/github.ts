// Fetch real GitHub metrics for Octant-funded projects
// Uses GitHub public API — no auth required for public repos

export interface GitHubMetrics {
  owner: string
  repo: string
  stars: number
  forks: number
  openIssues: number
  contributors: number
  commitsLast90Days: number
  weeklyCommitAvg: number
  lastCommitAt: string
  language: string
  createdAt: string
  fetchedAt: string
  error?: string
}

async function fetchJSON(url: string): Promise<unknown> {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  }
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${url}`)
  return res.json()
}

export async function fetchGitHubMetrics(owner: string, repo: string): Promise<GitHubMetrics> {
  const base: Partial<GitHubMetrics> = { owner, repo, fetchedAt: new Date().toISOString() }

  try {
    // Repo metadata
    const repoData = await fetchJSON(`https://api.github.com/repos/${owner}/${repo}`) as Record<string, unknown>

    // Commit activity (last 52 weeks, each entry = 1 week)
    let commitsLast90Days = 0
    let weeklyCommitAvg = 0
    try {
      const activity = await fetchJSON(`https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`) as Array<{ total: number }>
      if (Array.isArray(activity) && activity.length > 0) {
        const last13Weeks = activity.slice(-13)
        commitsLast90Days = last13Weeks.reduce((sum, w) => sum + (w.total || 0), 0)
        weeklyCommitAvg = Math.round((commitsLast90Days / 13) * 10) / 10
      }
    } catch {
      // GitHub stats can return 202 on first request — use default 0
    }

    // Contributors count
    let contributors = 0
    try {
      const contribData = await fetchJSON(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=1&anon=false`) as unknown[]
      // GitHub returns Link header with last page = contributor count
      // We approximate from the array length since we only fetched 1
      const fullContribs = await fetchJSON(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100`) as unknown[]
      contributors = Array.isArray(fullContribs) ? fullContribs.length : 0
    } catch {
      contributors = 0
    }

    return {
      ...base,
      stars: (repoData.stargazers_count as number) || 0,
      forks: (repoData.forks_count as number) || 0,
      openIssues: (repoData.open_issues_count as number) || 0,
      contributors,
      commitsLast90Days,
      weeklyCommitAvg,
      lastCommitAt: (repoData.pushed_at as string) || '',
      language: (repoData.language as string) || 'Unknown',
      createdAt: (repoData.created_at as string) || '',
      fetchedAt: new Date().toISOString()
    } as GitHubMetrics

  } catch (err) {
    return {
      ...base,
      stars: 0, forks: 0, openIssues: 0, contributors: 0,
      commitsLast90Days: 0, weeklyCommitAvg: 0,
      lastCommitAt: '', language: 'Unknown', createdAt: '',
      fetchedAt: new Date().toISOString(),
      error: String(err)
    } as GitHubMetrics
  }
}
