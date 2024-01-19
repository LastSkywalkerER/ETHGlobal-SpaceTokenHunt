import { Vector3 } from "three";
import { create } from "zustand";

import { ShipSpecs } from "../../types/game.types";
import { nk } from "../helpers/ethSpecsParse";

type Game = {
  shipSpecs?: ShipSpecs;

  loadShipSpecs: () => Promise<void>;
};

export const useShip = create<Game>()((set) => ({
  shipSpecs: undefined,

  loadShipSpecs: async () => {
    const data = {
      MOVE_SPEED: 1000,
      MOVE_ANGLE_SPEED: 5000,
      SHIP_MASS: 1000,
      LINEAR_DAMPING: 50,
      ANGULAR_DAMPING: 150,
      FIRE_RATE: 38000,
      WEAPON_OFFSET: {
        x: 0,
        y: 100,
        z: -300,
      },
    };

    const parsedData = {
      ANGULAR_DAMPING: nk(data.ANGULAR_DAMPING),
      FIRE_RATE: nk(data.FIRE_RATE),
      LINEAR_DAMPING: nk(data.LINEAR_DAMPING),
      MOVE_ANGLE_SPEED: nk(data.MOVE_ANGLE_SPEED),
      MOVE_SPEED: nk(data.MOVE_SPEED),
      SHIP_MASS: nk(data.SHIP_MASS),
      WEAPON_OFFSET: new Vector3(
        nk(data.WEAPON_OFFSET.x),
        nk(data.WEAPON_OFFSET.y),
        nk(data.WEAPON_OFFSET.z),
      ),
    };

    set((state) => ({ ...state, shipSpecs: parsedData }));
  },
}));
