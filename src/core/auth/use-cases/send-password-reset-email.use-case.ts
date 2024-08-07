import { Injectable } from '@nestjs/common';
import { EmailResetPasswordDto } from '../dtos/email-reset-password.dto';
import { AuthRepository } from '../auth.repository';
import { UseCase } from '../../../common/base/use-case';

@Injectable()
export class SendPasswordResetEmailUseCase
  implements UseCase<EmailResetPasswordDto, string>
{
  constructor(private readonly userRepository: AuthRepository) {}

  async execute({ email }: EmailResetPasswordDto): Promise<string> {
    return this.userRepository.resetPassword(email);
  }
}
