import { Interest } from '@/models/interest';
import { InterestRepository } from './ports/interest-repository';
import { UseCase } from './ports/use-case';
import { ThemeRepository } from './ports/theme-repository';
import { BadRequestError, NotFoundError } from './errors';
import { UserSignIn } from '@/interfaces/user';

export class ListThemeInterests implements UseCase {
  constructor(
    private readonly interestRepository: InterestRepository,
    private readonly themeRepository: ThemeRepository
  ) {}

  async perform(id: string, user: UserSignIn): Promise<Interest[]> {
    const theme = await this.themeRepository.findById(id);
    if (!theme) {
      throw new NotFoundError('Theme', id);
    }
    const belongsToUser = theme.ownerId === user.id;
    if (!belongsToUser) {
      throw new BadRequestError('Action not allowed for user');
    }
    return this.interestRepository.findAllByThemeId(theme.id);
  }
}
