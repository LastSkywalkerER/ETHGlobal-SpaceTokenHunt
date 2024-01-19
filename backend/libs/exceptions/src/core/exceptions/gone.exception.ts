import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base.exception';

export class GoneException extends BaseException {
  constructor(description = null) {
    super('gone', HttpStatus.GONE, description);
  }
}
