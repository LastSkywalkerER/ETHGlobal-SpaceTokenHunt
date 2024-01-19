import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JwtConfigService } from '../../config';
import { AuthAccessTokenModule } from '../auth-access-token';
import { UserModule } from '../user';

import { RefreshTokenService } from './application';
import { RefreshTokenDomain } from './domain';
import { RefreshTokenRepository } from './infrastructure/repositories';

@Global()
@Module({
  controllers: [],
  exports: [RefreshTokenDomain, RefreshTokenService],
  imports: [
    JwtModule.registerAsync({ useClass: JwtConfigService }),
    AuthAccessTokenModule,
    UserModule,
  ],
  providers: [RefreshTokenService, RefreshTokenDomain, RefreshTokenRepository],
})
export class AuthRefreshTokenModule {}
