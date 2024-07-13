import { Student } from '@/models/student';
import { StudentRepository } from '@/usecases/ports/student-repository';
import prismaClient from './prisma-client';

export class PrismaStudentRepository implements StudentRepository {
  async add(student: Student): Promise<Student> {
    return await prismaClient.student.create({
      data: {
        name: student.name,
        email: student.email,
        enrollment: student.enrollment,
      },
    });
  }

  async findByEmail(email: string): Promise<Student | undefined> {
    return await prismaClient.student.findUnique({
      where: {
        email,
      },
    });
  }

  async findByEnrollment(enrollment: string): Promise<Student | undefined> {
    return await prismaClient.student.findUnique({
      where: {
        enrollment,
      },
    });
  }

  async findById(id: string): Promise<Student | undefined> {
    return await prismaClient.student.findUnique({
      where: {
        id,
      },
    });
  }

  async list(): Promise<Student[]> {
    return await prismaClient.student.findMany();
  }
}
