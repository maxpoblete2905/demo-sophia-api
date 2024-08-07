import { registerAs } from '@nestjs/config';

export default registerAs('sendgrid', () => ({
  apiKey: process.env.SENDGRID_API_KEY,
  senderAddress: process.env.MAIL_SENDER_ADDRESS,
  actionsUrl: process.env.FIREBASE_AUTH_ACTIONS_URL,
  resetPasswordUrl: process.env.RESET_PASSWORD_URL,
}));
