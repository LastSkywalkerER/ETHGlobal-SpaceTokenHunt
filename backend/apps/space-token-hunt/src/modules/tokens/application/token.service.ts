import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

import { BlockchainEthDomain } from '../../blockchain-eth/domain';
import { ShipDomain } from '../../ship/domain';
import { UserDomain } from '../../user/domain';
import { TokenDomain } from '../domain/token.domain';

import {
  CreateCoordinateAroundShipParameters,
  GetTokensParameters,
} from './token.service-type';

@Injectable()
export class TokenService {
  constructor(
    private readonly tokenDomain: TokenDomain,
    private readonly shipDomain: ShipDomain,
    private readonly blockchainEthDomain: BlockchainEthDomain,
    private readonly userDomain: UserDomain,
  ) {}

  private createCoordinateAroundShip({
    shipPosition,
  }: CreateCoordinateAroundShipParameters) {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * (50 - 5) + 5;
    const offsetX = Math.cos(angle) * distance;
    const offsetZ = Math.sin(angle) * distance;

    return {
      x: shipPosition.x + offsetX,
      y: 1,
      z: shipPosition.z + offsetZ,
    };
  }

  public async getTokens({ userId }: GetTokensParameters) {
    const tokensData = await this.tokenDomain.getTokens();
    const shipPosition = await this.shipDomain.getTemporaryShipPosition({
      userId,
    });

    const tokens = [];

    for (let i = 0; i < 50; i++) {
      const randomIndex = Math.floor(Math.random() * tokensData.length);
      tokens.push(tokensData[randomIndex]);
    }

    const data = tokens.map((token) => ({
      ...token,
      position: this.createCoordinateAroundShip({
        shipPosition: shipPosition ? shipPosition : { x: 0, y: 0, z: 0 },
      }),
    }));

    return data;
  }

  public async getTokensInfo({ userId }: GetTokensParameters) {
    const user = await this.userDomain.getUserByUuid(userId);
    const tokensData = await this.tokenDomain.getTokens();
    const tokens = await this.blockchainEthDomain.getTokensInfo();
    const blockchainData = await this.blockchainEthDomain.getBlockchainData(
      user.walletAddress,
    );
    const data = tokensData.map((obj1) => ({
      ...obj1,
      avaliable:
        blockchainData.availableBorrowsBase /
        Number(
          ethers.utils.formatUnits(
            tokens.find((obj2) => obj2.symbol === obj1.name)
              ?.priceInMarketReferenceCurrency,
            8,
          ),
        ),
    }));

    return data;
  }
}
