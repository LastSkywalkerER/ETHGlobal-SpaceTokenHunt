import { Module } from '@nestjs/common';
import { CryptoModule } from 'space-token-hunt/crypto';

import { TokenModule } from '../tokens/token.module';
import { UserModule } from '../user';

import { BLOCKCHAIN_ETH_SDK_TOKEN } from './core';
import { BlockchainEthDomain } from './domain';
import { BlockchainEthSdk } from './infrastructure/sdk';

@Module({
  exports: [BlockchainEthDomain],
  imports: [UserModule, CryptoModule, TokenModule],
  providers: [
    { provide: BLOCKCHAIN_ETH_SDK_TOKEN, useClass: BlockchainEthSdk },
    BlockchainEthDomain,
  ],
})
export class BlockchainEthModule {}
