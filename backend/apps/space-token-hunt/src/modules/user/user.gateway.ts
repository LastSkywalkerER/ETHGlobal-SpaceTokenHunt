import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/user' })
export class UserGateway {
  private readonly connectedMap = new Map<string, Socket>();
  constructor() {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    const { userUuid } = client.handshake.query;
    this.connectedMap.set(userUuid as string, client);
  }

  async handleDisconnect(client: Socket) {
    const { userUuid } = client.handshake.query;
    this.connectedMap.delete(userUuid as string);
  }

  emitUserData(data: any) {
    const socket = this.connectedMap.get(data.uuid);
    if (socket) socket.emit('Update', data);
  }
}
