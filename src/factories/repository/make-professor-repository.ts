import { PrismaProfessorRepository } from '@/repository/prisma-professor-repository';
import { ProfessorRepository } from '@/usecases/ports/professor-repository';

export const makeProfessorRepository = (): ProfessorRepository => {
  return new PrismaProfessorRepository();
};
