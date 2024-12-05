import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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
  @Get('/userlist')
  async getUserList() {
    return await this.chatroomService.getUserList();
  }

  @Get('/userlist/:id')
  async getUserById(@Query() { id }: { id: string }) {
    return await this.chatroomService.getUserById(id);
  }

  @Get('/user')
  async getChatroomsForUser(@Query() { email }: { email: string }) {
    console.log(email);
    return await this.chatroomService.getChatroomsForUser(email);
  }

  @Get('/other')
  async getOtherChatrooms(@Query() { email }: { email: string }) {
    console.log(email);
    return await this.chatroomService.getOtherChatrooms(email);
  }

  @Get('/:id')
  async getChatRoom(@Param() { id }: { id: string }) {
    return await this.chatroomService.getOne(+id);
  }

  @Post()
  async createChatroom(@Body() createChatroomDto: CreateChatroomDto) {
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
