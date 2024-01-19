import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base.exception';

export class UnauthorizedException extends BaseException {
  constructor(description = null) {
    super('unauthorized', HttpStatus.UNAUTHORIZED, description);
  }
}
