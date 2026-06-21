import { Logger } from '@nestjs/common';
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
  private readonly logger = new Logger(ShipGateway.name);
  private readonly connectedMap = new Map<string, Socket>();
  constructor(
    private readonly shipDomain: ShipDomain,
    private readonly ratingService: RatingService,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    const { userUuid } = client.handshake.query;
    if (!userUuid) {
      return;
    }
    try {
      this.connectedMap.set(userUuid as string, client);
      const position = await this.shipDomain.getCurrentUserShipPosition({
        userUuid: userUuid as string,
      });
      if (!position) {
        await this.shipDomain.createShipPosition({
          userId: userUuid as string,
          x: 0,
          y: 0,
          z: 0,
        });
      }
    } catch (error) {
      this.logger.error(
        `handleConnection failed for ${userUuid}: ${error?.message}`,
      );
    }
  }

  async handleDisconnect(client: Socket) {
    const { userUuid } = client.handshake.query;
    if (!userUuid) {
      return;
    }
    this.connectedMap.delete(userUuid as string);
    try {
      const position = await this.shipDomain.getTemporaryShipPosition({
        userId: userUuid as string,
      });

      // Persist the last known position only when we actually have one.
      // On a fresh connect/disconnect there may be no temporary position yet,
      // and writing null coordinates violates the NOT NULL constraint.
      if (
        position &&
        position.x != null &&
        position.y != null &&
        position.z != null
      ) {
        await this.shipDomain.updateShipPosition({
          userId: userUuid as string,
          x: position.x,
          y: position.y,
          z: position.z,
        });
      }

      await this.ratingService.createRatingRecord({
        userId: userUuid as string,
      });
      await this.shipDomain.deleteTemporaryShipPosition({
        userId: userUuid as string,
      });
    } catch (error) {
      this.logger.error(
        `handleDisconnect failed for ${userUuid}: ${error?.message}`,
      );
    }
  }

  @SubscribeMessage('shipPosition')
  async handleShipPosition(
    @MessageBody() position: { x: number; y: number; z: number },
    @ConnectedSocket() client: Socket,
  ) {
    const { userUuid } = client.handshake.query;
    if (!userUuid || !position) {
      return;
    }

    try {
      await this.shipDomain.deleteTemporaryShipPosition({
        userId: userUuid as string,
      });
      await this.shipDomain.createTemporaryShipPosition({
        userId: userUuid as string,
        x: position.x,
        y: position.y,
        z: position.z,
      });
    } catch (error) {
      this.logger.error(
        `handleShipPosition failed for ${userUuid}: ${error?.message}`,
      );
    }
  }
}
