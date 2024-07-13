import { Validator } from './validator';
import { CreateStudentValidator } from '@/usecases/validations/create-student';

export const createCreateStudentValidator = (): Validator => {
  return new CreateStudentValidator();
};
