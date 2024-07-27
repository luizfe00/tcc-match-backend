import { ListUserInterestController } from '@/controllers/list-user-interest-controller';
import { Controller } from '@/controllers/ports';
import { makeInterestRepository } from '../repository/make-interest-repository';
import { ListUserInterest } from '@/usecases/list-user-interest';

export const makeListUserInterestController = (): Controller => {
  const interestRepository = makeInterestRepository();
  const useCase = new ListUserInterest(interestRepository);
  return new ListUserInterestController(useCase);
};
