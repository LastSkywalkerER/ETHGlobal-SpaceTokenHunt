import { Injectable } from '@nestjs/common';

import { RatingRepository } from '../infrastructure';

import { CreateRatingRecordParameters } from './rating.domain-type';

@Injectable()
export class RatingDomain {
  constructor(private readonly ratingRepository: RatingRepository) {}

  public async createRatingRecord(data: CreateRatingRecordParameters) {
    const entity = await this.ratingRepository.create(data);
    await this.ratingRepository.save(entity);
    return entity;
  }

  public async getRatingRecordByWalletAddress(walletAddress: string) {
    const data = await this.ratingRepository.findOne({
      where: {
        walletAddress,
      },
    });

    return data;
  }

  public async getRatingBoard() {
    const data = await this.ratingRepository.find({
      order: {
        totalBalance: 'DESC',
      },
    });

    return data;
  }

  public async updateRatingRecord(id: number, totalBalance: number) {
    const entity = await this.ratingRepository.update({ id }, { totalBalance });
    return entity;
  }
}
