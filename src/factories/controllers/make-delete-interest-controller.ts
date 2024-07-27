import { DeleteInterestController } from '@/controllers/delete-interest-controller';
import { Controller } from '@/controllers/ports';
import { makeInterestRepository } from '../repository/make-interest-repository';
import { DeleteInterest } from '@/usecases/delete-interest';

export const makeDeleteInterestController = (): Controller => {
  const interestRepository = makeInterestRepository();
  const useCase = new DeleteInterest(interestRepository);
  return new DeleteInterestController(useCase);
};
