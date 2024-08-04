import { Controller } from '@/controllers/ports';
import { makePaperRepository } from '../repository/make-paper-repository';
import { makeStageRepository } from '../repository/make-stage-repository';
import { ListPaperStages } from '@/usecases/list-paper-stages';
import { ListPaperStagesController } from '@/controllers/list-paper-stages-controller';

export const makeListPaperStagesController = (): Controller => {
  const paperRepository = makePaperRepository();
  const stageRepository = makeStageRepository();
  const useCase = new ListPaperStages(paperRepository, stageRepository);
  return new ListPaperStagesController(useCase);
};
