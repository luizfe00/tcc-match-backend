import { ListAllPapersController } from '@/controllers/list-all-papers-controller';
import { Controller } from '@/controllers/ports';
import { PrismaPaperRepository } from '@/repository/prisma-paper-repository';
import { ListAllPapers } from '@/usecases/list-all-papers';

export const makeListAllPapersController = (): Controller => {
  const repository = new PrismaPaperRepository();
  const useCase = new ListAllPapers(repository);
  return new ListAllPapersController(useCase);
};
