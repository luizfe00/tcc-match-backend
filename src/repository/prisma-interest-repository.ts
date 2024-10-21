import { CreateInterestPayload, Interest } from '@/models/interest';
import { InterestRepository } from '@/usecases/ports/interest-repository';
import prismaClient from './prisma-client';
import { UserSignIn } from '@/interfaces/user';
import { Paper, PaperPayload } from '@/models/paper';
import { User } from '@/models/user';
import { PaperRepository } from '@/usecases/ports/paper-repository';
import { ThemeRepository } from '@/usecases/ports/theme-repository';
import { Role } from '@prisma/client';

export class PrismaInterestRepository implements InterestRepository {
  constructor(
    private readonly paperRepository: PaperRepository,
    private readonly themeRepository: ThemeRepository
  ) {}

  async add(interest: CreateInterestPayload): Promise<Interest> {
    return await prismaClient.interest.create({
      data: {
        text: interest.text,
        theme: {
          connect: {
            id: interest.themeId,
          },
        },
        owner: {
          connect: {
            id: interest.ownerId,
          },
        },
      },
      include: {
        owner: true,
        theme: true,
      },
    });
  }
  async approve(ptcc: PaperPayload, user?: User): Promise<Paper> {
    return await prismaClient.$transaction(async () => {
      const paper = await this.paperRepository.add(ptcc);
      if (user?.role === Role.STUDENT) {
        await this.deleteAllByUserId(ptcc.studentId);
      }
      await this.themeRepository.softDelete(ptcc.themeId);
      await this.deleteAllByThemeId(ptcc.themeId);
      return paper;
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
      include: {
        owner: true,
      },
    });
  }

  async findAllByUserId(id: string): Promise<Interest[]> {
    return await prismaClient.interest.findMany({
      where: {
        ownerId: id,
      },
      include: {
        theme: true,
        owner: true,
      },
    });
  }

  async findByThemeIdAndUser(themeId: string, user: UserSignIn): Promise<Interest> {
    return await prismaClient.interest.findFirst({
      where: {
        AND: [{ themeId }, { ownerId: user.id }],
      },
    });
  }

  async deleteAllByUserId(id: string): Promise<void> {
    await prismaClient.interest.deleteMany({
      where: {
        ownerId: id,
      },
    });
  }

  async deleteAllByThemeId(id: string): Promise<void> {
    await prismaClient.interest.deleteMany({
      where: {
        themeId: id,
      },
    });
  }
}
