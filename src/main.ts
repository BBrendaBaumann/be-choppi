import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  const origins = (process.env.CORS_ORIGINS || '').split(',').map(o => o.trim()).filter(Boolean);

  app.enableCors({
    origin: origins.length ? origins : ['http://localhost:3001', 'http://localhost:3000', 'https://fe-choppi.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type',
  'Authorization',
  'Accept',
  'Cache-Control',
  'X-Requested-With',
  'Origin',],
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true,}));

  const config = new DocumentBuilder()
    .setTitle('Choppi API')
    .setDescription('API Swagger for Choppi MVP')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  logger.log(`Server running on http://localhost:${port}`);
  logger.log(`Swagger: http://localhost:${port}/api`);
  logger.log(`🔑 JWT expires in: ${process.env.JWT_EXPIRES_IN}s`);
}

bootstrap();
