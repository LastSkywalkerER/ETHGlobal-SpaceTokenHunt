import { create } from "zustand";
import { Vector3 } from "three";
import { asteroids } from "../constants";
import { Signer } from "ethers";
import { BulletData } from "../../types/game.types";
import { GameLogic } from "../contracts/GameLogic";

type Game = {
  position: Vector3;
  bullets: number;
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
};

export const useGame = create<Game>()((set, get) => ({
  bullets: 0,
  usedBullets: {},
  ethers: [],
  position: new Vector3(0, 0, 0),
  wreckedEthers: 0,

  gameLogic: new GameLogic(),

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
}));
