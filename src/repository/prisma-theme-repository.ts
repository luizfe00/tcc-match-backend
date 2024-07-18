import { Theme } from '@/models/theme';
import { ThemeRepository } from '@/usecases/ports/theme-repository';
import prismaClient from './prisma-client';
import { SystemRole, SystemRoles } from '@/constants/Roles';

export class PrismaThemeRepository implements ThemeRepository {
  async add(theme: Theme, role: SystemRole): Promise<Theme> {
    return await prismaClient.theme.create({
      data: {
        label: theme.label,
        ...{
          ...(role === SystemRoles.STUDENT
            ? { student: { connect: { id: theme.studentId } } }
            : { professor: { connect: { id: theme.professorId } } }),
        },
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
      },
    });
  }

  async findById(id: string): Promise<Theme | undefined> {
    return await prismaClient.theme.findUnique({
      where: { id },
    });
  }

  async findByUser(userId: string, role: SystemRole): Promise<Theme[]> {
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
}
