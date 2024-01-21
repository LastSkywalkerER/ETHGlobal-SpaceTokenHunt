import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { UserService } from './application';
import { UserGateway } from './user.gateway';

@Injectable()
export class UserEventHandler {
  constructor(
    private readonly userService: UserService,
    private readonly userGateway: UserGateway,
  ) {}

  @OnEvent('Update')
  async handleUserEvent(payload) {
    console.log({ payload });
    const { data } = payload;
    if (data?.user) {
      const userData = await this.userService.getUserByAdress(data?.user);
      if (userData) {
        const userInfo = await this.userService.getCurrentUserData(
          userData.uuid,
        );
        return this.userGateway.emitUserData(userInfo);
      }
    }
  }
}
