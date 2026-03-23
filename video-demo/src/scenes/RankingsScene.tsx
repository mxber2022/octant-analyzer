import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { AnimatedBar } from "../components/AnimatedBar";
import { RANKINGS } from "../data/report";

export const RankingsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerEntrance = spring({ frame, fps, config: { damping: 200 } });
  const maxScore = 10;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 120px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 40,
          opacity: headerEntrance,
        }}
      >
        <div
          style={{
            fontSize: 44,
            fontWeight: 800,
            color: "#ffffff",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Project Rankings
        </div>
        <div
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.4)",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Scored across Impact · Sustainability · Community · Funding Alignment
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {RANKINGS.map((project, i) => (
          <AnimatedBar
            key={project.name}
            name={project.name}
            score={project.overall}
            maxScore={maxScore}
            trend={project.trend}
            rank={project.rank}
            delay={i * 6 + 10}
          />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: 24,
          marginTop: 30,
          opacity: interpolate(frame, [3 * fps, 3.8 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {[
          { color: "#10b981", label: "Stable / Growing" },
          { color: "#f59e0b", label: "Declining" },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 4,
                background: color,
              }}
            />
            <div
              style={{
                fontSize: 16,
                color: "rgba(255,255,255,0.5)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
