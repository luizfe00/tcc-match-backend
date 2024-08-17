import { GetUserController } from '@/controllers/get-user-controller';
import { Controller } from '@/controllers/ports';
import { GetUser } from '@/usecases/get-user';
import { makeUserRepository } from '../repository/make-user-repository';

export const makeGetUserController = (): Controller => {
  const userRepository = makeUserRepository();
  const useCase = new GetUser(userRepository);
  return new GetUserController(useCase);
};
