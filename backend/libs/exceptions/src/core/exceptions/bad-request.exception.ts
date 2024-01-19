import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base.exception';

export class BadRequestException extends BaseException {
  constructor(description = null) {
    super('badRequest', HttpStatus.BAD_REQUEST, description);
  }
}
