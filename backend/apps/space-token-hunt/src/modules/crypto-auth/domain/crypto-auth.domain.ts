import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from 'apps/space-token-hunt/src/config';

import { LoginMessageRepository } from '../infrastructure/repositories/login-message.repository';

import {
  GetChallengeLoginMessageByAddressParameters,
  SetChallengeLoginMessageParameters,
} from './crypto-auth-domain.type';

@Injectable()
export class CryptoAuthDomain {
  private readonly loginMessageLifetimeInMilliseconds: number;
  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly loginMessageRepository: LoginMessageRepository,
  ) {
    const { loginMessageLifetimeInMilliseconds } =
      this.configService.get('application');

    this.loginMessageLifetimeInMilliseconds =
      loginMessageLifetimeInMilliseconds;
  }

  public async setChallengeLoginMessage({
    address,
    nonce,
  }: SetChallengeLoginMessageParameters) {
    await this.loginMessageRepository.remove({ key: address });
    await this.loginMessageRepository.set({
      key: address,
      ttlMilliseconds: this.loginMessageLifetimeInMilliseconds,
      value: { nonce },
    });
  }

  public getChallengeLoginMessageByAddress({
    address,
  }: GetChallengeLoginMessageByAddressParameters) {
    return this.loginMessageRepository.get({ key: address });
  }

  public async deleteChallengeLoginMessage({ address }) {
    await this.loginMessageRepository.remove({ key: address });
  }
}
