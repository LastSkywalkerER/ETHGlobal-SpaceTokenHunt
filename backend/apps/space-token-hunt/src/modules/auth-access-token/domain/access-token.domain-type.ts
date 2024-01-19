export interface CreateAccessTokenParameters {
  userUuid: string;
}

export interface GenerateAccessTokenIdParameters {
  userUuid: string;
}

export interface GetAccessTokensParameters {
  userId: number;
}

export interface RemoveAccessTokenParameters {
  userUuid: string;
}

export interface RemoveAccessTokensParameters {
  userId: number;
}

export interface ValidateAccessTokenAndGetParameters {
  accessToken: string;
}
