import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { join } from 'path';
import env from './env';
import AppModule from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());

  app.useStaticAssets(join(process.cwd(), 'src/assets'), { prefix: '/assets' });

  await app.listen(env.PORT, env.HOSTNAME);

  Logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
