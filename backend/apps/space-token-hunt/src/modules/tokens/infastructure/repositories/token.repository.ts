import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { TokenEntity } from '../entities';

@Injectable()
export class TokenRepository extends Repository<TokenEntity> {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    private readonly dataSource: DataSource,
  ) {
    super(
      tokenRepository.target,
      tokenRepository.manager,
      tokenRepository.queryRunner,
    );
  }
}
