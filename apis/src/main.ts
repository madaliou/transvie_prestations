import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config(); // charge .env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true, // utile si tu veux envoyer des cookies ou headers sécurisés
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Server is running on http://localhost:${port}`);
}
bootstrap();
