import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { InsertMessageDto } from './dto/message.dto';

@Controller('chatroom')
export class ChatroomController {
  constructor(private readonly chatroomService: ChatroomService) {}
  @Get()
  async getAllChatRooms() {
    return await this.chatroomService.getAll();
  }

  @Get('/:id')
  async getChatRoom(@Param() { id }: { id: string }) {
    return await this.chatroomService.getOne(+id);
  }

  @Post()
  async createChatroom(@Body() createChatroomDto: CreateChatroomDto) {
    console.log(JSON.stringify(createChatroomDto));
    return await this.chatroomService.createChatroom(createChatroomDto);
  }

  @Post('/message/:id')
  async addMessage(
    @Param() { id }: { id: string },
    @Body() insertMessageDto: InsertMessageDto,
  ) {
    return await this.chatroomService.addMessage(id, insertMessageDto);
  }
}
