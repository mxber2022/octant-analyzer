import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

type AnimatedBarProps = {
  name: string;
  score: number;
  maxScore: number;
  trend: "growing" | "stable" | "declining";
  rank: number;
  delay: number;
};

const TREND_COLORS = {
  growing: "#34d399",
  stable: "#10b981",
  declining: "#f59e0b",
};

export const AnimatedBar: React.FC<AnimatedBarProps> = ({
  name,
  score,
  maxScore,
  trend,
  rank,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    delay,
    config: { damping: 200 },
  });

  const barWidth = interpolate(entrance, [0, 1], [0, (score / maxScore) * 100]);
  const labelOpacity = interpolate(entrance, [0, 0.6, 1], [0, 0, 1]);
  const slideX = interpolate(entrance, [0, 1], [-30, 0]);

  const color = TREND_COLORS[trend];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        height: 44,
        transform: `translateX(${slideX}px)`,
        opacity: interpolate(entrance, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
      }}
    >
      <div
        style={{
          width: 30,
          fontSize: 16,
          color: "rgba(255,255,255,0.4)",
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
          textAlign: "right",
        }}
      >
        #{rank}
      </div>
      <div
        style={{
          width: 200,
          fontSize: 18,
          color: "rgba(255,255,255,0.9)",
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
          textAlign: "right",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </div>
      <div
        style={{
          flex: 1,
          height: 28,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 6,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${barWidth}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${color}cc, ${color})`,
            borderRadius: 6,
            boxShadow: `0 0 20px ${color}33`,
          }}
        />
      </div>
      <div
        style={{
          width: 50,
          fontSize: 20,
          fontWeight: 700,
          color,
          fontFamily: "Inter, sans-serif",
          opacity: labelOpacity,
        }}
      >
        {score.toFixed(1)}
      </div>
    </div>
  );
};
