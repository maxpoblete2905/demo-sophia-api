import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { resolve } from 'path';
import { cwd } from 'process';
import { readFile } from 'fs/promises';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(
    username: string,
    token: string,
    linkResetPasswordFirebase: string,
  ) {
    const url = `example.com/auth/confirm?token=${token}`;
    const assetsPath = resolve(cwd(), 'dist/assets/email/');
    const logoPath = resolve(cwd(), 'dist/assets/images/Logo.svg');
    const templatePath = resolve(assetsPath, 'templates', `confirmation.html`);

    const logoFile = await readFile(logoPath);
    const logoAttachment = {
      filename: 'Logo.svg',
      content: logoFile.toString('base64'),
      encoding: 'base64',
      cid: 'logo',
      content_type: 'image/svg+xml',
      disposition: 'inline',
    };

    await this.mailerService.sendMail({
      to: username,
      subject: 'Welcome to App! Confirm your Email',
      template: templatePath, // Asegúrate de que esta ruta sea correcta
      context: {
        username,
        url: linkResetPasswordFirebase,
      },
      attachments: [logoAttachment],
    });
  }
}
