import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlockchainEthModule } from '../blockchain-eth';

import { UserService } from './application/user.service';
import { UserDomain } from './domain';
import { UserEntity } from './infrastructure/entities/user.entity';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UserController } from './presentation/user.controller';
import { UserGateway } from './user.gateway';
import { UserEventHandler } from './user.handler';

@Module({
  controllers: [UserController],
  exports: [UserDomain, UserGateway, UserEventHandler],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => BlockchainEthModule),
  ],
  providers: [
    UserService,
    UserDomain,
    UserRepository,
    UserGateway,
    UserEventHandler,
  ],
})
export class UserModule {}
