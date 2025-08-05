import { IsNotEmpty, MinLength } from 'class-validator';
import { Entity } from 'typeorm';

@Entity('user')
export class CreateUserDto {
  userid: string;
  
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;
  
  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, { message: '密码长度不能小于6位' })
  password: string;

  @IsNotEmpty({ message: '性别不能为空' })
  gender: number;

  @IsNotEmpty({ message: '手机号不能为空' })
  phone: number;

  avatar: string;

  @IsNotEmpty({ message: '用户类型不能为空' })
  usertype: number;

  birthday: Date;
}
