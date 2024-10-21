import { CreateThemeController } from '@/controllers/create-theme-controller';
import { Controller } from '@/controllers/ports';
import { CreateTheme } from '@/usecases/create-theme';
import { makeThemeRepository } from '../repository/make-theme-repository';
import { makeUserRepository } from '../repository/make-user-repository';

export const makeCreateThemeController = (): Controller => {
  const themeRepository = makeThemeRepository();
  const userRepository = makeUserRepository();
  const useCase = new CreateTheme(themeRepository, userRepository);
  return new CreateThemeController(useCase);
};
