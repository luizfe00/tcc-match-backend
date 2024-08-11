import { StagePayload, Stage, UpdateStagePayload } from '@/models/stage';
import { StageRepostiory } from '@/usecases/ports/stage-repository';
import prismaClient from './prisma-client';
import { StageBI } from '@/interfaces/BI';

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

  async update(stage: UpdateStagePayload): Promise<void> {
    await prismaClient.stage.update({
      where: {
        id: stage.id,
      },
      data: {
        viewed: stage?.viewed,
        label: stage?.label,
        feedback: stage?.feedback,
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

  async listPending(userId: string): Promise<Stage[]> {
    return await prismaClient.stage.findMany({
      where: {
        AND: [
          {
            paper: {
              professorId: userId,
            },
          },
          {
            OR: [{ viewed: false }, { feedback: null }],
          },
        ],
      },
      include: {
        paper: {
          include: {
            theme: true,
            orientee: true,
          },
        },
      },
    });
  }

  async findById(id: string): Promise<Stage> {
    return await prismaClient.stage.findUnique({
      where: {
        id,
      },
      include: {
        paper: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prismaClient.stage.delete({
      where: { id },
    });
  }

  async getBIData(): Promise<StageBI> {
    const stageData = await prismaClient.stage.findMany({
      select: {
        viewed: true,
        feedback: true,
      },
    });

    let stagesCount = stageData.length;
    let stagesRespondedCount = 0;
    let stagesViewedCount = 0;

    stageData.forEach((data) => {
      const { feedback, viewed } = data;
      if (feedback) {
        stagesRespondedCount++;
      }
      if (viewed) {
        stagesViewedCount++;
      }
    });

    return {
      stagesCount,
      stagesRespondedCount,
      stagesViewedCount,
    };
  }
}
