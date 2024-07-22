import { ListStudentThemesController } from '@/controllers/list-student-themes-controller';
import { Controller } from '@/controllers/ports';
import { ListAllStudentThemes } from '@/usecases/list-all-student-themes';
import { makeThemeRepository } from '../repository/make-theme-repository';

export const makeListStudentThemesController = (): Controller => {
  const themeRepository = makeThemeRepository();
  const useCase = new ListAllStudentThemes(themeRepository);
  return new ListStudentThemesController(useCase);
};
