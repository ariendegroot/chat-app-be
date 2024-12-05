import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chatroom } from './entitities/chatroom.entity';
import { ChatroomService } from './chatroom.service';
import { ChatroomController } from './chatroom.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Chatroom])],
  providers: [ChatroomService],
  controllers: [ChatroomController],
  exports: [ChatroomService],
})
export class ChatroomModule {}
