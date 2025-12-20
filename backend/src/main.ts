import 'dotenv/config';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { SESSION_COOKIE_NAME } from './modules/auth/constants/session.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: true,
      // allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
      // allowedHeaders: '*',
      // methods: '*',
      // exposedHeaders: 'Set-Cookie',
      // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      // origin: "*",
    },
  });
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addCookieAuth(SESSION_COOKIE_NAME)
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    yamlDocumentUrl: 'api/api.yaml',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
