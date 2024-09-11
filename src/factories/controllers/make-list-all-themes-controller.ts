import { ListAllThemesController } from '@/controllers/list-all-themes-controller';
import { Controller } from '@/controllers/ports';
import { PrismaThemeRepository } from '@/repository/prisma-theme-repository';
import { ListAllThemes } from '@/usecases/list-all-themes';

export const makeListAllThemesController = (): Controller => {
  const themeRepository = new PrismaThemeRepository();
  const listAllThemes = new ListAllThemes(themeRepository);
  return new ListAllThemesController(listAllThemes);
};
