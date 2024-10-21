import { Role } from '@prisma/client';

import { Theme, ThemePayload } from '@/models/theme';
import { ThemeRepository } from './ports/theme-repository';
import { UseCase } from './ports/use-case';
import { BadRequestError, ExistingEntityError, NotFoundError } from './errors';
import { UserSignIn } from '@/interfaces/user';
import { UserRepository } from './ports/user-repository';

export class CreateTheme implements UseCase {
  constructor(
    private readonly themeRepository: ThemeRepository,
    private readonly userRepository: UserRepository
  ) {}

  async perform(theme: ThemePayload, user: UserSignIn): Promise<Theme> {
    const userThemes = await this.themeRepository.findAllByUser(user.id);
    if (userThemes.length && user.role === Role.STUDENT) {
      throw new BadRequestError('Student can only have one theme created at a time');
    }

    const userFound = await this.userRepository.getUserById(user.id);
    if (!userFound) {
      throw new NotFoundError('User', user.id);
    }

    if (userFound.role === Role.STUDENT && !!userFound.orienteePaper) {
      throw new BadRequestError('Student cannot create theme if he already has one paper ongoing');
    }

    const themeFound = await this.themeRepository.findByUser(user.id, theme.label);

    if (themeFound) {
      throw new ExistingEntityError('Theme', 'label', theme.label);
    }

    theme.ownerId = user.id;

    return await this.themeRepository.add(theme);
  }
}
