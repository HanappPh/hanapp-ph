/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

/* eslint-disable @typescript-eslint/no-var-requires, import/order, import/first */
// Load environment variables before anything else
const dotenv = require('dotenv');
const path = require('path');

// When running from dist folder (npm start), go up one level to find .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });
// Also try from process.cwd() for nx serve
dotenv.config({ path: path.resolve(process.cwd(), 'apps/api/.env') });
/* eslint-enable @typescript-eslint/no-var-requires, import/order, import/first */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Enable CORS for Next.js frontend
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:4200'], // Add your frontend URLs
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id'],
  });

  const config = new DocumentBuilder()
    .setTitle('HanApp-PH API')
    .setDescription(
      'The HanApp-PH API documentation - Your startup API endpoints'
    )
    .setVersion('1.0')
    .addTag('hanapp', 'Main application endpoints')
    .addTag('health', 'Health check endpoints')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    customSiteTitle: 'HanApp-PH API Docs',
    customfavIcon: '/favicon.ico',
    customCss: `
      .topbar-wrapper .link {
        content: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
        width: 120px;
        height: auto;
      }
      .swagger-ui .topbar { background-color: #1976d2; }
    `,
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.log(`Swagger API Documentation: http://localhost:${port}/api-docs`);
}

bootstrap();
