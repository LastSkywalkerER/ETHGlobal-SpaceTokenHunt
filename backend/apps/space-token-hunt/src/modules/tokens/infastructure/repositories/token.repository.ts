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
  public async createToken({ token }: { token: TokenEntity }) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(token);
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
