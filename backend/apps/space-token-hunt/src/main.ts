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

  // Safety net: a transient Sepolia RPC failure surfaces as an unhandled
  // rejection from ethers' batch provider (outside any try/catch) and would
  // otherwise crash the whole server. Log and keep running instead.
  process.on('unhandledRejection', (reason) => {
    new Logger('UnhandledRejection').error(reason);
  });
  process.on('uncaughtException', (error) => {
    new Logger('UncaughtException').error(error);
  });

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://space-token-hunt.vercel.app',
      'http://spacetokenhunt.blockchain-core-group.com',
      'https://spacetokenhunt.blockchain-core-group.com',
    ],
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
  const host = process.env.HOST ?? '0.0.0.0';

  await app.listen(port, host);
  logger.log(`SpaceTokenHunt service is running on http://${host}:${port}`);
}

bootstrap();
