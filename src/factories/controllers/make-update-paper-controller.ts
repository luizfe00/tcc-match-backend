import { Controller } from '@/controllers/ports';
import { makePaperRepository } from '../repository/make-paper-repository';
import { UpdatePaper } from '@/usecases/update-paper';
import { UpdatePaperController } from '@/controllers/create-update-paper-controller';

export const makeUpdatePaperController = (): Controller => {
  const paperRepository = makePaperRepository();
  const useCase = new UpdatePaper(paperRepository);
  return new UpdatePaperController(useCase);
};
