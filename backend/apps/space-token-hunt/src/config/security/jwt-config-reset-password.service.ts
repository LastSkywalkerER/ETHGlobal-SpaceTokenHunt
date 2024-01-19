import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

import { Config } from '../configuration.type';

@Injectable()
export class JwtConfigResetPasswordService implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService<Config>) {}

  public createJwtOptions(): JwtModuleOptions {
    const { jwtSecret: secret } =
      this.configService.get<Config['security']>('security');

    return { secret };
  }
}
