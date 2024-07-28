import { DeleteInterestController } from '@/controllers/delete-interest-controller';
import { Controller } from '@/controllers/ports';
import { makeInterestRepository } from '../repository/make-interest-repository';
import { DeleteInterest } from '@/usecases/delete-interest';
import { makeThemeRepository } from '../repository/make-theme-repository';

export const makeDeleteInterestController = (): Controller => {
  const interestRepository = makeInterestRepository();
  const themeRepository = makeThemeRepository();
  const useCase = new DeleteInterest(interestRepository, themeRepository);
  return new DeleteInterestController(useCase);
};
