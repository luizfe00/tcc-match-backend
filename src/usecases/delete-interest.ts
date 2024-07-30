import { decode } from 'jsonwebtoken';
import { BadRequestError, NotFoundError } from './errors';
import { InterestRepository } from './ports/interest-repository';
import { UseCase } from './ports/use-case';
import { User } from '@/interfaces/user';
import { SystemRoles } from '@/constants/Roles';
import { ThemeRepository } from './ports/theme-repository';

export class DeleteInterest implements UseCase {
  constructor(
    private readonly interestRepository: InterestRepository,
    private readonly themeRepository: ThemeRepository
  ) {}

  async perform(id?: string, token?: string): Promise<void> {
    const interest = await this.interestRepository.findById(id);
    if (!interest) {
      throw new NotFoundError('Interest', id);
    }
    const user = decode(token) as User;
    const theme = await this.themeRepository.findById(interest.themeId);
    const searchTerm = user.role === SystemRoles.STUDENT ? 'studentId' : 'professorId';
    const interestBelongsToUser = interest[searchTerm] === user.id;
    const themeBelongsToUser = theme[searchTerm] === user.id;
    if (!interestBelongsToUser && !themeBelongsToUser) {
      throw new BadRequestError('Action not allowed for user');
    }
    await this.interestRepository.delete(id);
  }
}
