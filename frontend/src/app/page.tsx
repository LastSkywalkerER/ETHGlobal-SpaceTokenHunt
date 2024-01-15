"use client";

import { Canvas } from "@react-three/fiber";
import css from "./index.module.css";
import {
  KeyboardControls,
  KeyboardControlsEntry,
  Loader,
  PerformanceMonitor,
  SoftShadows,
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Suspense, useMemo, useState } from "react";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { ThirdwebProvider, embeddedWallet } from "@thirdweb-dev/react";
import { ArbitrumSepolia } from "@thirdweb-dev/chains";
import { Controls } from "@/shared/constants";
import { Gui } from "@/gui";
import { config } from "@/shared/config/environment.config";
import { Experience } from "@/game-assets/experience";

export default function Home() {
  const [downgradedPerformance, setDowngradedPerformance] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.Forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.Back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.Left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.Right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.Fire, keys: ["Space"] },
    ],
    [],
  );

  return (
    <ThirdwebProvider
      activeChain={ArbitrumSepolia}
      clientId={config.THIRD_WEB_API}
      supportedWallets={[embeddedWallet()]}
    >
      <div className="relative">
        <Gui
          map={map}
          className="absolute z-10"
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
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
        </KeyboardControls>
      </div>
    </ThirdwebProvider>
  );
}
