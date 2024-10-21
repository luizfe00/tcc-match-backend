import { PrismaInterestRepository } from '@/repository/prisma-interest-repository';
import { InterestRepository } from '@/usecases/ports/interest-repository';
import { makeThemeRepository } from './make-theme-repository';
import { makePaperRepository } from './make-paper-repository';

export const makeInterestRepository = (): InterestRepository => {
  const paperRepository = makePaperRepository();
  const themeRepository = makeThemeRepository();
  return new PrismaInterestRepository(paperRepository, themeRepository);
};
