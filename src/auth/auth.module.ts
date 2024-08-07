import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthImplementationRepository } from './auth.implementation.repository';
import { SendPasswordResetEmailUseCase } from './use-cases/send-password-reset-email.use-case';
import { AuthRepository } from './auth.repository';
import { MailModule } from '../mails/mail.module';

@Module({
  imports: [MailModule],
  controllers: [AuthController],
  providers: [
    SendPasswordResetEmailUseCase,
    AuthService,
    { provide: AuthRepository, useClass: AuthImplementationRepository },
  ],
})
export class AuthModule {}
