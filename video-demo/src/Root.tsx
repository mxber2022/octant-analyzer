import React from "react";
import { Composition } from "remotion";
import { OctantDemo } from "./OctantDemo";

// Scene durations: 150 + 210 + 360 + 420 + 300 + 180 + 180 = 1800
// Transitions: 6 × 15 = 90
// Total: 1800 - 90 = 1710 frames @ 30fps = 57 seconds

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="OctantDemo"
      component={OctantDemo}
      durationInFrames={1710}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
