export interface GetCurrentUserShipPositionParameters {
  userUuid: string;
}

export interface CreateShipPositionParameters {
  x: number;
  y: number;
  z: number;
  userId: string;
}

export interface UpdateShipPositionParameters {
  x: number;
  y: number;
  z: number;
  userId: string;
}

export interface CreateTemporaryShipPositionParameters {
  x: number;
  y: number;
  z: number;
  userId: string;
}

export interface DeleteTemporaryShipPositionParameters {
  userId: string;
}

export interface GetTemporaryShipPositionParameters {
  userId: string;
}
