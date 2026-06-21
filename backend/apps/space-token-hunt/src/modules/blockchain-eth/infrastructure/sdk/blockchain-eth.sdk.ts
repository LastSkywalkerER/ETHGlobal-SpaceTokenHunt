import { UiPoolDataProvider, ChainId } from '@aave/contract-helpers';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
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

  constructor(private eventEmitter: EventEmitter2) {
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
    this.subscribeToExistingContracts();
  }

  private async subscribeToExistingContracts() {
    try {
      const sdk = new ThirdwebSDK('sepolia');
      const contract = await sdk.getContract(this.contractAddress, this.abi);

      contract.events.listenToAllEvents(async (event) => {
        this.eventEmitter.emit('Update', event);
      });
    } catch {
      // thirdweb event subscription is best-effort (no API key / flaky RPC);
      // never let it crash the server on startup.
    }
  }

  // Retry transient RPC failures ("could not detect network", rate limits, …)
  // a couple of times before giving up — the public Sepolia node is flaky.
  private async withRetry<T>(fn: () => Promise<T>, retries = 2): Promise<T> {
    let lastError: unknown;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        if (attempt < retries) {
          await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)));
        }
      }
    }
    throw lastError;
  }

  public async getTokensInfo() {
    return this.withRetry(async () => {
      const poolDataProviderContract = new UiPoolDataProvider({
        uiPoolDataProviderAddress:
          '0x69529987FA4A075D0C00B0128fa848dc9ebbE9CE',
        provider: this.provider,
        chainId: ChainId.sepolia,
      });

      const reserves = await poolDataProviderContract.getReservesHumanized({
        lendingPoolAddressProvider:
          '0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A',
      });

      return reserves.reservesData;
    });
  }

  public async getBlockchainData(address: string) {
    const data = await this.withRetry<any>(() =>
      this.contract['getUserAccountData(address)'](address),
    );

    const netWorth =
      Number(ethers.utils.formatUnits(data.totalCollateralBase, 8)) -
      Number(ethers.utils.formatUnits(data.totalDebtBase, 8));

    return {
      healthFactor: Number(ethers.utils.formatUnits(data.healthFactor, 18)),
      netWorth: Number(netWorth.toFixed(2)),
      supplyBalance: Number(
        ethers.utils.formatUnits(data.totalCollateralBase, 8),
      ),
      borrowBalance: Number(ethers.utils.formatUnits(data.totalDebtBase, 8)),
      availableBorrowsBase:
        Number(ethers.utils.formatUnits(data.availableBorrowsBase, 8)) * 0.99,
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
