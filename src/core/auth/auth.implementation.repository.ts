import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import * as admin from 'firebase-admin';
import { MailService } from '../mails/mail.service';

@Injectable()
export class AuthImplementationRepository implements AuthRepository {
  constructor(private readonly mailService: MailService) {}

  async resetPassword(email: string) {
    // const link = await admin.auth().generatePasswordResetLink(email);
    this.mailService.sendUserConfirmation(email, 'token', 'link');
    console.log('enviando email');
  }
}
