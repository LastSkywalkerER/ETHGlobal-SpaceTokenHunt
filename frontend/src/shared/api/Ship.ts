import { axios } from "../config/axios.config";

export class Ship {
  public static async getCurrentUserShipPosition() {
    const response = await axios.get<{
      id: number;
      userId: string;
      x: string;
      y: string;
      z: string;
    }>("/api/v1/ship-position");

    return response.data;
  }
}
