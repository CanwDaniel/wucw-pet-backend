import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, Like } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/User.entity';
// import { UserAuthority } from './entities/Authority.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private manager: EntityManager;

  @Inject(JwtService)
  private jwtService: JwtService;

  // 新增用户
  async add(createUserDto: CreateUserDto) {
    if (createUserDto.userid) {
      try {
        this.update(createUserDto.userid, createUserDto);

        return new HttpException('更新成功', HttpStatus.OK);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    } else {
      try {
        this.manager.save(User, createUserDto);

        return new HttpException('添加成功', HttpStatus.OK);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  }

  // 更新用户信息
  async update(id: string, createUserDto: CreateUserDto) {
    const { username, password, phone, gender, avatar, usertype, birthday } =
      createUserDto;
    await this.manager.update(User, id, {
      username,
      password,
      phone,
      gender,
      avatar,
      usertype,
      birthday,
    });
  }

  // 查询用户信息
  async list(username: string, pageNo: number, pageSize: number) {
    const skipCount = (pageNo - 1) * pageSize;

    const condition: Record<string, any> = {};

    if (username) {
      condition.username = Like(`%${username}%`);
    }

    const [user, totalCount] = await this.manager.findAndCount(User, {
      select: [
        'userid',
        'username',
        'phone',
        'gender',
        'birthday',
        'avatar',
        'usertype',
      ],
      skip: skipCount,
      take: pageSize,
      where: condition,
    });

    return {
      user,
      totalCount,
    };
  }

  // 删除用户信息
  async remove(id: string) {
    const user = await this.manager.findOne(User, { where: { userid: id } });

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }

    await this.manager.delete(User, { userid: id });

    return new HttpException('删除成功', HttpStatus.OK);
  }

  // 查找单个用户的名称跟密码是否正确
  async findOne(loginParams) {
    const user = await this.manager.findOne(User, {
      where: {
        username: loginParams.username,
        password: loginParams.password
      },
    });

    if (!user) {
      throw new HttpException('用户名或密码错误', HttpStatus.BAD_REQUEST);
    }

    const jwt = this.jwtService.sign(
      {
        username: loginParams.username,
      },
      {
        secret: 'petpet',
        expiresIn: '7d',
      },
    );

    const data = {
      userlist: user,
      token: jwt
    }

    return data;
  }
}
