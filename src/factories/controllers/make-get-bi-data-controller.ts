import { Controller } from '@/controllers/ports';
import { GetBIData } from '@/usecases/get-bi-data';
import { GetBIDataController } from '@/controllers/get-bi-data-controller';
import { makeBiDashboardRepository } from '../repository/make-bi-dashboard-repository';

export const makeGetBIDataController = (): Controller => {
  const biRepository = makeBiDashboardRepository();
  const useCase = new GetBIData(biRepository);
  return new GetBIDataController(useCase);
};
