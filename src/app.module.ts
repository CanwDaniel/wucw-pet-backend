import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/User.entity';
import { UserAuthority } from './user/entities/Authority.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "petpet",
      database: "pet_pet",
      // 防止覆盖现有数据库结构
      synchronize: true,
      logging: true,
      entities: [User, UserAuthority],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
          authPlugin: 'sha256_password',
      }
    }),

    JwtModule.register({
      global: true,
      secret: 'petpet'
    })
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
