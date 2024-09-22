import { GetSystemConfigController } from '@/controllers/config/get-system-config-controller';
import { Controller } from '@/controllers/ports';
import { makeSystemConfigRepository } from '@/factories/repository/make-system-config-repository';
import { GetSystemConfig } from '@/usecases/config/get-system-config';

export const makeGetSystemConfigController = (): Controller => {
  const repository = makeSystemConfigRepository();
  const useCase = new GetSystemConfig(repository);
  return new GetSystemConfigController(useCase);
};
