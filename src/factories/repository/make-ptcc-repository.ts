import { PrismaPTCCRepository } from '@/repository/prisma-ptcc-repository';
import { PTCCRepository } from '@/usecases/ports/ptcc-repository';

export const makePTCCRepository = (): PTCCRepository => {
  return new PrismaPTCCRepository();
};
