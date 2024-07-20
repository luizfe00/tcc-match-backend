import { AuthenticationValidation } from '@/usecases/validations/authentication';
import { Validator } from './validator';

export const createAuthenticationValidator = (): Validator => {
  return new AuthenticationValidation();
};
