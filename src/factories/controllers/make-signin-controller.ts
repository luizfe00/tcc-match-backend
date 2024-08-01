import { Controller } from '@/controllers/ports';
import { SignIn } from '@/usecases/signin';
import { SignInController } from '@/controllers/sigin-in-controller';
import { makeUserRepository } from '../repository/make-user-repository';

export const makeSignInController = (): Controller => {
  const userRepository = makeUserRepository();
  const useCase = new SignIn(userRepository);
  const signInController = new SignInController(useCase);
  return signInController;
};
