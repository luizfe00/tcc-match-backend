import { ListUserThemesController } from '@/controllers/list-user-themes-controller';
import { Controller } from '@/controllers/ports';
import { ListUserThemes } from '@/usecases/list-user-themes';
import { makeThemeRepository } from '../repository/make-theme-repository';

export const makeListUserThemesController = (): Controller => {
  const themeRepository = makeThemeRepository();
  const useCase = new ListUserThemes(themeRepository);
  return new ListUserThemesController(useCase);
};
