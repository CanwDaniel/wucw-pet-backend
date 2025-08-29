import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, BadRequestException, Inject, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto'; 
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
// import { JwtService } from '@nestjs/jwt';
import { LoginGuard } from '../login.guard';

import * as path from 'path';
import { storage } from 'src/my-file-storage';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Inject(JwtService)
  // private jwtService: JwtService;

  @Post('add')
  @UseGuards(LoginGuard)
  add(@Body() createUserDto: CreateUserDto) {
    return this.userService.add(createUserDto);
  }

  @Get('list')
  @UseGuards(LoginGuard)
  async list(
    @Query('pageNo') pageNo: number,
    @Query('pageSize') pageSize: number,
    @Query('username') username: string
  ) {
    return this.userService.list(username, pageNo, pageSize);
  }

  @Post('delete')
  @UseGuards(LoginGuard)
  remove(@Body() findUserDto: FindUserDto) {
    return this.userService.remove(findUserDto.userid);
  }

  @Post('upload')
  @UseGuards(LoginGuard)
  @UseInterceptors(FileInterceptor('file', {
    dest: 'uploads',
    // 指定怎么存储
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 3
    },
    fileFilter(req, file, callback) {
      const extname = path.extname(file.originalname);
      if(['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(extname)) {
        // callback第一个参数是error，第二个参数是是否接收文件
        callback(null, true);
      } else {
        callback(new BadRequestException('只能上传图片'), false);
      }
    }
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    return file.path.replace('\\', '/');
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    return this.userService.findOne(loginDto);
  }
}
