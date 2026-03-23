export type ProjectRanking = {
  rank: number;
  name: string;
  category: string;
  totalEthReceived: number;
  overall: number;
  trend: "growing" | "stable" | "declining";
};

export const RANKINGS: ProjectRanking[] = [
  { rank: 1, name: "Protocol Guild", category: "Core Infrastructure", totalEthReceived: 587.6, overall: 8.0, trend: "stable" },
  { rank: 2, name: "L2Beat", category: "Research & Analytics", totalEthReceived: 369.8, overall: 8.0, trend: "growing" },
  { rank: 3, name: "Gitcoin", category: "Funding Mechanisms", totalEthReceived: 508.3, overall: 7.8, trend: "stable" },
  { rank: 4, name: "Rotki", category: "Developer Tooling", totalEthReceived: 249.8, overall: 7.8, trend: "stable" },
  { rank: 5, name: "DappNode", category: "Core Infrastructure", totalEthReceived: 92.2, overall: 7.5, trend: "stable" },
  { rank: 6, name: "Ethereum Cat Herders", category: "Ecosystem Coordination", totalEthReceived: 141.5, overall: 7.5, trend: "stable" },
  { rank: 7, name: "Pairwise", category: "Funding Mechanisms", totalEthReceived: 43.8, overall: 7.5, trend: "growing" },
  { rank: 8, name: "Stereum", category: "Developer Tooling", totalEthReceived: 190.4, overall: 7.0, trend: "stable" },
  { rank: 9, name: "BrightID", category: "Identity & Privacy", totalEthReceived: 130.1, overall: 6.5, trend: "declining" },
  { rank: 10, name: "clr.fund", category: "Funding Mechanisms", totalEthReceived: 29.4, overall: 6.0, trend: "declining" },
];

export const METRICS = {
  totalEth: 2377.2,
  projectsAnalyzed: 10,
  avgScore: 7.5,
  concentrationRisk: 45,
  decayCorrelation: 60,
  executionTime: 100,
};
