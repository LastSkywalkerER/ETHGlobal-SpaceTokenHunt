import { axios } from "../config/axios.config";

export interface UserData {
  id: number;
  uuid: string;
  address: string;
  healthFactor: number;
  netWorth: number;
}

export class Users {
  public static async authLogin(address: string) {
    const response = await axios.post<{ message: string }>("/api/v1/crypto/auth", { address });

    return response.data;
  }

  public static async verifyMessage(data: { address: string; signature: string }) {
    const response = await axios.post<{ success: boolean }>("/api/v1/crypto/verify", data);

    return response.data;
  }

  public static async refreshToken() {
    const response = await axios.get("/api/v1/crypto/refresh-token");

    return response.data;
  }

  public static async logout() {
    const response = await axios.get("/api/v1/crypto/logout");

    return response.data;
  }

  public static async getUser() {
    const response = await axios.get<UserData>("/api/v1/user");

    return response.data;
  }

  public static async ratingBoard() {
    const response = await axios.get<
      {
        id: number;
        totalBalance: string;
        walletAddress: string;
      }[]
    >("/api/v1/rating-board");

    return response.data;
  }
}
