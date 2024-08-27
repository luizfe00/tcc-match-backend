import { Theme } from '@/models/theme';
import { ThemeRepository } from '@/usecases/ports/theme-repository';
import prismaClient from './prisma-client';
import { Role } from '@prisma/client';
import { ThemeBI } from '@/interfaces/BI';

export class PrismaThemeRepository implements ThemeRepository {
  async add(theme: Theme): Promise<Theme> {
    return await prismaClient.theme.create({
      data: {
        label: theme.label,
        summary: theme.summary,
        startDate: theme.startDate,
        endDate: theme.endDate,
        owner: {
          connect: {
            id: theme.ownerId,
          },
        },
      },
      include: {
        owner: true,
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
        label: theme?.label,
        summary: theme?.summary,
        startDate: theme?.startDate,
        endDate: theme?.endDate,
        categories: {
          set:
            theme.categories?.map((category) => ({
              id: category.id,
            })) || [],
        },
      },
    });
  }

  async findById(id: string): Promise<Theme | undefined> {
    return await prismaClient.theme.findUnique({
      where: { id },
    });
  }

  async findByUser(userId: string, label: string): Promise<Theme | undefined> {
    return await prismaClient.theme.findUnique({
      where: {
        ownerId: userId,
        label,
      },
    });
  }

  async findAllByUser(userId: string): Promise<Theme[]> {
    return await prismaClient.theme.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        interests: {
          include: {
            owner: true,
          },
        },
        paper: true,
        owner: true,
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
        owner: {
          NOT: [
            {
              role: Role.STUDENT,
            },
          ],
        },
        deletedAt: null,
      },
      include: {
        owner: true,
        interests: true,
        paper: true,
      },
    });
  }

  async listAllStudents(): Promise<Theme[]> {
    return await prismaClient.theme.findMany({
      where: {
        owner: {
          role: Role.STUDENT,
        },
        deletedAt: null,
      },
      include: {
        owner: true,
        interests: true,
        paper: true,
      },
    });
  }

  async listDeletedByUserId(id: string): Promise<Theme[]> {
    return await prismaClient.theme.findMany({
      where: {
        ownerId: id,
        deletedAt: {
          not: null,
        },
      },
      include: {
        owner: true,
      },
    });
  }
}
