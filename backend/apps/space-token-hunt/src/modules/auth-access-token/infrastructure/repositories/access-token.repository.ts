import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Repository } from 'space-token-hunt/redis';
import { ImplementedClassValidator } from 'space-token-hunt/typings';

import { AccessTokenEntity } from '../entities';
import {
  AccessTokenRepositoryInterface,
  GetAccessTokensParameters,
  RemoveAccessTokensParameters,
} from '../repository-interfaces';

@Injectable()
export class AccessTokenRepository
  extends Repository<AccessTokenEntity>
  implements
    ImplementedClassValidator<
      AccessTokenRepository,
      AccessTokenRepositoryInterface
    >
{
  constructor(@InjectRedis() private readonly redis: Redis) {
    super(redis, {
      baseClass: AccessTokenEntity,
      storageKeyPrefix: AccessTokenRepository.name,
    });
  }

  public async getAccessTokens({
    userId,
  }: GetAccessTokensParameters): Promise<AccessTokenEntity[]> {
    const keysToBeFinded = await this.redis.keys(
      `${AccessTokenRepository.name}_${userId}_*`,
    );

    return Promise.all(
      keysToBeFinded.map(async (key) => {
        const value = await this.redis.get(key);

        return JSON.parse(value);
      }),
    );
  }

  public async removeAccessTokens({
    userId,
  }: RemoveAccessTokensParameters): Promise<void> {
    const keysToBeRemoved = await this.redis.keys(
      `${AccessTokenRepository.name}_${userId}_*`,
    );

    await this.redis.del(keysToBeRemoved);
  }
}
