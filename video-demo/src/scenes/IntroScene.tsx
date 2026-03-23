import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
} from "remotion";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const titleOpacity = interpolate(titleScale, [0, 1], [0, 1]);

  const subtitleProgress = interpolate(
    frame,
    [1 * fps, 2.5 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const subtitle = "Autoresearch for Public Goods Grants";
  const subtitleText = subtitle.slice(0, Math.floor(subtitle.length * subtitleProgress));

  const statsOpacity = interpolate(
    frame,
    [3 * fps, 3.8 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const statsY = interpolate(
    frame,
    [3 * fps, 3.8 * fps],
    [20, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
      }}
    >
      <div
        style={{
          transform: `scale(${titleScale})`,
          opacity: titleOpacity,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "linear-gradient(135deg, #10b981, #34d399)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: 900,
            color: "#0a0a0f",
            fontFamily: "Inter, sans-serif",
          }}
        >
          OI
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: "#ffffff",
            fontFamily: "Inter, sans-serif",
            letterSpacing: -2,
          }}
        >
          OctantInsight
        </div>
      </div>

      <div
        style={{
          fontSize: 28,
          color: "#34d399",
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          height: 36,
          letterSpacing: 1,
        }}
      >
        {subtitleText}
        <span
          style={{
            opacity: Math.sin(frame * 0.15) > 0 ? 1 : 0,
            color: "#34d399",
          }}
        >
          |
        </span>
      </div>

      <div
        style={{
          opacity: statsOpacity,
          transform: `translateY(${statsY}px)`,
          display: "flex",
          gap: 32,
          marginTop: 20,
        }}
      >
        {["10 projects", "2,377 ETH", "~100 seconds"].map((stat, i) => (
          <div
            key={i}
            style={{
              fontSize: 20,
              color: "rgba(255,255,255,0.5)",
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              padding: "8px 20px",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
            }}
          >
            {stat}
          </div>
        ))}
      </div>
    </div>
  );
};
