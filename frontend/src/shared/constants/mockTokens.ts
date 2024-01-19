import { TableData } from "../../gui/Table";
import { createCoordinate } from "./asteroids";

export const mockNative = "0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF";

export const mockTokens: TableData[] = [
  {
    logo: "https://purple-eldest-crayfish-220.mypinata.cloud/ipfs/QmZQDUtnCAaYtPAZiVFpbhfZkYEtacKJkctS73HREb33vG/eth.png",
    name: "ETH",
    address: mockNative,
    position: {
      x: createCoordinate(),
      y: 1,
      z: createCoordinate(),
    },
  },
  {
    logo: "https://purple-eldest-crayfish-220.mypinata.cloud/ipfs/QmZQDUtnCAaYtPAZiVFpbhfZkYEtacKJkctS73HREb33vG/usdc.png",
    name: "USDC",
    address: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",
    position: {
      x: createCoordinate(),
      y: 1,
      z: createCoordinate(),
    },
  },
  {
    logo: "https://purple-eldest-crayfish-220.mypinata.cloud/ipfs/QmZQDUtnCAaYtPAZiVFpbhfZkYEtacKJkctS73HREb33vG/usdt.png",
    name: "USDT",
    address: "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0",
    position: {
      x: createCoordinate(),
      y: 1,
      z: createCoordinate(),
    },
  },
];
