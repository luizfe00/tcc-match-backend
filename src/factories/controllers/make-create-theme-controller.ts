import { CreateThemeController } from '@/controllers/create-theme-controller';
import { Controller } from '@/controllers/ports';
import { CreateTheme } from '@/usecases/create-theme';
import { makeThemeRepository } from '../repository/make-theme-repository';

export const makeCreateThemeController = (): Controller => {
  const themeRepository = makeThemeRepository();
  const useCase = new CreateTheme(themeRepository);
  return new CreateThemeController(useCase);
};
