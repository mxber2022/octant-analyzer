import React from "react";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Background } from "./components/Background";
import { IntroScene } from "./scenes/IntroScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { PipelineScene } from "./scenes/PipelineScene";
import { RankingsScene } from "./scenes/RankingsScene";
import { FindingsScene } from "./scenes/FindingsScene";
import { SignalsScene } from "./scenes/SignalsScene";
import { OutroScene } from "./scenes/OutroScene";

const TRANSITION = linearTiming({ durationInFrames: 15 });

export const OctantDemo: React.FC = () => {
  return (
    <>
      <Background />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={150}>
          <IntroScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={TRANSITION}
        />
        <TransitionSeries.Sequence durationInFrames={210}>
          <ProblemScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={TRANSITION}
        />
        <TransitionSeries.Sequence durationInFrames={360}>
          <PipelineScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={TRANSITION}
        />
        <TransitionSeries.Sequence durationInFrames={420}>
          <RankingsScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={TRANSITION}
        />
        <TransitionSeries.Sequence durationInFrames={300}>
          <FindingsScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={TRANSITION}
        />
        <TransitionSeries.Sequence durationInFrames={180}>
          <SignalsScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={TRANSITION}
        />
        <TransitionSeries.Sequence durationInFrames={180}>
          <OutroScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};
