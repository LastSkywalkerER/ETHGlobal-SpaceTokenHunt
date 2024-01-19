import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user';

import { ACCESS_TOKEN_REPOSITORY_TOKEN } from './core/tokens';
import { AccessTokenDomain } from './domain';
import { AccessTokenRepository } from './infrastructure/repositories';
import { JwtConfigService } from '../../config';

@Module({
  controllers: [],
  exports: [AccessTokenDomain],
  imports: [
    JwtModule.registerAsync({ useClass: JwtConfigService }),
    UserModule,
  ],
  providers: [
    { provide: ACCESS_TOKEN_REPOSITORY_TOKEN, useClass: AccessTokenRepository },
    AccessTokenDomain,
  ],
})
export class AuthAccessTokenModule {}
