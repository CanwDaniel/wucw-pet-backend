import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PickType(CreateUserDto, ['username', 'password', 'phone', 'gender', 'usertype']) {
  @IsNotEmpty({ message: '用户ID不能为空' })
  user_id: string;
}
