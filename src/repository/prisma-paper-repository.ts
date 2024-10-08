import { PaperPayload, Paper } from '@/models/paper';
import { PaperRepository } from '@/usecases/ports/paper-repository';
import prismaClient from './prisma-client';
import { addDays } from 'date-fns';

export class PrismaPaperRepository implements PaperRepository {
  async add(paper: PaperPayload): Promise<Paper> {
    return await prismaClient.paper.create({
      data: {
        ptccDocumentUrl: paper?.documentUrl,
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
      data:
        paper.type === 'PTCC'
          ? { ptccDocumentUrl: paper.documentUrl }
          : { tccDocumentUrl: paper.documentUrl },
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
        approvals: true,
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
        approvals: true,
      },
    });
  }

  async findAll(): Promise<Paper[]> {
    const prisma = prismaClient.$extends({
      result: {
        theme: {
          endDate: {
            needs: {
              startDate: true,
              duration: true,
            },
            compute: (theme) => {
              return addDays(theme.startDate, theme.duration);
            },
          },
        },
      },
    });

    const papers = await prisma.paper.findMany({
      include: {
        advisor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        orientee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        theme: {
          select: {
            categories: true,
            id: true,
            label: true,
            summary: true,
            duration: true,
            startDate: true,
            endDate: true,
            owner: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return papers.sort((a, b) => {
      return a.theme.endDate.getTime() - b.theme.endDate.getTime();
    });
  }
}
