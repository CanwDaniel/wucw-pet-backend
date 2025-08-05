import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  add(@Body() createUserDto: CreateUserDto) {
    return this.userService.add(createUserDto);
  }

  @Get('list')
  async list(
    @Query('pageNo') pageNo: number,
    @Query('pageSize') pageSize: number,
    @Query('username') username: string
  ) {
    return this.userService.list(username, pageNo, pageSize);
  }

  @Delete('delete')
  remove(@Body() findUserDto: FindUserDto) {
    return this.userService.remove(findUserDto.userid);
  }
}
