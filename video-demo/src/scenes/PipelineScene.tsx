import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

const PHASES = [
  { label: "COLLECT", desc: "GitHub API\n10 projects", icon: "{ }", color: "#3b82f6" },
  { label: "ANALYZE", desc: "Venice AI\n4D scoring", icon: "◈", color: "#8b5cf6" },
  { label: "AGGREGATE", desc: "Portfolio\npatterns", icon: "▤", color: "#10b981" },
  { label: "RANK", desc: "Allocation\nsignals", icon: "★", color: "#f59e0b" },
];

export const PipelineScene: React.FC = () => {
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
        padding: "0 100px",
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 800,
          color: "#ffffff",
          fontFamily: "Inter, sans-serif",
          marginBottom: 80,
          opacity: headerEntrance,
        }}
      >
        4-Phase Agent Pipeline
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
        {PHASES.map((phase, i) => {
          const delay = i * 20 + 10;
          const entrance = spring({
            frame,
            fps,
            delay,
            config: { damping: 15, stiffness: 120 },
          });

          const scale = interpolate(entrance, [0, 1], [0.5, 1]);
          const opacity = interpolate(entrance, [0, 0.3], [0, 1], {
            extrapolateRight: "clamp",
          });

          const arrowDelay = delay + 15;
          const arrowEntrance = spring({
            frame,
            fps,
            delay: arrowDelay,
            config: { damping: 200 },
          });

          return (
            <React.Fragment key={i}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                  transform: `scale(${scale})`,
                  opacity,
                }}
              >
                <div
                  style={{
                    width: 160,
                    height: 160,
                    borderRadius: 20,
                    background: `${phase.color}15`,
                    border: `2px solid ${phase.color}55`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      fontSize: 40,
                      color: phase.color,
                    }}
                  >
                    {phase.icon}
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: phase.color,
                      fontFamily: "Inter, sans-serif",
                      letterSpacing: 2,
                    }}
                  >
                    {phase.label}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 15,
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "Inter, sans-serif",
                    textAlign: "center",
                    whiteSpace: "pre-line",
                    lineHeight: 1.4,
                  }}
                >
                  {phase.desc}
                </div>
              </div>

              {i < PHASES.length - 1 && (
                <div
                  style={{
                    fontSize: 36,
                    color: "rgba(255,255,255,0.3)",
                    margin: "0 20px",
                    marginBottom: 40,
                    opacity: arrowEntrance,
                    transform: `translateX(${interpolate(arrowEntrance, [0, 1], [-10, 0])}px)`,
                  }}
                >
                  →
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 60,
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: interpolate(frame, [4 * fps, 4.8 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#10b981",
            boxShadow: "0 0 10px #10b981",
          }}
        />
        <div
          style={{
            fontSize: 22,
            color: "#10b981",
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
          }}
        >
          Total execution: ~100 seconds
        </div>
      </div>
    </div>
  );
};
