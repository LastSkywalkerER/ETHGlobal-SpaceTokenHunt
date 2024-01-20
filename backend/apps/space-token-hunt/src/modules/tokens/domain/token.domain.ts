import { Injectable } from '@nestjs/common';

import { TokenRepository } from '../infastructure/repositories/token.repository';

@Injectable()
export class TokenDomain {
  constructor(private readonly tokenRepository: TokenRepository) {}
  public async getTokens() {
    return await this.tokenRepository.find({
      select: ['name', 'logo', 'address'],
    });
  }
}
