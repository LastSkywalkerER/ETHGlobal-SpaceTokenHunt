import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from 'space-token-hunt/crypto';
import { v4 as uuidv4 } from 'uuid';

import { CurrentUser } from '../../../../../../libs/auth/src/core/types/current-user.type';
import { AccessTokenDomain } from '../../auth-access-token/domain';
import { RefreshTokenService } from '../../auth-refresh-token/application';
import { RefreshTokenDomain } from '../../auth-refresh-token/domain';
import { SignUpDomain } from '../../auth-sign-up/domain';
import { BlockchainEthDomain } from '../../blockchain-eth/domain';
import { UserDomain } from '../../user/domain/user.domain';
import { CryptoAuthDomain } from '../domain';

import {
  ChallengeLoginMessageParameters,
  GenerateLoginMessageParameters,
  VerifyMessageParameters,
} from './crypto-auth-service.type';

@Injectable()
export class CryptoAuthService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly cryptoAuthDomain: CryptoAuthDomain,
    private readonly blockchainEthDomain: BlockchainEthDomain,
    private readonly userDomain: UserDomain,
    private readonly signUpDomain: SignUpDomain,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly accessTokenDomain: AccessTokenDomain,
    private readonly refreshTokenDomain: RefreshTokenDomain,
    private jwtService: JwtService,
  ) {}

  private generateLoginMessage({
    address,
    nonce,
  }: GenerateLoginMessageParameters) {
    return `Welcome to SpaceTokenHunt!\n\nClick to sign in.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nYour authentication status will reset after 24 hours.\n\naddress: ${address}\n\nnonce: ${nonce}`;
  }

  public async challengeLoginMessage({
    address,
  }: ChallengeLoginMessageParameters) {
    try {
      const nonce = this.cryptoService.generateUniqueId();
      await this.cryptoAuthDomain.setChallengeLoginMessage({ address, nonce });

      const message = this.generateLoginMessage({ address, nonce });
      return {
        message,
      };
    } catch (error) {
      throw error;
    }
  }

  public async refreshTokens(refreshToken: string | null) {
    if (!refreshToken) {
      throw new BadRequestException('No refreshToken');
    }
    const tokens = await this.refreshTokenService.refreshToken({
      refreshTokenString: refreshToken,
    });
    return tokens;
  }

  public async deleteTokens(accessToken: string) {
    if (!accessToken) {
      return;
    }
    try {
      const user: CurrentUser = this.jwtService.verify(accessToken);
      await this.accessTokenDomain.removeAccessToken({
        userUuid: user.userUuid,
      });
      await this.refreshTokenDomain.removeRefreshToken({
        userUuid: user.userUuid,
      });
    } catch (e) {
    } finally {
      return 'success';
    }
  }

  public async verifyMessage({ address, signature }: VerifyMessageParameters) {
    const loginMessage =
      await this.cryptoAuthDomain.getChallengeLoginMessageByAddress({
        address,
      });

    if (!loginMessage) {
      throw new BadRequestException('Message is not found');
    }

    const { nonce } = loginMessage;
    const message = this.generateLoginMessage({ address, nonce });

    await this.blockchainEthDomain.verifyMessage({
      address,
      message,
      signature,
    });

    const user = await this.userDomain.getUserByAdress({ address });
    let result: { accessToken: string; refreshToken: string };
    if (!user) {
      const uuid = uuidv4();

      const createdUser = await this.userDomain.createUser({
        uuid: uuid,
        walletAddress: address.toLowerCase(),
      });

      result = await this.signUpDomain.generateTokenPair({
        userUuid: createdUser.uuid,
      });
    } else {
      result = await this.signUpDomain.generateTokenPair({
        userUuid: user.uuid,
      });
    }

    await this.cryptoAuthDomain.deleteChallengeLoginMessage({ address });

    return result;
  }
}
