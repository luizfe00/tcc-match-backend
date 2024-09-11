import { CreateInterestPayload, Interest } from '@/models/interest';
import { InterestRepository } from '@/usecases/ports/interest-repository';
import prismaClient from './prisma-client';
import { UserSignIn } from '@/interfaces/user';
import { InterestBI } from '@/interfaces/BI';

export class PrismaInterestRepository implements InterestRepository {
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

  async approve(interestId: string): Promise<void> {
    await prismaClient.interest.update({
      where: {
        id: interestId,
      },
      data: {
        approved: true,
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
