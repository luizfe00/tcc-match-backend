import { Controller } from '@/controllers/ports';
import { makeProfessorRepository } from '../repository/make-professor-repository';
import { CreateProfessor } from '@/usecases/create-professor';
import { CreateProfessorController } from '@/controllers/create-professor-controller';

export const makeCreateProfessorController = (): Controller => {
  const professorRepository = makeProfessorRepository();
  const useCase = new CreateProfessor(professorRepository);
  const createStudentController = new CreateProfessorController(useCase);
  return createStudentController;
};
