import { TransactionError } from "@thirdweb-dev/react";
import { Contract, Signer } from "ethers";
import { Vector3 } from "three";
import { formatUnits } from "viem";
import { erc20ABI } from "wagmi";
import { create } from "zustand";

import { TokenData, Tokens } from "../../api/Tokens";
import { UserData, Users } from "../../api/Users";
import { BulletActions, BulletColors, gameOverHealthFactor } from "../../constants/constants";
import { useModal } from "../modal";
import { bulletNameToAction } from "./hitActions";

type Game = {
  isPlaying: boolean;
  bulletColor: BulletColors;
  borrowRepayPercentage: number;
  asteroids: (TokenData & { id: number })[];
  user: UserData | null;

  init: (signer: Signer) => Promise<void>;
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
  loadGameData: () => Promise<void>;
  setBulletColor: (color: BulletColors) => void;

  incBRP: () => void;
  decBRP: () => void;

  setIsPlaying: (isPlaying: boolean) => void;
};

const percentageStep = 5;

export const useGame = create<Game>()((set, get) => ({
  isPlaying: false,
  bullets: 0,
  usedBullets: {},
  bulletColor: BulletColors.Purple,
  borrowRepayPercentage: percentageStep,
  asteroids: [],
  wreckedEthers: 0,
  user: null,

  setIsPlaying: (isPlaying) => {
    set((state) => ({
      ...state,
      isPlaying,
    }));
  },

  init: async (signer) => {
    const { message } = await Users.authLogin(await signer.getAddress());

    const signature = await signer.signMessage(message);

    await Users.verifyMessage({ address: await signer.getAddress(), signature });

    const user = await Users.getUser();

    set((state) => ({
      ...state,
      user,
    }));
  },
  loadGameData: async () => {
    const data = await Tokens.getGameTokens();

    const asteroids = data.map(({ position, ...rest }, index) => ({
      ...rest,
      position: new Vector3(position.x, position.y, position.z),
      id: index,
    }));

    set((state) => ({
      ...state,
      asteroids,
    }));
  },
  onHit: async (signer, { etherId, action, address }) => {
    try {
      const { borrowRepayPercentage } = get();

      let amount = 1;

      if (action === BulletActions.Supply) {
        const tokenContract = new Contract(address, erc20ABI, signer);
        const decimals = await tokenContract.decimals();
        amount = await tokenContract.balanceOf(await signer.getAddress());
        amount =
          (+formatUnits(amount as unknown as bigint, decimals) * borrowRepayPercentage) / 100;
      } else {
        // TODO: Get amount according to available or dept field
        amount = amount * borrowRepayPercentage;
      }

      await bulletNameToAction[action]({
        signer,
        amount: String(amount),
        tokenAddress: address,
      });

      set((state) => ({
        ...state,
        asteroids: state.asteroids.filter(({ id }) => id !== etherId),
      }));
    } catch (error) {
      useModal.getState().setError(error as TransactionError);
    }

    setTimeout(async () => {
      try {
        const user = await Users.getUser();

        if (user.healthFactor < gameOverHealthFactor) throw Error("Game over");

        set((state) => ({
          ...state,
          user,
        }));
      } catch (error) {
        useModal.getState().setError(error as Error);
      }
    }, 5000);
  },

  setBulletColor: (color) => {
    set((state) => ({ ...state, bulletColor: color }));
  },

  incBRP: () => {
    set((state) => ({
      ...state,
      borrowRepayPercentage:
        state.borrowRepayPercentage < 100
          ? state.borrowRepayPercentage + percentageStep
          : state.borrowRepayPercentage,
    }));
  },
  decBRP: () => {
    set((state) => ({
      ...state,
      borrowRepayPercentage:
        state.borrowRepayPercentage > 0
          ? state.borrowRepayPercentage - percentageStep
          : state.borrowRepayPercentage,
    }));
  },
}));
