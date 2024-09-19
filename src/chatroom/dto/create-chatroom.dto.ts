import { IsString, ValidateNested } from 'class-validator';
import { User } from '../entitities/user.entity';
import { Type } from 'class-transformer';

export class CreateChatroomDto {
  @IsString()
  readonly name: string;
  @Type(() => User)
  @ValidateNested({ each: true })
  users: User[];
}
