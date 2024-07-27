import { decode } from 'jsonwebtoken';
import { BadRequestError, NotFoundError } from './errors';
import { InterestRepository } from './ports/interest-repository';
import { UseCase } from './ports/use-case';
import { User } from '@/interfaces/user';
import { SystemRoles } from '@/constants/Roles';

export class DeleteInterest implements UseCase {
  constructor(private readonly interestRepository: InterestRepository) {}

  async perform(id?: string, token?: string): Promise<void> {
    const interest = await this.interestRepository.findById(id);
    if (!interest) {
      throw new NotFoundError('Interest', id);
    }
    const user = decode(token) as User;
    const searchTerm = user.role === SystemRoles.STUDENT ? 'studentId' : 'professorId';
    const interestBelongsToUser = interest[searchTerm] === user.id;
    if (!interestBelongsToUser) {
      throw new BadRequestError('Action not allowed for user');
    }
    await this.interestRepository.delete(id);
  }
}
