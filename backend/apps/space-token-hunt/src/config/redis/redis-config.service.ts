import {
  RedisModuleOptions,
  RedisModuleOptionsFactory,
} from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Config } from '../configuration.type';

@Injectable()
export class RedisConfigService implements RedisModuleOptionsFactory {
  constructor(private readonly configService: ConfigService<Config>) {}

  public createRedisModuleOptions():
    | RedisModuleOptions
    | Promise<RedisModuleOptions> {
    const { url } = this.configService.get<Config['redis']>('redis');

    return { config: { url } };
  }
}
