import { Injectable } from '@nestjs/common';
import { ContractInterface, ethers, utils } from 'ethers';
import {
  BadRequestException,
  ForbiddenException,
} from 'space-token-hunt/exceptions';

import { abi } from '../abis/abi';
import { VerifyMessageParameters } from '../sdk-interfaces';
@Injectable()
export class BlockchainEthSdk {
  protected provider: ethers.providers.JsonRpcProvider;
  protected contract: ethers.Contract;
  protected contractAddress: string;
  protected abi: ContractInterface;
  protected interface: ethers.utils.Interface;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(
      'https://ethereum-sepolia.publicnode.com',
    );
    this.contractAddress = '0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951';
    this.abi = abi;
    this.contract = new ethers.Contract(
      this.contractAddress,
      this.abi,
      this.provider,
    );
    this.interface = new ethers.utils.Interface(JSON.stringify(this.abi));
  }

  public async getBlockchainData(address: string) {
    const data = await this.contract['getUserAccountData(address)'](address);

    const netWorth =
      Number(ethers.utils.formatUnits(data.totalCollateralBase, 8)) -
      Number(ethers.utils.formatUnits(data.totalDebtBase, 8));

    return {
      healthFactor: Number(ethers.utils.formatUnits(data.healthFactor, 18)),
      netWorth: Number(netWorth.toFixed(2)),
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
