import { Controller, Get, UseGuards } from '@nestjs/common';
import { apiConfig } from '@space-token-hunt/core';
import { CurrentUser, JwtAuthGuard } from 'space-token-hunt/auth';
import { User } from 'space-token-hunt/auth/decorators/user.decorator';

import { UserDomain } from '../domain';

@Controller()
export class UserController {
  constructor(private readonly userDomain: UserDomain) {}

  @UseGuards(JwtAuthGuard)
  @Get(apiConfig.user.getUser)
  public async getUser(@User() user: CurrentUser) {
    return await this.userDomain.getUserByUuid(user.userUuid);
  }

  @Get('healthcheck')
  public async healthCheck() {
    return 'hello';
  }
}
