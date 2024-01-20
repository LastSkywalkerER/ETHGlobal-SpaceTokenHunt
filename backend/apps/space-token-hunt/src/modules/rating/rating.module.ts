import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlockchainEthModule } from '../blockchain-eth';
import { UserModule } from '../user';

import { RatingService } from './application';
import { RatingDomain } from './domain';
import { RatingEntity, RatingRepository } from './infrastructure';
import { RatingController } from './presentation';

@Module({
  controllers: [RatingController],
  exports: [RatingDomain, RatingService],
  imports: [
    TypeOrmModule.forFeature([RatingEntity]),
    forwardRef(() => BlockchainEthModule),
    forwardRef(() => UserModule),
  ],
  providers: [RatingService, RatingDomain, RatingRepository],
})
export class RatingModule {}
