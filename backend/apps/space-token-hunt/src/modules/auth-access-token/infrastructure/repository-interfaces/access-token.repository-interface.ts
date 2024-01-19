import { Repository } from 'space-token-hunt/redis';

import { AccessTokenEntity } from '../entities';

export interface AccessTokenRepositoryInterface
  extends Repository<AccessTokenEntity> {
  getAccessTokens(
    parameters: GetAccessTokensParameters,
  ): Promise<AccessTokenEntity[]>;
  removeAccessTokens(parameters: RemoveAccessTokensParameters): Promise<void>;
}

export interface GetAccessTokensParameters {
  userId: string;
}

export interface RemoveAccessTokensParameters {
  userId: string;
}
