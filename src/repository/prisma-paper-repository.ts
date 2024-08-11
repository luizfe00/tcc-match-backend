import { PaperPayload, Paper } from '@/models/paper';
import { PaperRepository } from '@/usecases/ports/paper-repository';
import prismaClient from './prisma-client';
import { PaperBI } from '@/interfaces/BI';

export class PrismaPaperRepository implements PaperRepository {
  async add(paper: PaperPayload): Promise<Paper> {
    return await prismaClient.paper.create({
      data: {
        documentUrl: paper?.documentUrl,
        theme: {
          connect: {
            id: paper.themeId,
          },
        },
        orientee: {
          connect: {
            id: paper.studentId,
          },
        },
        advisor: {
          connect: {
            id: paper.professorId,
          },
        },
      },
    });
  }

  async update(paper: Partial<Paper>): Promise<void> {
    await prismaClient.paper.update({
      where: {
        id: paper.id,
      },
      data: {
        documentUrl: paper?.documentUrl,
      },
    });
  }

  async findByThemeId(id: string): Promise<Paper> {
    return await prismaClient.paper.findUnique({
      where: {
        themeId: id,
      },
    });
  }

  async listByUser(userId: string): Promise<Paper[]> {
    return await prismaClient.paper.findMany({
      where: {
        OR: [{ professorId: userId }, { studentId: userId }],
      },
      include: {
        advisor: true,
        orientee: true,
        theme: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prismaClient.paper.delete({
      where: {
        id,
      },
    });
  }

  async findById(id: string): Promise<Paper> {
    return await prismaClient.paper.findUnique({
      where: { id },
      include: {
        advisor: true,
        orientee: true,
        stages: true,
        theme: true,
      },
    });
  }

  async getPaperData(): Promise<PaperBI> {
    const paperData = await prismaClient.paper.findMany({
      include: {
        approvals: true,
      },
    });

    let papersCount = paperData.length;
    let papersApprovedCount = 0;
    let ptccCount = 0;
    let ptccApprovedCount = 0;
    let tccCount = 0;
    let tccApprovedCount = 0;

    paperData.forEach((data) => {
      const { type, approvals } = data;

      if (approvals?.length) {
        papersApprovedCount++;
      }

      if (type === 'PTCC') {
        ptccCount++;
        if (approvals?.length) {
          ptccApprovedCount++;
        }
      } else if (type === 'TCC') {
        tccCount++;
        if (approvals?.length) {
          tccApprovedCount++;
        }
      }
    });

    return {
      papersApprovedCount,
      papersCount,
      ptccApprovedCount,
      ptccCount,
      tccApprovedCount,
      tccCount,
    };
  }
}
