import { Controller, Get, UseGuards } from '@nestjs/common';
import { apiConfig } from '@space-token-hunt/core';
import { CurrentUser, JwtAuthGuard } from 'space-token-hunt/auth';
import { User } from 'space-token-hunt/auth/decorators/user.decorator';

import { ShipService } from '../application/ship.service';

@Controller()
export class ShipController {
  constructor(private readonly shipService: ShipService) {}

  @UseGuards(JwtAuthGuard)
  @Get(apiConfig.ship.getCurrentUserShipPosition)
  public async getCurrentUserShipPosition(@User() user: CurrentUser) {
    return await this.shipService.getCurrentUserShipPosition({
      userUuid: user.userUuid,
    });
  }
}
