import { Controller, Get } from '@nestjs/common';
import { apiConfig } from '@space-token-hunt/core';

import { RatingService } from '../application';

@Controller()
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get(apiConfig.rating.getRatingBoard)
  public async getRatingBoard() {
    return await this.ratingService.getRatingBoard();
  }
}
