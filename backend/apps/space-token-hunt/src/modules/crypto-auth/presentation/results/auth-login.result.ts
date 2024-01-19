import { AuthLoginDto } from '../dtos';
import { AuthLoginError } from '../errors';

export class AuthLoginResult {
  data?: AuthLoginDto;

  error?: AuthLoginError;
}
