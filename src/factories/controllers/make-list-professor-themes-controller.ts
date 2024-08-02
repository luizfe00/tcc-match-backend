import { ListProfessorThemesController } from '@/controllers/list-professor-themes-controller';
import { Controller } from '@/controllers/ports';
import { ListProfessorThemes } from '@/usecases/list-professor-themes';
import { makeThemeRepository } from '../repository/make-theme-repository';

export const makeListProfessorThemesController = (): Controller => {
  const themeRepository = makeThemeRepository();
  const useCase = new ListProfessorThemes(themeRepository);
  return new ListProfessorThemesController(useCase);
};
