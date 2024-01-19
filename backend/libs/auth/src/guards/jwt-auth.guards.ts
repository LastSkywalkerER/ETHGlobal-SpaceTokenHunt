import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as cookie from 'cookie';
import { UnauthorizedException } from 'space-token-hunt/exceptions';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.accessToken;
    try {
      if (!token) {
        throw new UnauthorizedException({ message: 'user is not authorized' });
      }
      const user = this.jwtService.verify(token);
      req.user = user;
      return true;
    } catch (e) {
      return false;
    }
  }
}
