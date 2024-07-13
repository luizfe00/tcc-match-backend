import { Controller } from '@/controllers/ports';
import { makeStudentRepository } from '../repository/make-student-repository';
import { CreateStudent } from '@/usecases/create-student';
import { CreateStudentController } from '@/controllers/create-student-controller';

export const makeCreateStudentController = (): Controller => {
  const studentRepository = makeStudentRepository();
  const useCase = new CreateStudent(studentRepository);
  const createStudentController = new CreateStudentController(useCase);
  return createStudentController;
};
