import { providers } from "ethers";

import { config } from "../config/environment.config";

export const baseURL = config.BASE_URL;

// for Sepolia
export const rpcUrl = `https://sepolia.infura.io/v3/${config.INFURA_API_KEY}`;

export const provider = new providers.JsonRpcProvider(rpcUrl);
export const poolAddress = "0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951";
export const wethGatewayAddress = "0x387d311e47e80b498169e6fb51d3193167d89f7d";
export const gameOverHealthFactor = 2;
export const minBalanceForGame = 0.1;

export enum BulletColors {
  Green = "#86ff00",
  Blue = "#00ffb5",
  Orange = "#ffaa00",
  Purple = "#c800ff",
}

export enum BulletActions {
  Borrow = "Borrow",
  Repay = "Repay",
  Withdraw = "Withdraw",
  Supply = "Supply",
}

export const colorToAction: Record<BulletColors, BulletActions> = {
  "#c800ff": BulletActions.Supply,
  "#ffaa00": BulletActions.Withdraw,
  "#00ffb5": BulletActions.Borrow,
  "#86ff00": BulletActions.Repay,
};
