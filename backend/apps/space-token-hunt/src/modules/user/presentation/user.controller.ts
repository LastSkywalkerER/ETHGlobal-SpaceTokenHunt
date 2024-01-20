import { Controller, Get, UseGuards } from '@nestjs/common';
import { apiConfig } from '@space-token-hunt/core';
import { CurrentUser, JwtAuthGuard } from 'space-token-hunt/auth';
import { User } from 'space-token-hunt/auth/decorators/user.decorator';

import { UserService } from '../application/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get(apiConfig.user.getUser)
  public async getUser(@User() user: CurrentUser) {
    return await this.userService.getCurrentUserData(user.userUuid);
  }

  @Get('healthcheck')
  public async healthCheck() {
    return 'hello';
  }
}
