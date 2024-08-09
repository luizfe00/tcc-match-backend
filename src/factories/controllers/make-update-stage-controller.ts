import { Controller } from '@/controllers/ports';
import { makeStageRepository } from '../repository/make-stage-repository';
import { UpdateStage } from '@/usecases/update-stage';
import { UpdateStageController } from '@/controllers/update-stage-controller';

export const makeUpdateStageController = (): Controller => {
  const stageRepository = makeStageRepository();
  const useCase = new UpdateStage(stageRepository);
  return new UpdateStageController(useCase);
};
