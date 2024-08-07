import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { EmailResetPasswordDto } from './dtos/email-reset-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-password-reset-email')
  @ApiOperation({ summary: 'Send a password reset email' })
  @ApiBody({ type: EmailResetPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Password reset email sent successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async recoveryPassword(
    @Body() sendPasswordResetEmailDto: EmailResetPasswordDto,
  ) {
    return this.authService.sendPasswordResetEmail(sendPasswordResetEmailDto);
  }
}
