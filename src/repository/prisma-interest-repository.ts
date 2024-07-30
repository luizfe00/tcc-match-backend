import { Interest } from '@/models/interest';
import { InterestRepository } from '@/usecases/ports/interest-repository';
import prismaClient from './prisma-client';
import { User } from '@/interfaces/user';
import { SystemRoles } from '@/constants/Roles';

export class PrismaInterestRepository implements InterestRepository {
  async add(interest: Interest): Promise<Interest> {
    const userConnect = interest.professorId
      ? {
          professor: {
            connect: {
              id: interest.professorId,
            },
          },
        }
      : {
          student: {
            connect: {
              id: interest.studentId,
            },
          },
        };

    return await prismaClient.interest.create({
      data: {
        text: interest.text,
        theme: {
          connect: {
            id: interest.themeId,
          },
        },
        ...userConnect,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prismaClient.interest.delete({
      where: { id },
    });
  }

  async findById(id: string): Promise<Interest> {
    return await prismaClient.interest.findUnique({
      where: { id },
    });
  }

  async findAllByThemeId(id: string): Promise<Interest[]> {
    return await prismaClient.interest.findMany({
      where: {
        themeId: id,
      },
    });
  }

  async findAllByUserId(id: string): Promise<Interest[]> {
    return await prismaClient.interest.findMany({
      where: {
        OR: [{ studentId: id }, { professorId: id }],
      },
    });
  }

  async findByThemeIdAndUser(themeId: string, user: User): Promise<Interest> {
    const searchTerm = user.role === SystemRoles.STUDENT ? 'studentId' : 'professorId';
    return await prismaClient.interest.findFirst({
      where: {
        AND: [{ themeId }, { [searchTerm]: user.id }],
      },
    });
  }
}
