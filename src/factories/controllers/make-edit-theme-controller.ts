import { EditThemeController } from '@/controllers/edit-theme-controller';
import { Controller } from '@/controllers/ports';
import { EditTheme } from '@/usecases/edit-theme';
import { makeThemeRepository } from '../repository/make-theme-repository';

export const makeEditThemeController = (): Controller => {
  const themeRepository = makeThemeRepository();
  const useCase = new EditTheme(themeRepository);
  return new EditThemeController(useCase);
};
