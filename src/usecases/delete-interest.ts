import { BadRequestError, NotFoundError } from './errors';
import { InterestRepository } from './ports/interest-repository';
import { UseCase } from './ports/use-case';
import { ThemeRepository } from './ports/theme-repository';
import { UserSignIn } from '@/interfaces/user';

export class DeleteInterest implements UseCase {
  constructor(
    private readonly interestRepository: InterestRepository,
    private readonly themeRepository: ThemeRepository
  ) {}

  async perform(id: string, user: UserSignIn): Promise<void> {
    const interest = await this.interestRepository.findById(id);
    if (!interest) {
      throw new NotFoundError('Interest', id);
    }

    const theme = await this.themeRepository.findById(interest.themeId);
    const interestBelongsToUser = interest.ownerId === user.id;
    const themeBelongsToUser = theme.ownerId === user.id;
    if (!interestBelongsToUser && !themeBelongsToUser) {
      throw new BadRequestError('Action not allowed for user');
    }
    await this.interestRepository.delete(id);
  }
}
