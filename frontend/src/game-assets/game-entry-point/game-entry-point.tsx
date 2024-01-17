"use client";

import css from "../../app/index.module.css";
import { KeyboardControls, KeyboardControlsEntry, Loader, PerformanceMonitor, SoftShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FC, Suspense, useState } from "react";
import { Physics } from "@react-three/rapier";
import { Experience } from "../experience";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

export interface GameProps {
  map: KeyboardControlsEntry<string>[];
  isPlaying: boolean;
}

export const GameEntryPoint: FC<GameProps> = ({ map, isPlaying }) => {
  const [downgradedPerformance, setDowngradedPerformance] = useState(false);

  return <KeyboardControls map={map}>
    <div className={css.scene}>
      <Loader />
      <Canvas
        shadows
        className={css.canvas}
        camera={{
          position: [0, 30, 0],
        }}
        dpr={[1, 1.5]} // optimization to increase performance on retina/4k devices
      >
        <SoftShadows size={42} />
        <PerformanceMonitor
          // Detect low performance devices
          onDecline={(fps) => {
            // setDowngradedPerformance(true);
          }}
        />

        {isPlaying && (
          <Suspense fallback={null}>
            <Physics gravity={[0, 0, 0]}>
              <Experience downgradedPerformance={downgradedPerformance} />
            </Physics>
          </Suspense>
        )}

        {!downgradedPerformance && (
          // disable the postprocessing on low-end devices
          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={1} intensity={1.5} mipmapBlur />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  </KeyboardControls>;
};