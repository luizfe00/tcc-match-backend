import { CreateUser, User } from '@/models/user';
import { UserRepository } from '@/usecases/ports/user-repository';
import prismaClient from './prisma-client';
import { Role } from '@prisma/client';

export class PrismaUserRepository implements UserRepository {
  async add(user: CreateUser): Promise<User> {
    return await prismaClient.user.create({
      data: {
        email: user.email,
        enrollment: user.enrollment,
        name: user.name,
        role: user.role,
      },
    });
  }

  async update(user: User): Promise<void> {
    await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: user?.email,
        enrollment: user?.enrollment,
        name: user?.name,
        role: user?.role,
        vacancies: user?.vacancies,
      },
    });
  }

  async getUserById(id: string): Promise<User> {
    return await prismaClient.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getUserByEnrollment(enrollment: string): Promise<User> {
    return await prismaClient.user.findUnique({
      where: {
        enrollment,
      },
      include: {
        orienteePaper: true,
      },
    });
  }

  async listProfessors(): Promise<User[]> {
    return await prismaClient.user.findMany({
      where: {
        NOT: [
          {
            role: Role.STUDENT,
          },
        ],
      },
    });
  }

  async listStudents(): Promise<User[]> {
    return await prismaClient.user.findMany({
      where: {
        role: Role.STUDENT,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prismaClient.user.delete({
      where: {
        id,
      },
    });
  }
}
