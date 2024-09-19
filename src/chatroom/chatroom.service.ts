import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chatroom } from './entitities/chatroom.entity';
import { Repository } from 'typeorm';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { InsertMessageDto } from './dto/message.dto';
@Injectable()
export class ChatroomService {
  constructor(
    @InjectRepository(Chatroom)
    private readonly chatroomRepository: Repository<Chatroom>,
  ) {}

  getAll() {
    return this.chatroomRepository.find();
  }

  async getOne(id: number) {
    const chatroom = await this.chatroomRepository.findOne({ where: { id } });
    if (!chatroom) throw new NotFoundException('Chatroom not found');
    return chatroom;
  }

  createChatroom(createChatroomDto: CreateChatroomDto) {
    const chatroom = this.chatroomRepository.create({
      name: createChatroomDto.name,
      users: createChatroomDto.users,
    });
    return this.chatroomRepository.save(chatroom);
  }

  async addMessage(id: string, InsertMessageDto: InsertMessageDto) {
    const chatroom = await this.getOne(+id);
    if (!chatroom) throw new NotFoundException('Chatroom not found');
    if (!chatroom.messages) chatroom.messages = [];
    chatroom.messages = [...chatroom.messages, InsertMessageDto];
    return this.chatroomRepository.save(chatroom);
  }
}
