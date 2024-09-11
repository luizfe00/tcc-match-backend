import { Controller } from '@/controllers/ports';
import { makeThemeRepository } from '../repository/make-theme-repository';
import { ListDeletedThemes } from '@/usecases/list-deleted-themes';
import { ListDeletedThemesController } from '@/controllers/list-deleted-themes-controller';

export const makeListDeletedThemesController = (): Controller => {
  const themeRepository = makeThemeRepository();
  const useCase = new ListDeletedThemes(themeRepository);
  return new ListDeletedThemesController(useCase);
};
