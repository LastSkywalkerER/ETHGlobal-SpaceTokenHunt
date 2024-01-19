import { Injectable } from '@nestjs/common';

import { TokenDomain } from '../domain/token.domain';

@Injectable()
export class TokenService {
  constructor(private readonly tokenDomain: TokenDomain) {}

  public async getTokens() {
    return await this.tokenDomain.getTokens();
  }
}
