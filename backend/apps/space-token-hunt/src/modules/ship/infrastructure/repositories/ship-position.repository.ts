import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Repository } from 'space-token-hunt/redis';
import { ImplementedClassValidator } from 'space-token-hunt/typings';

import { ShipPositionEntity } from '../entities';
import { ShipPositionRepositoryInterface } from '../repository-interface';

@Injectable()
export class ShipPositionRepository
  extends Repository<ShipPositionEntity>
  implements
    ImplementedClassValidator<
      ShipPositionRepository,
      ShipPositionRepositoryInterface
    >
{
  constructor(@InjectRedis() private readonly redis: Redis) {
    super(redis, {
      baseClass: ShipPositionEntity,
      storageKeyPrefix: ShipPositionRepository.name,
    });
  }
}
