import { Theme } from '@/models/theme';
import { ThemeRepository } from '@/usecases/ports/theme-repository';
import prismaClient from './prisma-client';
import { SystemRole, SystemRoles } from '@/constants/Roles';

export class PrismaThemeRepository implements ThemeRepository {
  async add(theme: Theme, role: SystemRole): Promise<Theme> {
    return await prismaClient.theme.create({
      data: {
        label: theme.label,
        duration: theme.duration,
        summary: theme.summary,
        ...{
          ...(role === SystemRoles.STUDENT
            ? { student: { connect: { id: theme.studentId } } }
            : { professor: { connect: { id: theme.professorId } } }),
        },
      },
    });
  }

  async softDelete(id: string): Promise<void> {
    await prismaClient.theme.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prismaClient.theme.delete({
      where: {
        id,
      },
    });
  }

  async edit(id: string, theme: Partial<Theme>): Promise<void> {
    await prismaClient.theme.update({
      where: { id },
      data: {
        label: theme.label,
        duration: theme.duration,
        summary: theme.summary,
      },
    });
  }

  async findById(id: string): Promise<Theme | undefined> {
    return await prismaClient.theme.findUnique({
      where: { id },
    });
  }

  async findByUser(userId: string, role: SystemRole, label: string): Promise<Theme | undefined> {
    return await prismaClient.theme.findUnique({
      where: {
        ...{
          ...(role === SystemRoles.STUDENT ? { studentId: userId } : { professorId: userId }),
          label,
        },
      },
    });
  }

  async findAllByUser(userId: string, role: SystemRole): Promise<Theme[]> {
    return await prismaClient.theme.findMany({
      where: {
        ...{
          ...(role === SystemRoles.STUDENT ? { studentId: userId } : { professorId: userId }),
        },
      },
    });
  }

  async findBylabel(label: string): Promise<Theme[]> {
    return await prismaClient.theme.findMany({
      where: {
        label: {
          contains: label,
        },
      },
    });
  }

  async list(): Promise<Theme[]> {
    return await prismaClient.theme.findMany();
  }

  async listAllProfessors(): Promise<Theme[]> {
    return await prismaClient.theme.findMany({
      where: {
        professorId: {
          not: null,
        },
      },
      include: {
        professor: {
          select: {
            email: true,
            id: true,
            name: true,
            vacancies: true,
          },
        },
      },
    });
  }

  async listAllStudents(): Promise<Theme[]> {
    return await prismaClient.theme.findMany({
      where: {
        studentId: {
          not: null,
        },
      },
      include: {
        student: true,
        paperProposition: true,
        paper: true,
      },
    });
  }
}
