import { CreateStageController } from '@/controllers/create-stage-controller';
import { CreateStage } from '@/usecases/create-stage';
import { makePaperRepository } from '../repository/make-paper-repository';
import { makeStageRepository } from '../repository/make-stage-repository';

export const makeCreateStageController = (): CreateStageController => {
  const paperRepository = makePaperRepository();
  const stageRepository = makeStageRepository();
  const useCase = new CreateStage(paperRepository, stageRepository);
  return new CreateStageController(useCase);
};
