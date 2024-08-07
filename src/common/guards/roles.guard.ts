// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor() {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const token = request.headers.authorization?.replace('Bearer ', ''); // Obtén el token JWT del encabezado

      if (!token) {
        console.error('No se proporcionó ningún token JWT'); // Log de error si no hay token
        return false; // No hay token, acceso denegado
      }

      // Verifica si el token JWT ha expirado
      const decodedToken = await admin.auth().verifyIdToken(token);
      const nowInSeconds = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < nowInSeconds) {
        console.error('El token JWT ha expirado'); // Log de error si el token ha expirado
        return false; // El token ha expirado, acceso denegado
      }

      // Verifica el claim 'roles' y los roles necesarios
      if (
        !decodedToken.roles ||
        !Array.isArray(decodedToken.roles) ||
        decodedToken.roles.length === 0
      ) {
        console.error('El token JWT no contiene roles válidos'); // Log de error si el token no tiene roles válidos
        return false; // El token no contiene roles válidos, acceso denegado
      }

      // Verifica si el usuario tiene el rol necesario (por ejemplo, 'admin')
      const requiredRole = 'admin';
      if (!decodedToken.roles.includes(requiredRole)) {
        console.error(`El usuario no tiene el rol necesario (${requiredRole})`); // Log de error si el usuario no tiene el rol necesario
        return false; // El usuario no tiene el rol necesario, acceso denegado
      }

      return true; // El usuario tiene los roles necesarios y el token no ha expirado, acceso permitido
    } catch (error) {
      console.error('Error al verificar roles en el token:', error); // Log de error general si ocurre una excepción
      return false; // Manejo de errores, acceso denegado por precaución
    }
  }
}
