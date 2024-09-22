import { UpdateSystemConfigController } from '@/controllers/config/update-system-config-controller';
import { Controller } from '@/controllers/ports';
import { makeSystemConfigRepository } from '@/factories/repository/make-system-config-repository';
import { UpdateSystemConfig } from '@/usecases/config/update-system-config';

export const makeUpdateSystemConfigController = (): Controller => {
  const repository = makeSystemConfigRepository();
  const useCase = new UpdateSystemConfig(repository);
  return new UpdateSystemConfigController(useCase);
};
