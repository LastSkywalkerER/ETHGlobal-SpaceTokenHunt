import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserDomain } from './domain';
import { UserEntity } from './infrastructure/entities/user.entity';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UserController } from './presentation/user.controller';

@Module({
  controllers: [UserController],
  exports: [UserDomain],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserDomain, UserRepository],
})
export class UserModule {}
