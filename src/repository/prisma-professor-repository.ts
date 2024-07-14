import prismaClient from './prisma-client';
import { Professor } from '@/models/professor';
import { ProfessorRepository } from '@/usecases/ports/professor-repository';

export class PrismaProfessorRepository implements ProfessorRepository {
  async add(professor: Professor): Promise<Professor> {
    return await prismaClient.professor.create({
      data: {
        name: professor.name,
        email: professor.email,
        enrollment: professor.enrollment,
        classes: professor.classes,
        vacancies: professor.vacancies,
      },
    });
  }

  async findByEmail(email: string): Promise<Professor | undefined> {
    return await prismaClient.professor.findUnique({
      where: {
        email,
      },
    });
  }

  async findByEnrollment(enrollment: string): Promise<Professor | undefined> {
    return await prismaClient.professor.findUnique({
      where: {
        enrollment,
      },
    });
  }

  async findById(id: string): Promise<Professor | undefined> {
    return await prismaClient.professor.findUnique({
      where: {
        id,
      },
    });
  }

  async list(): Promise<Professor[]> {
    return await prismaClient.professor.findMany();
  }
}
