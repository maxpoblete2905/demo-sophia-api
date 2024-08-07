import { z } from 'nestjs-zod/z';
import { Logger } from '@nestjs/common';

export const EnvSchema = z.object({
  GOOGLE_APPLICATION_CREDENTIALS: z.string(),
  PORT: z.string().default('3000'),
  SENDGRID_API_KEY: z.string(),
  MAIL_SENDER_ADDRESS: z.string(),
  FIREBASE_AUTH_ACTIONS_URL: z.string(),
  RESET_PASSWORD_URL: z.string(),
  ROUTE_PREFIX: z.string().default('api'),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
});

export const validate = (config: Record<string, unknown>) => {
  const result = EnvSchema.safeParse(config);

  if (!result.success) {
    for (const { path, message } of result.error.issues) {
      Logger.error(`${path}: ${message}`, 'Environment');
    }
    process.exit(1);
  }

  return result.data;
};
