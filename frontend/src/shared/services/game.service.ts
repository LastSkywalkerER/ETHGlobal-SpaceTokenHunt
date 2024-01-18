import { create } from "zustand";
import { Vector3 } from "three";
import { asteroids } from "../constants";
import { Signer } from "ethers";
import { BulletData } from "../../types/game.types";
import { GameLogic } from "../contracts/GameLogic";
import { BulletColors } from "../constants/constants";

type Game = {
  isPlaying: boolean;
  position: Vector3;
  bullets: number;
  bulletColor: BulletColors;
  borrowRepayPercentage: number;
  usedBullets: Record<string, BulletData>;
  ethers: { id: number; position: Vector3 }[];
  wreckedEthers: number;

  gameLogic: GameLogic;

  init: (signer: Signer) => Promise<void>;
  buyBullets: (signer: Signer, amount: number) => Promise<void>;
  onShoot: (bullet: BulletData) => void;
  onHit: (
    signer: Signer,
    data: { hitPosition: Vector3; etherId: number; bulletId: number },
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
  bulletColor: BulletColors.Green,
  borrowRepayPercentage: 0,
  ethers: [],
  position: new Vector3(0, 0, 0),
  wreckedEthers: 0,

  gameLogic: new GameLogic(),

  setIsPlaying: (isPlaying: boolean) => {
    set((state) => ({
      ...state,
      isPlaying,
    }));
  },

  init: async (signer: Signer) => {
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
  loadGameData: async (signer: Signer) => {
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
  buyBullets: async (signer: Signer, amount: number) => {

  },
  onShoot: (bullet: BulletData) => {
    set((state) => ({
      ...state,
      usedBullets: { ...state.usedBullets, [bullet.id]: bullet },
    }));
  },
  onHit: async (
    signer: Signer,
    { bulletId, etherId, hitPosition }: { hitPosition: Vector3; etherId: number; bulletId: number },
  ) => {
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
      borrowRepayPercentage: state.borrowRepayPercentage < 100 ? state.borrowRepayPercentage + 1 : state.borrowRepayPercentage,
    }));
  },
  decBRP: () => {
    set((state) => ({
      ...state,
      borrowRepayPercentage: state.borrowRepayPercentage > 0 ? state.borrowRepayPercentage - 1 : state.borrowRepayPercentage,
    }));
  },
}));
