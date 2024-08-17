import { UserSignIn } from '@/interfaces/user';
import { UseCase } from './ports/use-case';
import { decode } from 'jsonwebtoken';
import { UserRepository } from './ports/user-repository';
import { NotFoundError } from './errors';

export class GetUser implements UseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async perform(token: string): Promise<UserSignIn> {
    const user = decode(token) as UserSignIn;
    const foundUser = await this.userRepository.getUserByEnrollment(user.enrollment);
    if (!foundUser) {
      throw new NotFoundError('User', user.enrollment);
    }

    return foundUser;
  }
}
