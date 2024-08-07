// roles.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import * as admin from 'firebase-admin';

@Injectable()
export class RolesStrategy extends PassportStrategy(Strategy, 'roles') {
  constructor() {
    super();
  }

  async validate(
    request: any,
    done: (error: any, roles?: string[]) => void,
  ): Promise<void> {
    try {
      const token = request.headers.authorization?.replace('Bearer ', ''); // Obtén el token JWT del encabezado

      if (!token) {
        throw new UnauthorizedException('Token no proporcionado');
      }

      // Verifica el token y obtén los claims del usuario desde Firebase Authentication
      const claims = await admin.auth().verifyIdToken(token);

      // Verifica si el claim 'roles' existe y es un array válido
      if (!claims.roles || !Array.isArray(claims.roles)) {
        throw new UnauthorizedException('Token no contiene roles válidos');
      }

      // Extrae los roles del claim personalizado 'roles'
      const roles: string[] = claims.roles;

      // Aquí puedes realizar más validaciones según tus necesidades, como verificar si el usuario tiene un rol específico

      done(null, roles);
    } catch (error) {
      console.error('Error de autenticación:', error);
      throw new UnauthorizedException('No autorizado');
    }
  }
}
