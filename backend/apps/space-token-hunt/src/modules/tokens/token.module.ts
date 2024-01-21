import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlockchainEthModule } from '../blockchain-eth';
import { ShipModule } from '../ship/ship.module';
import { UserModule } from '../user';

import { TokenService } from './application/token.service';
import { TokenDomain } from './domain/token.domain';
import { TokenEntity } from './infastructure/entities';
import { TokenRepository } from './infastructure/repositories/token.repository';
import { TokenController } from './presentation/token.controller';

@Module({
  controllers: [TokenController],
  exports: [TokenDomain, TokenRepository],
  imports: [
    TypeOrmModule.forFeature([TokenEntity]),
    ShipModule,
    forwardRef(() => BlockchainEthModule),
    forwardRef(() => UserModule),
  ],
  providers: [TokenDomain, TokenRepository, TokenService],
})
export class TokenModule {}
