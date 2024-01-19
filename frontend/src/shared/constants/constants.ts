import { config } from "../config/environment.config";

export const baseURL = "http://ethdev.online:3002";
export const rpcUrl = `https://sepolia.infura.io/v3/${config.INFURA_API_KEY}`;
export const gameLogicAddress = "0x98c86DFB5f548b41513ac65243592A7A6B554940";
export const gameRegistryAddress = "0x51b51050114f33D0B6c96153800fE7aE0dB3A0F3";
export const shipAddress = "0x398Ff2d0701da78F3B9037BC45F385f14c5b7Da7";

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
