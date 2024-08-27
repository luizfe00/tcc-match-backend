import { PrismaBIRepository } from '@/repository/prisma-bi-repository';
import { BIRepository } from '@/usecases/ports/bi-repository';

export const makeBiDashboardRepository = (): BIRepository => {
  return new PrismaBIRepository();
};
