import { CreateInterestController } from '@/controllers/create-interest-controller';
import { Controller } from '@/controllers/ports';
import { makeInterestRepository } from '../repository/make-interest-repository';
import { CreateInterest } from '@/usecases/create-interest';

export const makeCreateInterestController = (): Controller => {
  const interestRepository = makeInterestRepository();
  const useCase = new CreateInterest(interestRepository);
  return new CreateInterestController(useCase);
};
