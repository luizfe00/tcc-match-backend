import { Theme } from '@/models/theme';
import { ThemeRepository } from './ports/theme-repository';
import { UseCase } from './ports/use-case';
import { User } from '@/interfaces/user';
import { decode } from 'jsonwebtoken';
import { BadRequestError, NotFoundError } from './errors';
import { SystemRoles } from '@/constants/Roles';

export class EditTheme implements UseCase {
  constructor(private readonly themeRepository: ThemeRepository) {}

  async perform(theme: Theme, token: string): Promise<void> {
    const user = decode(token) as User;
    const themeEntity = await this.themeRepository.findById(theme.id);
    if (!themeEntity) throw new NotFoundError('Theme', theme.id);
    const themeUserRole = user.role === SystemRoles.STUDENT ? 'studentId' : 'professorId';
    const themeBelongsToUser = themeEntity[themeUserRole] === user.id;
    if (!themeBelongsToUser) throw new BadRequestError('User not allowed to edit this instance');
    await this.themeRepository.edit(theme.id, { keepActive: theme.keepActive, label: theme.label });
  }
}
