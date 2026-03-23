import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoEntrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const textEntrance = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 200 },
  });

  const badgeEntrance = spring({
    frame,
    fps,
    delay: 30,
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
        gap: 32,
      }}
    >
      <div
        style={{
          transform: `scale(${logoEntrance})`,
          opacity: interpolate(logoEntrance, [0, 1], [0, 1]),
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: "linear-gradient(135deg, #10b981, #34d399)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 900,
            color: "#0a0a0f",
            fontFamily: "Inter, sans-serif",
          }}
        >
          OI
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#ffffff",
            fontFamily: "Inter, sans-serif",
            letterSpacing: -1,
          }}
        >
          OctantInsight
        </div>
      </div>

      <div
        style={{
          opacity: textEntrance,
          transform: `translateY(${interpolate(textEntrance, [0, 1], [15, 0])}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.6)",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Built by
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["@mxber2022", "@0xjitsu"].map((handle) => (
            <div
              key={handle}
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#34d399",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {handle}
            </div>
          ))}
        </div>
        <div
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.35)",
            fontFamily: "Inter, sans-serif",
            marginTop: 8,
          }}
        >
          github.com/mxber2022/octant-analyzer
        </div>
      </div>

      <div
        style={{
          opacity: badgeEntrance,
          marginTop: 20,
          padding: "12px 32px",
          background: "rgba(16,185,129,0.1)",
          border: "1px solid rgba(16,185,129,0.3)",
          borderRadius: 12,
          fontSize: 20,
          color: "#10b981",
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
        }}
      >
        Synthesis Hackathon 2026 · Octant Partner Track
      </div>
    </div>
  );
};
