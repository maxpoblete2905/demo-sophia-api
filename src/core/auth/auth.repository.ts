import { Observable } from 'rxjs';
import { Response } from '@globals';

export abstract class AuthRepository {
  abstract resetPassword(email: string): any;
}
