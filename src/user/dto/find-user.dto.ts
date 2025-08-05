import { IsNotEmpty } from 'class-validator';

export class FindUserDto {
  @IsNotEmpty({ message: '用户ID不能为空' })
  userid: string;
}