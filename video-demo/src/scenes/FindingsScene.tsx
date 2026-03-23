import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { MetricCard } from "../components/MetricCard";

export const FindingsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerEntrance = spring({ frame, fps, config: { damping: 200 } });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 120px",
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 800,
          color: "#ffffff",
          fontFamily: "Inter, sans-serif",
          marginBottom: 60,
          opacity: headerEntrance,
        }}
      >
        Portfolio-Level Findings
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
          width: "100%",
          maxWidth: 900,
        }}
      >
        <MetricCard
          value={2377.2}
          label="Total ETH Tracked"
          delay={10}
          color="#10b981"
          suffix=" ETH"
          decimals={1}
        />
        <MetricCard
          value={45}
          label="Concentration Risk"
          delay={20}
          color="#f59e0b"
          suffix="%"
        />
        <MetricCard
          value={60}
          label="Decay Correlation"
          delay={30}
          color="#ef4444"
          suffix="%"
        />
        <MetricCard
          value={7.5}
          label="Avg Portfolio Score"
          delay={40}
          color="#3b82f6"
          decimals={1}
        />
      </div>

      <div
        style={{
          marginTop: 40,
          fontSize: 18,
          color: "rgba(255,255,255,0.35)",
          fontFamily: "Inter, sans-serif",
          textAlign: "center",
          maxWidth: 700,
          lineHeight: 1.5,
          opacity: interpolate(frame, [3.5 * fps, 4.3 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        None of this was visible before the agent ran. Human reviewers evaluate
        one project at a time — portfolio patterns only emerge at scale.
      </div>
    </div>
  );
};
