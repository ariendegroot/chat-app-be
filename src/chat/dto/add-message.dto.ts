import { User } from "src/chatroom/entitities/user.entity";

export class AddMessageDto {
  author: User;
  body: string;
  time: string;
  id: string;
}
