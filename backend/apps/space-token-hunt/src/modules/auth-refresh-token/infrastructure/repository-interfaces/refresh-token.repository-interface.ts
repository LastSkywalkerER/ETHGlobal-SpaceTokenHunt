import { Repository } from 'space-token-hunt/redis';

import { RefreshTokenEntity } from '../entities';

export interface RefreshTokenRepositoryInterface
  extends Repository<RefreshTokenEntity> {}

export interface GetRefreshTokensParameters {
  userId: string;
}

export interface RemoveRefreshTokensParameters {
  userId: string;
}
