import { GetProfessorBIDataController } from '@/controllers/get-professor-bi-data-controller';
import { Controller } from '@/controllers/ports';
import { GetProfessorBIData } from '@/usecases/get-professor-bi-data';
import { makeBiDashboardRepository } from '../repository/make-bi-dashboard-repository';

export const makeGetProfessorBiDataController = (): Controller => {
  const biRepository = makeBiDashboardRepository();
  const useCase = new GetProfessorBIData(biRepository);
  const controller = new GetProfessorBIDataController(useCase);
  return controller;
};
