import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@nestjs-modules/ioredis';
import { WinstonModule } from 'nest-winston';

import { configuration, validate } from './config';
import { RedisConfigService } from './config/redis';
import { dataSourceOptions } from './config/typeorm/typeOrm.config';
import { WinstonConfigService } from './config/winston';
import { AuthRefreshTokenModule } from './modules/auth-refresh-token';
import { BlockchainEthModule } from './modules/blockchain-eth';
import { CryptoAuthModule } from './modules/crypto-auth';
import { RatingModule } from './modules/rating';
import { ShipModule } from './modules/ship/ship.module';
import { UserModule } from './modules/user';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: configuration,
      validate,
    }),
    EventEmitterModule.forRoot({ global: true }),
    WinstonModule.forRootAsync({ useClass: WinstonConfigService }),
    RedisModule.forRootAsync({ useClass: RedisConfigService }),
    UserModule,
    CryptoAuthModule,
    BlockchainEthModule,
    AuthRefreshTokenModule,
    ShipModule,
    RatingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
