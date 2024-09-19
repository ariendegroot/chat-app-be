import { Type } from 'class-transformer';
import { User } from '../entitities/user.entity';
import { IsString, ValidateNested } from 'class-validator';
export class InsertMessageDto {
  @IsString()
  readonly time: string;
  @IsString()
  readonly message: string;
  @Type(() => User)
  @ValidateNested({ each: true })
  user: User;
}
