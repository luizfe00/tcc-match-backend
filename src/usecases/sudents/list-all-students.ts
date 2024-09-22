import { UserSignIn } from '@/interfaces/user';
import { UseCase } from '../ports/use-case';
import { UserRepository } from '../ports/user-repository';
import { BadRequestError } from '../errors';

export class ListAllStudents implements UseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async perform(user?: UserSignIn): Promise<any> {
    if (user.role !== 'COORDINATOR') {
      throw new BadRequestError('User is not authorized to list all students');
    }

    const students = await this.userRepository.listStudents();
    return students;
  }
}
