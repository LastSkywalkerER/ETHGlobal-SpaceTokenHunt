import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {
  HttpExceptionFilter,
  exceptionFactory,
} from 'space-token-hunt/exceptions';

import { AppModule } from './app.module';
import { Config } from './config';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'https://space-token-hunt.vercel.app/'],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory,
      forbidUnknownValues: false,
      transform: true,
    }),
  );
  const configService = app.get<ConfigService<Config>>(ConfigService);
  const { port } = configService.get<Config['application']>('application');

  await app.listen(port);
  logger.log(`SpaceTokenHunt service is running on ${await app.getUrl()}`);
}

bootstrap();
