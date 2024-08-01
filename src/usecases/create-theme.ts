import { decode } from 'jsonwebtoken';
import { Role } from '@prisma/client';

import { Theme, ThemePayload } from '@/models/theme';
import { ThemeRepository } from './ports/theme-repository';
import { UseCase } from './ports/use-case';
import { BadRequestError, ExistingEntityError } from './errors';
import { UserSignIn } from '@/interfaces/user';

export class CreateTheme implements UseCase {
  constructor(private readonly themeRepository: ThemeRepository) {}

  async perform(theme: ThemePayload, token: string): Promise<Theme> {
    const user = decode(token) as UserSignIn;

    return this.createTheme(theme, user);
  }

  private async createTheme(theme: ThemePayload, user: UserSignIn) {
    const userThemes = await this.themeRepository.findAllByUser(user.id);
    if (userThemes.length && user.role === Role.STUDENT) {
      throw new BadRequestError('Student can only have one theme created at a time');
    }

    const themeFound = await this.themeRepository.findByUser(user.id, theme.label);

    if (themeFound) {
      throw new ExistingEntityError('Theme', 'label', theme.label);
    }

    theme.ownerId = user.id;

    return await this.themeRepository.add(theme);
  }
}
