import { EurecaService } from '@/external/EurecaService';

export const makeEurekaService = (): EurecaService => {
  return new EurecaService();
};
