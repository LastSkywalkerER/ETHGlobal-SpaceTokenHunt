import { Redis } from '@nestjs-modules/ioredis';
import { ClassConstructor, plainToInstance } from 'class-transformer';

import {
  GetParameters,
  RemoveParameters,
  SetParameters,
} from './repository.type';

interface RepositoryOptions<T> {
  baseClass: ClassConstructor<T>;
  storageKeyPrefix: string;
}

export class Repository<T> {
  private readonly storageKeyPrefix: string;

  constructor(
    private readonly redisClient: Redis,
    private readonly repositoryOptions: RepositoryOptions<T>,
  ) {
    this.storageKeyPrefix = this.repositoryOptions.storageKeyPrefix;
  }

  public async get({ key }: GetParameters): Promise<T> {
    const stringifiedValue = await this.redisClient.get(
      `${this.storageKeyPrefix}_${key}`,
    );

    if (!stringifiedValue) {
      return stringifiedValue as undefined;
    }

    return plainToInstance(
      this.repositoryOptions.baseClass,
      JSON.parse(stringifiedValue),
    );
  }

  public async remove({ key }: RemoveParameters): Promise<void> {
    await this.redisClient.del(`${this.storageKeyPrefix}_${key}`);
  }

  public async set({
    key,
    ttlMilliseconds,
    value,
  }: SetParameters<T>): Promise<void> {
    const keyWithPrefix = `${this.storageKeyPrefix}_${key}`;
    const stringifiedValue = JSON.stringify(value);

    if (ttlMilliseconds) {
      await this.redisClient.set(
        keyWithPrefix,
        stringifiedValue,
        'PX',
        ttlMilliseconds,
      );

      return;
    }

    await this.redisClient.set(keyWithPrefix, stringifiedValue);
  }
}
