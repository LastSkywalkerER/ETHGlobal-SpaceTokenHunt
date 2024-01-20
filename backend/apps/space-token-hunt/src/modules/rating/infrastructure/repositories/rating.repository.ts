import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RatingEntity } from '../entities';

@Injectable()
export class RatingRepository extends Repository<RatingEntity> {
  constructor(
    @InjectRepository(RatingEntity)
    private ratingRepository: Repository<RatingEntity>,
  ) {
    super(
      ratingRepository.target,
      ratingRepository.manager,
      ratingRepository.queryRunner,
    );
  }
}
