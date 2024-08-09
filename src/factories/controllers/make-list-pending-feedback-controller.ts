import { Controller } from '@/controllers/ports';
import { makeStageRepository } from '../repository/make-stage-repository';
import { ListPendingFeedback } from '@/usecases/list-pending-feedback';
import { ListPendingFeedbackController } from '@/controllers/list-pending-feedback-controller';

export const makeListPendingFeedbackController = (): Controller => {
  const stageRepository = makeStageRepository();
  const useCase = new ListPendingFeedback(stageRepository);
  return new ListPendingFeedbackController(useCase);
};
