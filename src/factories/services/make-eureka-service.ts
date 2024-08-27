import { EurekaService } from '@/external/EurekaService';

export const makeEurekaService = (): EurekaService => {
  return new EurekaService();
};
