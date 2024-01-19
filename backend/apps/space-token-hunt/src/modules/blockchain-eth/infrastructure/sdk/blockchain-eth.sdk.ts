import { Injectable } from '@nestjs/common';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { utils } from 'ethers';
import {
  BadRequestException,
  ForbiddenException,
} from 'space-token-hunt/exceptions';

import { TokenDomain } from '../../../tokens/domain/token.domain';
import {
  GetBlockchainDataParameters,
  VerifyMessageParameters,
} from '../sdk-interfaces';
@Injectable()
export class BlockchainEthSdk {
  constructor(private readonly tokenDomain: TokenDomain) {}

  private async getBlockchainData({
    address,
    abi,
  }: GetBlockchainDataParameters) {
    const sdk = new ThirdwebSDK('goerli');
    const contract = await sdk.getContract(address, abi);

    return {
      contract,
    };
  }

  public async verifyMessage({
    address,
    message,
    signature,
  }: VerifyMessageParameters) {
    try {
      const signerAddress = utils.verifyMessage(message, signature);
      if (signerAddress.toLowerCase() !== address.toLowerCase()) {
        throw new ForbiddenException('signature is invalid');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
