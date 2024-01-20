import { axios } from "../config/axios.config";
import { createCoordinate } from "../constants";
import { removeDuplicates } from "../helpers/removeDuplicates";

export interface TokenData {
  address: string;
  logo: string;
  name: string;
  position: { x: number; y: number; z: number };
}

export const mockNativeAddress = "0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF";

export const mockNativeData: TokenData = {
  logo: "https://purple-eldest-crayfish-220.mypinata.cloud/ipfs/QmZQDUtnCAaYtPAZiVFpbhfZkYEtacKJkctS73HREb33vG/eth.png",
  name: "ETH",
  address: mockNativeAddress,
  position: {
    x: createCoordinate(),
    y: 1,
    z: createCoordinate(),
  },
};

export class Tokens {
  public static async getGameTokens() {
    const response = await axios.get<TokenData[]>("/api/v1/tokens");

    return response.data;
  }

  public static async getGuiTokens() {
    const response = await axios.get<TokenData[]>("/api/v1/tokens");

    return [mockNativeData, ...removeDuplicates(response.data, "address")];
  }
}
