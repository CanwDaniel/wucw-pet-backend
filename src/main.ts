import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { FormatResponseInterceptor } from './format-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();

  // 将目录设置为静态文件目录,这样能直接访问上传的图片
  app.useStaticAssets('uploads', {
    prefix: '/uploads'
  });

  // 响应内容的拦截器
  app.useGlobalInterceptors(new FormatResponseInterceptor());

  // 参数校验
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
