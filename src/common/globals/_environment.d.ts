import { z } from 'nestjs-zod/z';
import { EnvSchema } from '@config/validate';

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof EnvSchema> {}
  }
}
