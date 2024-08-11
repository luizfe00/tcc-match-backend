import { Controller } from '@/controllers/ports';
import { makePaperRepository } from '../repository/make-paper-repository';
import { GetBIData } from '@/usecases/get-bi-data';
import { GetBIDataController } from '@/controllers/get-bi-data-controller';
import { makeThemeRepository } from '../repository/make-theme-repository';
import { makeInterestRepository } from '../repository/make-interest-repository';
import { makeStageRepository } from '../repository/make-stage-repository';

export const makeGetBIDataController = (): Controller => {
  const paperRepository = makePaperRepository();
  const themeRepository = makeThemeRepository();
  const interestRepository = makeInterestRepository();
  const stageRepository = makeStageRepository();
  const useCase = new GetBIData(
    paperRepository,
    themeRepository,
    interestRepository,
    stageRepository
  );
  return new GetBIDataController(useCase);
};
