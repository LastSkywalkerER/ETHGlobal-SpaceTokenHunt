export interface CreateRefreshTokenParameters {
  userUuid: string;
}

export interface RemoveRefreshTokenParameters {
  userUuid: string;
}

export interface RemoveRefreshTokensParameters {
  userId: number;
}

export interface ValidateRefreshTokenAndGetParameters {
  refreshTokenString: string;
}
