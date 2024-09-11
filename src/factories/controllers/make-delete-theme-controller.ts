import { DeleteThemeController } from '@/controllers/delete-theme-controller';
import { Controller } from '@/controllers/ports';
import { DeleteTheme } from '@/usecases/delete-theme';
import { makeThemeRepository } from '../repository/make-theme-repository';

export const makeDeleteThemeController = (): Controller => {
  const themeRepository = makeThemeRepository();
  const useCase = new DeleteTheme(themeRepository);
  return new DeleteThemeController(useCase);
};
