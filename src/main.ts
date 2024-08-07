import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './core/app.module';
import { fastifyCors } from '@fastify/cors';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import admin from 'firebase-admin';

async function bootstrap() {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });

  const fastifyAdapter = new FastifyAdapter();
  const fastifyInstance = fastifyAdapter.getInstance();

  // Registrar el middleware de CORS
  await fastifyInstance.register(fastifyCors, {
    origin: true,
  });

  // Crear la aplicación NestJS con FastifyAdapter
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );

  // Obtener ConfigService y configurar el prefijo global de rutas
  const configService = app.get(ConfigService);
  const routePrefix = configService.getOrThrow<string>('ROUTE_PREFIX');
  app.setGlobalPrefix(routePrefix);

  // Configuración de Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Documentation Sophia')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('api sophia')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(routePrefix, app, document);

  // Obtener el puerto de las variables de entorno y escuchar en ese puerto
  const port = configService.getOrThrow<string>('PORT');
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
