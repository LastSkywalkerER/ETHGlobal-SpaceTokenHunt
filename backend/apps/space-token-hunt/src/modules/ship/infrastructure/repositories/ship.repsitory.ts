import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ShipEntity } from '../entities';

@Injectable()
export class ShipRepository extends Repository<ShipEntity> {
  constructor(
    @InjectRepository(ShipEntity)
    private shipRepository: Repository<ShipEntity>,
  ) {
    super(
      shipRepository.target,
      shipRepository.manager,
      shipRepository.queryRunner,
    );
  }
}
