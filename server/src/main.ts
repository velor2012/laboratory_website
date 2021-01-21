import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './lib/swagger.service';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // 处理跨域
  app.enableCors();
  //设置路由前缀
  app.setGlobalPrefix('api');
  //设置静态资源位置
  app.useStaticAssets(join(__dirname, '..', 'static'));
  initSwagger(app)
  await app.listen(3000);
}
bootstrap();
