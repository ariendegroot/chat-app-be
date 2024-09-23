import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Message } from './message.entity';

@Entity()
export class Chatroom {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column('jsonb', { nullable: true })
  users: User[];
  @Column('jsonb', { nullable: true })
  messages: Message[];
}
