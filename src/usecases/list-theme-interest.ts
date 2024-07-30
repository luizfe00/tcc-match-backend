import { Interest } from '@/models/interest';
import { InterestRepository } from './ports/interest-repository';
import { UseCase } from './ports/use-case';
import { decode } from 'jsonwebtoken';
import { User } from '@/interfaces/user';
import { ThemeRepository } from './ports/theme-repository';
import { BadRequestError, NotFoundError } from './errors';
import { SystemRoles } from '@/constants/Roles';

export class ListThemeInterests implements UseCase {
  constructor(
    private readonly interestRepository: InterestRepository,
    private readonly themeRepository: ThemeRepository
  ) {}

  async perform(id?: string, token?: string): Promise<Interest[]> {
    const user = decode(token) as User;
    const theme = await this.themeRepository.findById(id);
    if (!theme) {
      throw new NotFoundError('Theme', id);
    }
    const searchTerm = user.role === SystemRoles.STUDENT ? 'studentId' : 'professorId';
    const belongsToUser = theme[searchTerm] === user.id;
    if (!belongsToUser) {
      throw new BadRequestError('Action not allowed for user');
    }
    return this.interestRepository.findAllByThemeId(theme.id);
  }
}
