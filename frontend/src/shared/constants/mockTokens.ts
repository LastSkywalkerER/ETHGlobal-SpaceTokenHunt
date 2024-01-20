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
    name: "DAI",
    logo: "https://purple-eldest-crayfish-220.mypinata.cloud/ipfs/QmZQDUtnCAaYtPAZiVFpbhfZkYEtacKJkctS73HREb33vG/dai.png",
    address: "0xff34b3d4aee8ddcd6f9afffb6fe49bd371b8a357",
    position: { x: 2.6849733171194448, y: 1, z: 28.583568167542772 },
  },
  {
    name: "LINK",
    logo: "https://purple-eldest-crayfish-220.mypinata.cloud/ipfs/QmZQDUtnCAaYtPAZiVFpbhfZkYEtacKJkctS73HREb33vG/chainlink.png",
    address: "0xf8fb3713d459d7c1018bd0a49d19b4c44290ebe5",
    position: { x: 11.813253117837101, y: 1, z: 33.91655501508545 },
  },
  {
    name: "USDC",
    logo: "https://purple-eldest-crayfish-220.mypinata.cloud/ipfs/QmZQDUtnCAaYtPAZiVFpbhfZkYEtacKJkctS73HREb33vG/usdc.png",
    address: "0x94a9d9ac8a22534e3faca9f4e7f2e2cf85d5e4c8",
    position: { x: 6.154427897446678, y: 1, z: 4.857693114383501 },
  },
  {
    name: "WBTC",
    logo: "https://purple-eldest-crayfish-220.mypinata.cloud/ipfs/QmZQDUtnCAaYtPAZiVFpbhfZkYEtacKJkctS73HREb33vG/wbtc.png",
    address: "0x29f2d40b0605204364af54ec677bd022da425d03",
    position: { x: 9.861922426833763, y: 1, z: -3.3512586431184195 },
  },
  {
    name: "WETH",
    logo: "https://purple-eldest-crayfish-220.mypinata.cloud/ipfs/QmZQDUtnCAaYtPAZiVFpbhfZkYEtacKJkctS73HREb33vG/weth.png",
    address: "0xc558dbdd856501fcd9aaf1e62eae57a9f0629a3c",
    position: { x: 5.613311244733685, y: 1, z: -40.35637595642399 },
  },
  {
    name: "USDT",
    logo: "https://purple-eldest-crayfish-220.mypinata.cloud/ipfs/QmZQDUtnCAaYtPAZiVFpbhfZkYEtacKJkctS73HREb33vG/usdt.png",
    address: "0xaa8e23fb1079ea71e0a56f48a2aa51851d8433d0",
    position: { x: -13.394375573615408, y: 1, z: -1.3969071994507365 },
  },
  {
    name: "AAVE",
    logo: "https://purple-eldest-crayfish-220.mypinata.cloud/ipfs/QmZQDUtnCAaYtPAZiVFpbhfZkYEtacKJkctS73HREb33vG/aave.png",
    address: "0x88541670e55cc00beefd87eb59edd1b7c511ac9a",
    position: { x: 6.004225436630486, y: 1, z: 15.676219483594624 },
  },
  {
    name: "EURS",
    logo: "https://purple-eldest-crayfish-220.mypinata.cloud/ipfs/QmZQDUtnCAaYtPAZiVFpbhfZkYEtacKJkctS73HREb33vG/eurs.png",
    address: "0x6d906e526a4e2ca02097ba9d0caa3c382f52278e",
    position: { x: -18.05000764938359, y: 1, z: -1.363698223648088 },
  },
  {
    name: "GHO",
    logo: "https://purple-eldest-crayfish-220.mypinata.cloud/ipfs/QmZQDUtnCAaYtPAZiVFpbhfZkYEtacKJkctS73HREb33vG/gho.png",
    address: "0xc4bf5cbdabe595361438f8c6a187bdc330539c60",
    position: { x: 7.54455178636083, y: 1, z: -22.934242409442728 },
  },
];
