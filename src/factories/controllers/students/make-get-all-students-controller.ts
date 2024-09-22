import { Controller } from '@/controllers/ports';
import { ListAllStudentsController } from '@/controllers/students/list-all-students-controller';
import { makeUserRepository } from '@/factories/repository/make-user-repository';
import { ListAllStudents } from '@/usecases/sudents/list-all-students';

export const makeGetAllStudentsController = (): Controller => {
  const userRepository = makeUserRepository();
  const listAllStudents = new ListAllStudents(userRepository);
  return new ListAllStudentsController(listAllStudents);
};
