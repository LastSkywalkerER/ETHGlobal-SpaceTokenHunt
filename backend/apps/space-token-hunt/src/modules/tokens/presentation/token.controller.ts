import { Controller, Get, UseGuards } from '@nestjs/common';
import { apiConfig } from '@space-token-hunt/core';
import { CurrentUser, JwtAuthGuard } from 'space-token-hunt/auth';
import { User } from 'space-token-hunt/auth/decorators/user.decorator';

import { TokenService } from '../application/token.service';

@Controller()
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @UseGuards(JwtAuthGuard)
  @Get(apiConfig.token.getTokens)
  async getTokens(@User() user: CurrentUser) {
    return await this.tokenService.getTokens({ userId: user.userUuid });
  }
}
