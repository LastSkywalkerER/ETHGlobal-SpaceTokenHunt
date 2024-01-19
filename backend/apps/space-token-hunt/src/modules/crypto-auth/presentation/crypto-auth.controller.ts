import { Controller, Post, Body, Res, Get, Req } from '@nestjs/common';
import { apiConfig } from '@space-token-hunt/core';
import * as cookie from 'cookie';
import { Response, Request } from 'express';

import { CryptoAuthService } from '../application';

import { LoginUserDto } from './dtos/login-user.dto';
import { VerifyMessageDto } from './dtos/verify-message.dto';

@Controller()
export class CryptoAuthController {
  constructor(private readonly cryptoAuthService: CryptoAuthService) {}

  @Post(apiConfig.cryptoAuth.authLogin)
  async authLogin(@Body() loginUserDTO: LoginUserDto): Promise<any> {
    try {
      return this.cryptoAuthService.challengeLoginMessage(loginUserDTO);
    } catch (error) {
      throw error;
    }
  }

  @Post(apiConfig.cryptoAuth.verifyMessage)
  async verifyMessage(
    @Body() verifyMessageDto: VerifyMessageDto,
    @Res() res: Response,
  ): Promise<any> {
    const tokens = await this.cryptoAuthService.verifyMessage(verifyMessageDto);
    res.cookie('accessToken', tokens.accessToken, { httpOnly: true });
    res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });

    res.json({
      success: true,
    });
  }

  @Get(apiConfig.cryptoAuth.refreshToken)
  async refreshTokens(@Res() res: Response, @Req() req: Request): Promise<any> {
    const cookies = cookie.parse(req.headers.cookie || '');
    const refreshToken = cookies.refreshToken;
    const tokens = await this.cryptoAuthService.refreshTokens(refreshToken);

    res.cookie('accessToken', tokens.accessToken, { httpOnly: true });
    res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });

    res.json({
      success: true,
    });
  }

  @Get(apiConfig.cryptoAuth.logout)
  async logout(@Req() req: Request, @Res() res: Response): Promise<any> {
    const cookies = cookie.parse(req.headers.cookie || '');
    const accessToken = cookies.accessToken;

    await this.cryptoAuthService.deleteTokens(accessToken);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.json({
      success: true,
    });
  }
}
