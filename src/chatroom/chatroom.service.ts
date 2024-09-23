import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chatroom } from './entitities/chatroom.entity';
import { In, Repository } from 'typeorm';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { InsertMessageDto } from './dto/message.dto';
import { createClient } from '@supabase/supabase-js';

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

  async getChatroomsForUser(email: string) {
    const query = this.chatroomRepository
      .createQueryBuilder('chatroom')
      .where('chatroom.users @> CAST(:email AS jsonb)', {
        email: JSON.stringify([{ email }]),
      });

    return query.getMany();
  }

  async getOtherChatrooms(email: string) {
    const query = this.chatroomRepository
      .createQueryBuilder('chatroom')
      .where('NOT chatroom.users @> CAST(:email AS jsonb)', {
        email: JSON.stringify([{ email }]),
      });

    return query.getMany();
  }

  createChatroom(createChatroomDto: CreateChatroomDto) {
    const chatroom = this.chatroomRepository.create({
      name: createChatroomDto.name,
      users: createChatroomDto.users,
      messages: [],
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

  async getUserList() {
    const supabase_url = 'https://yhnecpwwpjnyxeguefvi.supabase.co';
    const service_role_key =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlobmVjcHd3cGpueXhlZ3VlZnZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjQ4ODM0NywiZXhwIjoyMDQyMDY0MzQ3fQ.FSQ20YKcVmaPVMkYmjl78D7TPbUfcaePD7dC7MjCXxA';

    const supabase = createClient(supabase_url, service_role_key, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Access auth admin api
    const userList = await supabase.auth.admin.listUsers();
    return userList.data.users.map((user) => {
      return {
        id: user.id,
        email: user.email,
        name: user.user_metadata.full_name,
        image: user.user_metadata.avatar_url,
      };
    });
  }

  async getUserById(id: string) {
    const supabase_url = 'https://yhnecpwwpjnyxeguefvi.supabase.co';
    const service_role_key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    const supabase = createClient(supabase_url, service_role_key, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
    // Access auth admin api
    const user = await supabase.auth.admin.getUserById(id);
    return user;
  }
}
