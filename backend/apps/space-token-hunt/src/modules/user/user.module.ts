import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlockchainEthModule } from '../blockchain-eth';

import { UserService } from './application/user.service';
import { UserDomain } from './domain';
import { UserEntity } from './infrastructure/entities/user.entity';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UserController } from './presentation/user.controller';

@Module({
  controllers: [UserController],
  exports: [UserDomain],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => BlockchainEthModule),
  ],
  providers: [UserService, UserDomain, UserRepository],
})
export class UserModule {}
