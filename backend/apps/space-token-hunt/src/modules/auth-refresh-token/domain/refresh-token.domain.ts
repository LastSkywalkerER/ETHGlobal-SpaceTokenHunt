import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Config } from '../../../config';
import { RefreshTokenRepository } from '../infrastructure/repositories';

import {
  CreateRefreshTokenParameters,
  RemoveRefreshTokenParameters,
  ValidateRefreshTokenAndGetParameters,
} from './refresh-token.domain-type';

@Injectable()
export class RefreshTokenDomain {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly configService: ConfigService<Config>,
    private readonly jwtService: JwtService,
  ) {}

  private generateRefreshTokenId(userUuid: string) {
    return `${userUuid}`;
  }

  public async createRefreshToken({ userUuid }: CreateRefreshTokenParameters) {
    const refreshTokenId = this.generateRefreshTokenId(userUuid);

    const { refreshTokenLifetimeInMilliseconds } =
      this.configService.get<Config['application']>('application');

    const refreshTokenString = await this.jwtService.signAsync(
      { userUuid },
      { expiresIn: `${refreshTokenLifetimeInMilliseconds}ms` },
    );

    await this.refreshTokenRepository.set({
      key: refreshTokenId,
      ttlMilliseconds: refreshTokenLifetimeInMilliseconds,
      value: {
        refreshToken: refreshTokenString,
        loggedAt: new Date(),
      },
    });

    return refreshTokenString;
  }

  public async removeRefreshToken({ userUuid }: RemoveRefreshTokenParameters) {
    const refreshTokenId = this.generateRefreshTokenId(userUuid);

    await this.refreshTokenRepository.remove({ key: refreshTokenId });
  }

  public async validateRefreshTokenAndGet({
    refreshTokenString,
  }: ValidateRefreshTokenAndGetParameters) {
    try {
      const user: { userUuid: string } =
        this.jwtService.verify(refreshTokenString);
      const refreshTokenId = this.generateRefreshTokenId(user.userUuid);
      const refreshToken = await this.refreshTokenRepository.get({
        key: refreshTokenId,
      });

      return refreshToken;
    } catch {
      return null;
    }
  }
}
