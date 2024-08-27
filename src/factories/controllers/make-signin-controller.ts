import { Controller } from '@/controllers/ports';
import { SignIn } from '@/usecases/signin';
import { SignInController } from '@/controllers/sigin-in-controller';
import { makeUserRepository } from '../repository/make-user-repository';
import { makeEurekaService } from '../services/make-eureka-service';

export const makeSignInController = (): Controller => {
  const userRepository = makeUserRepository();
  const eurekaService = makeEurekaService();
  const useCase = new SignIn(userRepository, eurekaService, 'secret');
  const signInController = new SignInController(useCase);
  return signInController;
};
