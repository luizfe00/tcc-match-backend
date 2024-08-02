import { GetUserController } from '@/controllers/get-user-controller';
import { Controller } from '@/controllers/ports';
import { GetUser } from '@/usecases/get-user';

export const makeGetUserController = (): Controller => {
  const useCase = new GetUser();
  return new GetUserController(useCase);
};
