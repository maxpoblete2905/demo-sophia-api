import { FastifyRequest } from 'fastify';
import { User } from '@auth/meta-types';

declare module 'fastify' {
  interface FastifyRequest {
    user?: User;
  }
}
