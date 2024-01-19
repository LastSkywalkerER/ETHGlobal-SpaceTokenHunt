import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base.exception';

export class NotFoundException extends BaseException {
  constructor(description = null) {
    super('notFound', HttpStatus.NOT_FOUND, description);
  }
}
