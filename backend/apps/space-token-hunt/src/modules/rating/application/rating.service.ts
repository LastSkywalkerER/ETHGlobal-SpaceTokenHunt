import { Injectable } from '@nestjs/common';

import { BlockchainEthDomain } from '../../blockchain-eth/domain';
import { UserDomain } from '../../user/domain';
import { RatingDomain } from '../domain';

import { CreateRatingRecordParameters } from './rating.service-type';

@Injectable()
export class RatingService {
  constructor(
    private readonly ratingDomain: RatingDomain,
    private readonly blockchainEthDomain: BlockchainEthDomain,
    private readonly userDomain: UserDomain,
  ) {}

  public async createRatingRecord({ userId }: CreateRatingRecordParameters) {
    const user = await this.userDomain.getUserByUuid(userId);

    const blockchainData = await this.blockchainEthDomain.getBlockchainData(
      user.walletAddress,
    );

    const data = {
      totalBalance: blockchainData.supplyBalance + blockchainData.borrowBalance,
      walletAddress: user.walletAddress,
    };
    return await this.ratingDomain.createRatingRecord(data);
  }

  public async getRatingBoard() {
    const data = await this.ratingDomain.getRatingBoard();

    return data;
  }
}
