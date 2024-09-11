import { ListUserPapersController } from '@/controllers/list-user-papers-controller';
import { Controller } from '@/controllers/ports';
import { makePaperRepository } from '../repository/make-paper-repository';
import { ListUserPapers } from '@/usecases/list-user-papers';

export const makeListUserPapersController = (): Controller => {
  const paperRepository = makePaperRepository();
  const useCase = new ListUserPapers(paperRepository);
  return new ListUserPapersController(useCase);
};
