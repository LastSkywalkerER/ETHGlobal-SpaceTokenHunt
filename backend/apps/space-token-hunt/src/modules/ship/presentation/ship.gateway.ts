import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { RatingService } from '../../rating/application';
import { ShipDomain } from '../domain';

@WebSocketGateway({ namespace: '/ship' })
export class ShipGateway {
  private readonly connectedMap = new Map<string, Socket>();
  constructor(
    private readonly shipDomain: ShipDomain,
    private readonly ratingService: RatingService,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    const { userUuid } = client.handshake.query;
    this.connectedMap.set(userUuid as string, client);
    const position = await this.shipDomain.getCurrentUserShipPosition({
      userUuid: userUuid as string,
    });
    if (userUuid && !position) {
      await this.shipDomain.createShipPosition({
        userId: userUuid as string,
        x: 0,
        y: 0,
        z: 0,
      });
    }
  }

  async handleDisconnect(client: Socket) {
    const { userUuid } = client.handshake.query;
    this.connectedMap.delete(userUuid as string);
    const { x, y, z } = await this.shipDomain.getTemporaryShipPosition({
      userId: userUuid as string,
    });
    await this.shipDomain.updateShipPosition({
      userId: userUuid as string,
      x,
      y,
      z,
    });
    await this.ratingService.createRatingRecord({ userId: userUuid as string });
    await this.shipDomain.deleteTemporaryShipPosition({
      userId: userUuid as string,
    });
  }

  @SubscribeMessage('shipPosition')
  async handleShipPosition(
    @MessageBody() position: { x: number; y: number; z: number },
    @ConnectedSocket() client: Socket,
  ) {
    const { userUuid } = client.handshake.query;

    await this.shipDomain.deleteTemporaryShipPosition({
      userId: userUuid as string,
    });
    await this.shipDomain.createTemporaryShipPosition({
      userId: userUuid as string,
      x: position.x,
      y: position.y,
      z: position.z,
    });
  }
}
