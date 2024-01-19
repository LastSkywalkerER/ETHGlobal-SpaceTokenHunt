import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AccessTokenDomain } from '../../auth-access-token/domain';
import { UserDomain } from '../../user/domain';
import { RefreshTokenDomain } from '../domain';

import { RefreshTokenParameters } from './refresh-token.service-type';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly accessTokenDomain: AccessTokenDomain,
    private readonly refreshTokenDomain: RefreshTokenDomain,
    private readonly userDomain: UserDomain,
    private readonly jwtService: JwtService,
  ) {}

  public async refreshToken({ refreshTokenString }: RefreshTokenParameters) {
    const storedRefreshToken =
      await this.refreshTokenDomain.validateRefreshTokenAndGet({
        refreshTokenString,
      });

    if (!storedRefreshToken) {
      throw new BadRequestException('Refresh token invalid');
    }
    const { userUuid } = await this.jwtService.verifyAsync(
      storedRefreshToken.refreshToken,
    );

    await this.accessTokenDomain.removeAccessToken({ userUuid });
    await this.refreshTokenDomain.removeRefreshToken({
      userUuid,
    });

    const accessToken = await this.accessTokenDomain.createAccessToken({
      userUuid,
    });
    const refreshToken = await this.refreshTokenDomain.createRefreshToken({
      userUuid,
    });

    return { accessToken, refreshToken };
  }
}
