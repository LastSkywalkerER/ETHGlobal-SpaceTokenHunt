import { Contract, Signer } from "ethers";
import { Vector3 } from "three";
import { formatUnits } from "viem";
import { erc20ABI } from "wagmi";
import { create } from "zustand";

import { BulletData } from "../../../types/game.types";
import { Users } from "../../api/Users";
import { asteroids } from "../../constants";
import { BulletActions, BulletColors } from "../../constants/constants";
import { bulletNameToAction } from "./hitActions";

type Game = {
  isPlaying: boolean;
  position: Vector3;
  bullets: number;
  bulletColor: BulletColors;
  borrowRepayPercentage: number;
  usedBullets: Record<string, BulletData>;
  ethers: { id: number; position: Vector3 }[];
  wreckedEthers: number;

  init: (signer: Signer) => Promise<void>;
  buyBullets: (signer: Signer, amount: number) => Promise<void>;
  onShoot: (bullet: BulletData) => void;
  onHit: (
    signer: Signer,
    data: {
      hitPosition: Vector3;
      etherId: number;
      bulletId: number;
      name: string;
      address: string;
      action: BulletActions;
    },
  ) => Promise<void>;
  loadGameData: (signer: Signer) => Promise<void>;
  setBulletColor: (color: BulletColors) => void;

  incBRP: () => void;
  decBRP: () => void;

  setIsPlaying: (isPlaying: boolean) => void;
};

export const useGame = create<Game>()((set, get) => ({
  isPlaying: false,
  bullets: 0,
  usedBullets: {},
  bulletColor: BulletColors.Purple,
  borrowRepayPercentage: 0,
  ethers: [],
  position: new Vector3(0, 0, 0),
  wreckedEthers: 0,

  setIsPlaying: (isPlaying: boolean) => {
    set((state) => ({
      ...state,
      isPlaying,
    }));
  },

  init: async (signer) => {
    const generatedEthers = asteroids.map(([x, y, z]) => new Vector3(x, y, z));
    const ethers = generatedEthers.map((position, index) => ({
      id: index,
      position,
    }));

    const { message } = await Users.authLogin(await signer.getAddress());

    const signature = await signer.signMessage(message);

    await Users.verifyMessage({ address: await signer.getAddress(), signature });

    await Users.getUser();

    set((state) => ({
      ...state,
      ethers,
    }));
  },
  loadGameData: async () => {
    const generatedEthers = asteroids.map(([x, y, z]) => new Vector3(x, y, z));
    const ethers = generatedEthers.map((position, index) => ({
      id: index,
      position,
    }));

    set((state) => ({
      ...state,
      ethers,
    }));
  },
  buyBullets: async () => {},
  onShoot: (bullet: BulletData) => {
    set((state) => ({
      ...state,
      usedBullets: { ...state.usedBullets, [bullet.id]: bullet },
    }));
  },
  onHit: async (signer, { etherId, action, address }) => {
    const { borrowRepayPercentage } = get();

    let amount = 0;

    if (action === BulletActions.Supply) {
      const tokenContract = new Contract(address, erc20ABI, signer);
      const decimals = await tokenContract.decimals();
      amount = await tokenContract.balanceOf(await signer.getAddress());
      amount = (+formatUnits(amount as unknown as bigint, decimals) * borrowRepayPercentage) / 100;
    }

    await bulletNameToAction[action]({
      signer,
      amount: String(amount),
      tokenAddress: address,
    });

    set((state) => ({
      ...state,
      ethers: state.ethers.filter(({ id }) => id !== etherId),
    }));
  },

  setBulletColor: (color: BulletColors) => {
    set((state) => ({ ...state, bulletColor: color }));
  },

  incBRP: () => {
    set((state) => ({
      ...state,
      borrowRepayPercentage:
        state.borrowRepayPercentage < 100
          ? state.borrowRepayPercentage + 5
          : state.borrowRepayPercentage,
    }));
  },
  decBRP: () => {
    set((state) => ({
      ...state,
      borrowRepayPercentage:
        state.borrowRepayPercentage > 0
          ? state.borrowRepayPercentage - 5
          : state.borrowRepayPercentage,
    }));
  },
}));
