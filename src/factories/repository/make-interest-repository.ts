import { PrismaInterestRepository } from '@/repository/prisma-interest-repository';
import { InterestRepository } from '@/usecases/ports/interest-repository';

export const makeInterestRepository = (): InterestRepository => {
  return new PrismaInterestRepository();
};
