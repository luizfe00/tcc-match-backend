import { decode } from 'jsonwebtoken';

import { ThemeRepository } from './ports/theme-repository';
import { UseCase } from './ports/use-case';
import { SystemRoles } from '@/constants/Roles';
import { User } from '@/interfaces/user';
import { NotFoundError, BadRequestError } from './errors';

export class DeleteTheme implements UseCase {
  constructor(private readonly themeRepository: ThemeRepository) {}

  async perform(id: string, token?: string): Promise<void> {
    const user = decode(token) as User;
    const themeEntity = await this.themeRepository.findById(id);
    if (!themeEntity) throw new NotFoundError('Theme', id);
    const themeUserRole = user.role === SystemRoles.STUDENT ? 'studentId' : 'professorId';
    const themeBelongsToUser = themeEntity[themeUserRole] === user.id;
    if (!themeBelongsToUser) throw new BadRequestError('User not allowed to edit this instance');
    const softDelete = user.role === SystemRoles.TEACHER;
    if (softDelete) {
      await this.themeRepository.softDelete(id);
    } else {
      await this.themeRepository.delete(id);
    }
  }
}
