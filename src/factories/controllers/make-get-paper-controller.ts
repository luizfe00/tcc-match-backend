import { Controller } from '@/controllers/ports';
import { makePaperRepository } from '../repository/make-paper-repository';
import { GetPaper } from '@/usecases/get-paper';
import { GetPaperController } from '@/controllers/get-paper-controller';

export const makeGetPaperController = (): Controller => {
  const paperRepository = makePaperRepository();
  const useCase = new GetPaper(paperRepository);
  return new GetPaperController(useCase);
};
