import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatroomModule } from './chatroom/chatroom.module';
import { Chatroom } from './chatroom/entitities/chatroom.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.SUPABASE_HOST,
      port: 5432,
      password: process.env.SUPABASE_PASSWORD,
      username: process.env.SUPABASE_USERNAME,
      entities: [Chatroom],
      database: 'postgres',
      synchronize: true,
    }),
    ChatroomModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
