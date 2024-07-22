import { Theme } from '@/models/theme';
import { ThemeRepository } from './ports/theme-repository';
import { UseCase } from './ports/use-case';
import { decode } from 'jsonwebtoken';
import { User } from '@/interfaces/user';
import { ExistingEntityError } from './errors';
import { SystemRoles } from '@/constants/Roles';

export class CreateTheme implements UseCase {
  constructor(private readonly themeRepository: ThemeRepository) {}

  async perform(theme: Theme, token: string): Promise<Theme> {
    // Get user from token, check if it already has a theme like this one, if it does than throw error, if not, create
    const user = decode(token) as User;

    return this.createTheme(theme, user);
  }

  private async createTheme(theme: Theme, user: User) {
    const existingTheme = await this.themeRepository.findByUser(user.id, user.role, theme.label);
    if (existingTheme) {
      throw new ExistingEntityError('Theme', 'label', theme.label);
    }

    theme[user.role === SystemRoles.STUDENT ? 'studentId' : 'professorId'] = user.id;

    return await this.themeRepository.add(theme, user.role);
  }
}
