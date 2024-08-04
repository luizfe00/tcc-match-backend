import { StagePayload, Stage } from '@/models/stage';
import { StageRepostiory } from '@/usecases/ports/stage-repository';
import prismaClient from './prisma-client';

export class PrismaStageRepository implements StageRepostiory {
  async add(stage: StagePayload): Promise<Stage> {
    return await prismaClient.stage.create({
      data: {
        label: stage.label,
        paper: {
          connect: {
            id: stage.paperId,
          },
        },
      },
    });
  }

  async listByPaper(paperId: string): Promise<Stage[]> {
    return await prismaClient.stage.findMany({
      where: {
        paperId,
      },
    });
  }
}
