import { Inject, Injectable, Logger } from '@nestjs/common';

import { BLOCKCHAIN_ETH_SDK_TOKEN } from '../core/tokens';

import { VerifyMessageParameters } from './blockchain-eth.domain-type';
import { BlockchainEthSdk } from '../infrastructure/sdk';

@Injectable()
export class BlockchainEthDomain {
  private readonly logger = new Logger(BlockchainEthDomain.name);

  constructor(
    @Inject(BLOCKCHAIN_ETH_SDK_TOKEN)
    private readonly blockchainEthSdk: BlockchainEthSdk,
  ) {}

  public verifyMessage({
    address,
    message,
    signature,
  }: VerifyMessageParameters) {
    return this.blockchainEthSdk.verifyMessage({ address, message, signature });
  }

  public async getBlockchainData(address: string) {
    return this.blockchainEthSdk.getBlockchainData(address);
  }
}
