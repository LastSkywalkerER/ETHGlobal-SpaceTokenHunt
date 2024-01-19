import { Injectable } from '@nestjs/common';
import { CryptoService } from 'space-token-hunt/crypto';

import { AccessTokenDomain } from '../../auth-access-token/domain';
import { RefreshTokenDomain } from '../../auth-refresh-token/domain';

import { GenerateTokenPairParameters } from './sign-up.domain-type';

@Injectable()
export class SignUpDomain {
  constructor(
    private readonly accessTokenDomain: AccessTokenDomain,
    private readonly cryptoService: CryptoService,
    private readonly refreshTokenDomain: RefreshTokenDomain,
  ) {}

  public async generateTokenPair({ userUuid }: GenerateTokenPairParameters) {
    const accessToken = await this.accessTokenDomain.createAccessToken({
      userUuid,
    });
    const refreshToken = await this.refreshTokenDomain.createRefreshToken({
      userUuid,
    });

    return { accessToken, refreshToken };
  }
}
