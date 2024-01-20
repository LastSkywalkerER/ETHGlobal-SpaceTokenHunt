import { getDefaultConfig } from "connectkit";
import { createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";

import { config } from "./environment.config";

export const wagmiConfig = createConfig(
  getDefaultConfig({
    // Required API Keys
    infuraId: config.INFURA_API_KEY,
    walletConnectProjectId: config.WC_PROJECT_ID!,

    // Required
    appName: "Space ",

    // Optional
    appDescription: "Aave learning platform",
    appUrl: "https://space-token-hunt.vercel.app/", // your app's url
    appIcon: "https://ipfs.io/ipfs/QmYkMf37Dgis8NecSzWEqMec4U4hTRQ7KtSLvNpmnoj1PL", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    chains: [sepolia],
  }),
);
