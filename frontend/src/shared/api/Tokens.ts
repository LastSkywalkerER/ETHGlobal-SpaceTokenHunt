import { axios } from "../config/axios.config";

export interface TokenData {
  address: string;
  logo: string;
  name: string;
  position: { x: number; y: number; z: number };
}

export interface TokenFullData {
  address: string;
  logo: string;
  name: string;
  balance: string;
  avaliable: string;
  debt: string;
}

export const mockNativeAddress = "0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF";

// TODO: Figure out how to supply ETH directly
export const mockNativeData: TokenFullData = {
  logo: "https://purple-eldest-crayfish-220.mypinata.cloud/ipfs/QmZQDUtnCAaYtPAZiVFpbhfZkYEtacKJkctS73HREb33vG/eth.png",
  name: "ETH",
  address: mockNativeAddress,
  avaliable: "",
  balance: "",
  debt: "",
};

export class Tokens {
  public static async getGameTokens() {
    const response = await axios.get<TokenData[]>("/api/v1/tokens");

    return response.data;
  }

  public static async getGuiTokens() {
    const response = await axios.get<TokenFullData[]>("/api/v1/tokens-info");

    return [mockNativeData, ...response.data];
  }
}
