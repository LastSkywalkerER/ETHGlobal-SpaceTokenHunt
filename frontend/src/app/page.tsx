"use client";

import { KeyboardControlsEntry } from "@react-three/drei";
import { useMemo, useState } from "react";
import { embeddedWallet, ThirdwebProvider } from "@thirdweb-dev/react";
import { ArbitrumSepolia } from "@thirdweb-dev/chains";
import { Controls } from "../shared/constants";
import { Gui } from "../gui";
import { config } from "../shared/config/environment.config";
import { GameEntryPoint } from "../game-assets/game-entry-point";
import { WagmiConfig } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import { wagmiConfig } from "../shared/config/wagmi.config";

export default function Home() {
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
      <WagmiConfig config={wagmiConfig}>
        <ConnectKitProvider>
          <div className="relative">
            <Gui
              map={map}
              className="absolute z-10"
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
            <GameEntryPoint map={map} isPlaying={isPlaying} />
          </div>
        </ConnectKitProvider>
      </WagmiConfig>
    </ThirdwebProvider>
  );
}
