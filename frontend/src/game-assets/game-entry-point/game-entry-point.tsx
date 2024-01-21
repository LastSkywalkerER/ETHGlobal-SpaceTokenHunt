"use client";

import {
  KeyboardControls,
  KeyboardControlsEntry,
  Loader,
  PerformanceMonitor,
  SoftShadows,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Physics } from "@react-three/rapier";
import { useSigner } from "@thirdweb-dev/react";
import { FC, Suspense, useEffect, useState } from "react";

import css from "../../app/index.module.css";
import { useGame } from "../../shared/services/game/game.service";
import { Experience } from "../experience";

export interface GameProps {
  map: KeyboardControlsEntry<string>[];
}

export const GameEntryPoint: FC<GameProps> = ({ map }) => {
  const { isPlaying, init } = useGame();
  const signer = useSigner();
  const [downgradedPerformance] = useState(false);

  useEffect(() => {
    signer && init(signer);
  }, [signer]);

  return (
    <KeyboardControls map={map}>
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
            onDecline={() => {
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
    </KeyboardControls>
  );
};
