import { PrismaThemeRepository } from '@/repository/prisma-theme-repository';
import { ThemeRepository } from '@/usecases/ports/theme-repository';

export const makeThemeRepository = (): ThemeRepository => {
  return new PrismaThemeRepository();
};
