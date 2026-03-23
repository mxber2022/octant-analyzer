import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  const gridOpacity = interpolate(frame, [0, 30], [0, 0.06], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(180deg, #0a0a0f 0%, #111827 50%, #0a0a0f 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: gridOpacity,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: "linear-gradient(90deg, #10b981, #34d399, #10b981)",
        }}
      />
    </AbsoluteFill>
  );
};
