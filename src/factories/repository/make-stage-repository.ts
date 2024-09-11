import { PrismaStageRepository } from '@/repository/prisma-stage-repository';
import { StageRepostiory } from '@/usecases/ports/stage-repository';

export const makeStageRepository = (): StageRepostiory => {
  return new PrismaStageRepository();
};
