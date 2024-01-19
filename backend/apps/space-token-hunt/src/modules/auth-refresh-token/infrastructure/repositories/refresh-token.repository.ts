import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';

import { Repository } from 'space-token-hunt/redis';
import { ImplementedClassValidator } from 'space-token-hunt/typings';

import { RefreshTokenEntity } from '../entities';
import { RefreshTokenRepositoryInterface } from '../repository-interfaces';

@Injectable()
export class RefreshTokenRepository
  extends Repository<RefreshTokenEntity>
  implements
    ImplementedClassValidator<
      RefreshTokenRepository,
      RefreshTokenRepositoryInterface
    >
{
  constructor(@InjectRedis() private readonly redis: Redis) {
    super(redis, {
      baseClass: RefreshTokenEntity,
      storageKeyPrefix: RefreshTokenRepository.name,
    });
  }
}
