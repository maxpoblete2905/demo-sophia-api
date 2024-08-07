import { Injectable } from '@nestjs/common';
import { SendPasswordResetEmailUseCase } from './use-cases/send-password-reset-email.use-case';
import { EmailResetPasswordDto } from './dtos/email-reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly sendPasswordResetEmailUseCase: SendPasswordResetEmailUseCase,
  ) {}

  async sendPasswordResetEmail(
    sendPasswordResetEmailDto: EmailResetPasswordDto,
  ) {
    return this.sendPasswordResetEmailUseCase.execute(
      sendPasswordResetEmailDto,
    );
  }
}
