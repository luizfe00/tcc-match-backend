import { Controller } from '@/controllers/ports';
import { makeStudentRepository } from '../repository/make-student-repository';
import { makeProfessorRepository } from '../repository/make-professor-repository';
import { SignIn } from '@/usecases/signin';
import { SignInController } from '@/controllers/sigin-in-controller';

export const makeSignInController = (): Controller => {
  const studentRepository = makeStudentRepository();
  const professorRepository = makeProfessorRepository();
  const useCase = new SignIn(studentRepository, professorRepository);
  const signInController = new SignInController(useCase);
  return signInController;
};
