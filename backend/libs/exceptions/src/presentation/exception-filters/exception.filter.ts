import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { BaseException } from '../../core';

@Catch(BaseException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: BaseException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      name: exception.getSerializedName(),
      statusCode: status,
      timestamp: new Date().toISOString(),
      description: exception.getDescription(),
    });
  }
}
