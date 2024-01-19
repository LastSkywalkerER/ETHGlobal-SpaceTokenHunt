import { Controller, Get } from '@nestjs/common';
import { apiConfig } from '@space-token-hunt/core';

import { TokenService } from '../application/token.service';

@Controller()
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get(apiConfig.token.getTokens)
  async getTokens() {
    return await this.tokenService.getTokens();
  }
}
