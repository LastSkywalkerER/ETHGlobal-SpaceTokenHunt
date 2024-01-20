export interface GetTokensParameters {
  userId: string;
}

export interface CreateCoordinateAroundShipParameters {
  shipPosition: {
    x: number;
    y: number;
    z: number;
  };
}
