import { axios } from "../config/axios.config";

export class Users {
  public static async authLogin(address: string) {
    // return await Api.post<{ message: string }>("/api/v1/crypto/auth", { address });

    const response = await axios.post<{ message: string }>("/api/v1/crypto/auth", { address });

    return response.data;
  }

  public static async verifyMessage(data: { address: string; signature: string }) {
    // return await Api.post("/api/v1/crypto/verify", data, { headers: [["credentials", "include"]] });
    const response = await axios.post<{ success: boolean }>("/api/v1/crypto/verify", data);

    return response.data;
  }

  public static async refreshToken() {
    // const response = await Api.get("/api/v1/crypto/refresh-token");
    const response = await axios.get("/api/v1/crypto/refresh-token");

    console.log("refreshToken", response);

    return response.data;
  }

  public static async logout() {
    // const response = await Api.get("/api/v1/crypto/logout");
    const response = await axios.get("/api/v1/crypto/logout");

    console.log("logout", response);

    return response.data;
  }

  public static async getUser() {
    // const response = await Api.get("/api/v1/user");
    const response = await axios.get("/api/v1/user");

    console.log("getUser", response);

    return response.data;
  }

  public static async getCurrentUserShipPosition() {
    // const response = await Api.get("/api/v1/ship-position");
    const response = await axios.get("/api/v1/ship-position");

    console.log("getCurrentUserShipPosition", response);

    return response;
  }
}
