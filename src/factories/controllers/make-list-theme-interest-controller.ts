import { ListThemeInterestsController } from '@/controllers/list-theme-interest-controller';
import { Controller } from '@/controllers/ports';
import { ListThemeInterests } from '@/usecases/list-theme-interest';
import { makeThemeRepository } from '../repository/make-theme-repository';
import { makeInterestRepository } from '../repository/make-interest-repository';

export const makeListInterestController = (): Controller => {
  const themeRepository = makeThemeRepository();
  const interestRepository = makeInterestRepository();
  const useCase = new ListThemeInterests(interestRepository, themeRepository);
  return new ListThemeInterestsController(useCase);
};
