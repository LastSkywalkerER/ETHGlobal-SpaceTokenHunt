import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CryptoModule } from 'space-token-hunt/crypto';

import { JwtConfigService } from '../../config';
import { AuthAccessTokenModule } from '../auth-access-token';
import { AuthRefreshTokenModule } from '../auth-refresh-token';
import { AuthSignUpModule } from '../auth-sign-up';
import { BlockchainEthModule } from '../blockchain-eth';
import { UserModule } from '../user';

import { CryptoAuthService } from './application';
import { CryptoAuthDomain } from './domain';
import { LoginMessageRepository } from './infrastructure/repositories/login-message.repository';
import { CryptoAuthController } from './presentation';

@Module({
  imports: [
    UserModule,
    CryptoModule,
    AuthSignUpModule,
    BlockchainEthModule,
    JwtModule.registerAsync({ global: true, useClass: JwtConfigService }),
    AuthRefreshTokenModule,
    AuthAccessTokenModule,
  ],
  controllers: [CryptoAuthController],
  providers: [CryptoAuthDomain, CryptoAuthService, LoginMessageRepository],
})
export class CryptoAuthModule {}
