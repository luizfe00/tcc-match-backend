import { PTCC } from '@/models/ptcc';
import { PTCCRepository } from '@/usecases/ports/ptcc-repository';
import prismaClient from './prisma-client';

export class PrismaPTCCRepository implements PTCCRepository {
  async add(ptcc: PTCC): Promise<PTCC> {
    return await prismaClient.pTCC.create({
      data: {
        documentUrl: ptcc?.documentUrl ?? '',
        endDate: ptcc.endDate,
        startDate: ptcc.startDate,
        professor: {
          connect: {
            id: ptcc.professorId,
          },
        },
        student: {
          connect: {
            id: ptcc.studentId,
          },
        },
        theme: {
          connect: {
            id: ptcc.themeId,
          },
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prismaClient.pTCC.delete({
      where: { id },
    });
  }

  async findAllByProfessorId(id: string): Promise<PTCC[]> {
    return await prismaClient.pTCC.findMany({
      where: {
        professorId: id,
      },
      include: {
        stages: true,
        student: true,
        theme: true,
      },
    });
  }

  async findById(id: string): Promise<PTCC> {
    return await prismaClient.pTCC.findUnique({
      where: {
        id,
      },
    });
  }

  async softDelete(id: string): Promise<void> {
    await prismaClient.pTCC.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async update(ptcc: PTCC): Promise<void> {
    await prismaClient.pTCC.update({
      where: {
        id: ptcc.id,
      },
      data: {
        approved: ptcc.approved,
        documentUrl: ptcc.documentUrl,
        startDate: ptcc.startDate,
        endDate: ptcc.endDate,
      },
    });
  }

  async findByThemeId(id: string): Promise<PTCC> {
    return await prismaClient.pTCC.findUnique({
      where: {
        themeId: id,
      },
    });
  }
}
