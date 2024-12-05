import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import { AddMessageDto } from './dto/add-message.dto';
import { ChatroomService } from 'src/chatroom/chatroom.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatroomService: ChatroomService) {}
  @WebSocketServer()
  server: Server;

  private logger = new Logger('ChatGateway');

  @SubscribeMessage('chat')
  async handleMessage(
    @MessageBody() payload: AddMessageDto,
  ): Promise<AddMessageDto> {
    const message = {
      message: payload.body,
      user: payload.author,
      time: payload.time,
    };

    this.logger.log(
      `Message received: ${JSON.stringify(payload.author)} - ${payload.body} - ${payload.time} - ${payload.id}`,
    );
    await this.chatroomService.addMessage(payload.id, message);
    await this.server.emit('chat', { message: message, id: payload.id });
    return payload;
  }

  handleConnection(socket: Socket) {
    this.logger.log(`Socket connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    this.logger.log(`Socket disconnected: ${socket.id}`);
  }
}
