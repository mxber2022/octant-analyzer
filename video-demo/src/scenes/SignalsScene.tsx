import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

const SIGNALS = [
  {
    signal: "INCREASE",
    rule: "Score ≥ 7 + growing trend",
    example: "L2Beat, Pairwise",
    color: "#10b981",
    bg: "rgba(16,185,129,0.12)",
  },
  {
    signal: "MAINTAIN",
    rule: "Score 5-6 + stable trend",
    example: "DappNode, Stereum",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
  },
  {
    signal: "FLAG",
    rule: "Score < 5 or declining trend",
    example: "BrightID, clr.fund",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.12)",
  },
];

export const SignalsScene: React.FC = () => {
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
        padding: "0 140px",
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 800,
          color: "#ffffff",
          fontFamily: "Inter, sans-serif",
          marginBottom: 20,
          opacity: headerEntrance,
        }}
      >
        Allocation Signals
      </div>
      <div
        style={{
          fontSize: 20,
          color: "rgba(255,255,255,0.4)",
          fontFamily: "Inter, sans-serif",
          marginBottom: 50,
          opacity: headerEntrance,
        }}
      >
        Triage for allocators — where to focus attention
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28, width: "100%" }}>
        {SIGNALS.map((s, i) => {
          const delay = (i + 1) * 15;
          const entrance = spring({
            frame,
            fps,
            delay,
            config: { damping: 15, stiffness: 100 },
          });

          const scale = interpolate(entrance, [0, 1], [0.85, 1]);
          const slideX = interpolate(entrance, [0, 1], [80, 0]);

          return (
            <div
              key={s.signal}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                padding: "24px 32px",
                background: s.bg,
                border: `1px solid ${s.color}33`,
                borderRadius: 16,
                transform: `scale(${scale}) translateX(${slideX}px)`,
                opacity: interpolate(entrance, [0, 0.2], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: s.color,
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: 2,
                  width: 160,
                }}
              >
                {s.signal}
              </div>
              <div
                style={{
                  flex: 1,
                  fontSize: 20,
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {s.rule}
              </div>
              <div
                style={{
                  fontSize: 18,
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "Inter, sans-serif",
                  fontStyle: "italic",
                }}
              >
                e.g. {s.example}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
