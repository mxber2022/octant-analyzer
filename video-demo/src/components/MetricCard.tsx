import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

type MetricCardProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay: number;
  color?: string;
  decimals?: number;
};

export const MetricCard: React.FC<MetricCardProps> = ({
  value,
  suffix = "",
  prefix = "",
  label,
  delay,
  color = "#10b981",
  decimals = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    delay,
    config: { damping: 12, stiffness: 120 },
  });

  const scale = interpolate(entrance, [0, 1], [0.7, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  const countProgress = interpolate(
    frame,
    [delay, delay + 40],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const displayValue = (value * countProgress).toFixed(decimals);

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 16,
        padding: "36px 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          fontSize: 64,
          fontWeight: 800,
          color,
          fontFamily: "Inter, sans-serif",
          lineHeight: 1,
        }}
      >
        {prefix}{displayValue}{suffix}
      </div>
      <div
        style={{
          fontSize: 20,
          color: "rgba(255,255,255,0.6)",
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          textAlign: "center",
        }}
      >
        {label}
      </div>
    </div>
  );
};
