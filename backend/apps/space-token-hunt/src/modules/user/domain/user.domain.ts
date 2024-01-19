import { Injectable } from '@nestjs/common';

import { GetCryptoAuthByAddressParameters } from '../../crypto-auth/domain/crypto-auth-domain.type';
import { UserRepository } from '../infrastructure';

import { CreateUserData } from './user.domain.types';

@Injectable()
export class UserDomain {
  constructor(private readonly userRepository: UserRepository) {}

  public async createUser(data: CreateUserData) {
    const entity = await this.userRepository.create(data);
    await this.userRepository.save(entity);
    return entity;
  }

  public getUserByAdress({ address }: GetCryptoAuthByAddressParameters) {
    return this.userRepository.findOne({
      where: {
        walletAddress: address.toLowerCase(),
      },
    });
  }

  public async getUserByUuid(userUuid: string) {
    const data = await this.userRepository.findOne({
      where: { uuid: userUuid },
      select: ['id', 'uuid', 'walletAddress'],
    });
    return data;
  }

  public async getUserId(uuid: string) {
    const data = await this.userRepository.findOne({
      where: {
        uuid,
      },
      select: ['id'],
    });
    return data;
  }
}
