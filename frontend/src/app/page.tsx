"use client";

import { KeyboardControlsEntry } from "@react-three/drei";
import { Sepolia } from "@thirdweb-dev/chains";
import { embeddedWallet, ThirdwebProvider } from "@thirdweb-dev/react";
import { ConnectKitProvider } from "connectkit";
import { useMemo } from "react";
import { WagmiConfig } from "wagmi";

import { GameEntryPoint } from "../game-assets/game-entry-point";
import { GuiOverlay } from "../gui";
import { config } from "../shared/config/environment.config";
import { wagmiConfig } from "../shared/config/wagmi.config";
import { Controls } from "../shared/constants";

export default function Home() {
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
      activeChain={Sepolia}
      clientId={config.THIRD_WEB_API}
      supportedWallets={[embeddedWallet()]}
    >
      <WagmiConfig config={wagmiConfig}>
        <ConnectKitProvider>
          <div className="relative">
            <GuiOverlay map={map} />
            <GameEntryPoint map={map} />
          </div>
        </ConnectKitProvider>
      </WagmiConfig>
    </ThirdwebProvider>
  );
}
