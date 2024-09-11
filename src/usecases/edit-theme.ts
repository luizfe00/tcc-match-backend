import { Theme } from '@/models/theme';
import { ThemeRepository } from './ports/theme-repository';
import { UseCase } from './ports/use-case';
import { BadRequestError, NotFoundError } from './errors';
import { UserSignIn } from '@/interfaces/user';

export class EditTheme implements UseCase {
  constructor(private readonly themeRepository: ThemeRepository) {}

  async perform(theme: Theme, user: UserSignIn): Promise<void> {
    const themeEntity = await this.themeRepository.findById(theme.id);
    if (!themeEntity) throw new NotFoundError('Theme', theme.id);
    const themeBelongsToUser = themeEntity.ownerId === user.id;
    if (!themeBelongsToUser) throw new BadRequestError('User not allowed to edit this instance');
    await this.themeRepository.edit(theme.id, theme);
  }
}
