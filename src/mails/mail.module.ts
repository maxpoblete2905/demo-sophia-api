// src/mail/mail.module.ts
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com', // Cambia esto por tu servidor SMTP
        port: 587,
        secure: false, // true para 465, false para otros puertos
        auth: {
          user: 'max.poblete2905@gmail.com', // Cambia esto por tu usuario SMTP
          pass: `xzvk aopj qnfo udlr`, // Cambia esto por tu contraseña SMTP
        },
      },
      defaults: {
        from: '"Nooo Reply" <noreply@example.com>', // Cambia esto por tu dirección de correo por defecto
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // Puedes usar otros adaptadores como Pug o EJS
        options: {
          strict: true,
        },
      },
    }),
  ],

  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
