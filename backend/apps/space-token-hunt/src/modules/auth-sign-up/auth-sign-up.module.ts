import { Module } from '@nestjs/common';

import { AuthAccessTokenModule } from '../auth-access-token';
import { AuthRefreshTokenModule } from '../auth-refresh-token';
import { BlockchainEthModule } from '../blockchain-eth';
import { UserModule } from '../user';
import { SignUpDomain } from './domain/sign-up.domain';

@Module({
  controllers: [],
  exports: [SignUpDomain],
  imports: [
    AuthAccessTokenModule,
    AuthRefreshTokenModule,
    UserModule,
    BlockchainEthModule,
  ],
  providers: [SignUpDomain],
})
export class AuthSignUpModule {}
