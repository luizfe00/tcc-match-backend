import { PaperPayload, Paper } from '@/models/paper';
import { PaperRepository } from '@/usecases/ports/paper-repository';
import prismaClient from './prisma-client';

export class PrismaPaperRepository implements PaperRepository {
  async add(paper: PaperPayload): Promise<Paper> {
    return await prismaClient.paper.create({
      data: {
        endDate: paper.endDate,
        startDate: paper.startDate,
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
        approved: false,
      },
    });
  }

  async update(paper: Partial<Paper>): Promise<void> {
    await prismaClient.paper.update({
      where: {
        id: paper.id,
      },
      data: {
        approved: paper?.approved,
        documentUrl: paper?.documentUrl,
        startDate: paper?.startDate,
        endDate: paper?.endDate,
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
    });
  }

  async delete(id: string): Promise<void> {
    await prismaClient.paper.delete({
      where: {
        id,
      },
    });
  }
}
