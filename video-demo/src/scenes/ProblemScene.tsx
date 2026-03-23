import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

const PROBLEMS = [
  "Self-reported proposals — projects grade themselves",
  "Manual GitHub spot-checks — one repo at a time",
  "Personal familiarity bias — who do you know?",
  "No reproducible dataset — zero audit trail",
];

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

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
          transform: `translateY(${interpolate(headerEntrance, [0, 1], [20, 0])}px)`,
        }}
      >
        How Octant Evaluates Projects Today
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
        {PROBLEMS.map((problem, i) => {
          const delay = (i + 1) * 15;
          const entrance = spring({
            frame,
            fps,
            delay,
            config: { damping: 200 },
          });

          const slideX = interpolate(entrance, [0, 1], [-60, 0]);
          const opacity = interpolate(entrance, [0, 0.3], [0, 1], {
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                transform: `translateX(${slideX}px)`,
                opacity,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "rgba(239,68,68,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  color: "#ef4444",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                ✗
              </div>
              <div
                style={{
                  fontSize: 26,
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                }}
              >
                {problem}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 50,
          fontSize: 22,
          color: "rgba(255,255,255,0.4)",
          fontFamily: "Inter, sans-serif",
          opacity: interpolate(frame, [5 * fps, 5.8 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Result: decisions based on vibes, not evidence
      </div>
    </div>
  );
};
