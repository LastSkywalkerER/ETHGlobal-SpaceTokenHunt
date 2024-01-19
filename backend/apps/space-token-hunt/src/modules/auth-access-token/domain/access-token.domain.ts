import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from 'space-token-hunt/auth';

import { Config } from '../../../config';
import { ACCESS_TOKEN_REPOSITORY_TOKEN } from '../core/tokens';
import { AccessTokenRepositoryInterface } from '../infrastructure';

import {
  CreateAccessTokenParameters,
  GenerateAccessTokenIdParameters,
  RemoveAccessTokenParameters,
} from './access-token.domain-type';

@Injectable()
export class AccessTokenDomain {
  private readonly accessTokenLifetimeInMilliseconds: number;

  constructor(
    @Inject(ACCESS_TOKEN_REPOSITORY_TOKEN)
    private readonly accessTokenRepository: AccessTokenRepositoryInterface,
    private readonly configService: ConfigService<Config>,
    private readonly jwtService: JwtService,
  ) {
    const { accessTokenLifetimeInMilliseconds } =
      this.configService.get<Config['application']>('application');

    this.accessTokenLifetimeInMilliseconds = accessTokenLifetimeInMilliseconds;
  }

  private generateAccessTokenId({ userUuid }: GenerateAccessTokenIdParameters) {
    return `${userUuid}`;
  }

  public async createAccessToken({ userUuid }: CreateAccessTokenParameters) {
    const accessTokenId = this.generateAccessTokenId({ userUuid });

    const payload: CurrentUser = {
      userUuid,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: `${this.accessTokenLifetimeInMilliseconds}ms`,
    });

    await this.accessTokenRepository.set({
      key: accessTokenId,
      ttlMilliseconds: this.accessTokenLifetimeInMilliseconds,
      value: { accessToken, loggedAt: new Date() },
    });

    return accessToken;
  }

  public async removeAccessToken({ userUuid }: RemoveAccessTokenParameters) {
    const accessTokenId = this.generateAccessTokenId({ userUuid });

    await this.accessTokenRepository.remove({ key: accessTokenId });
  }
}
