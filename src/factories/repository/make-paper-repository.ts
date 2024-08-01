import { PrismaPaperRepository } from '@/repository/prisma-paper-repository';
import { PaperRepository } from '@/usecases/ports/paper-repository';

export const makePaperRepository = (): PaperRepository => {
  return new PrismaPaperRepository();
};
