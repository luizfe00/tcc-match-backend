import { PrismaStudentRepository } from '@/repository/prisma-student-repository';
import { StudentRepository } from '@/usecases/ports/student-repository';

export const makeStudentRepository = (): StudentRepository => {
  return new PrismaStudentRepository();
};
