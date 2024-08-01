import { decode } from 'jsonwebtoken';

import { ThemeRepository } from './ports/theme-repository';
import { UseCase } from './ports/use-case';
import { NotFoundError, BadRequestError } from './errors';
import { UserSignIn } from '@/interfaces/user';
import { Role } from '@prisma/client';

export class DeleteTheme implements UseCase {
  constructor(private readonly themeRepository: ThemeRepository) {}

  async perform(id: string, token?: string): Promise<void> {
    const user = decode(token) as UserSignIn;
    const themeEntity = await this.themeRepository.findById(id);
    if (!themeEntity) throw new NotFoundError('Theme', id);
    const themeBelongsToUser = themeEntity.ownerId === user.id;
    if (!themeBelongsToUser) throw new BadRequestError('User not allowed to edit this instance');
    const softDelete = user.role !== Role.STUDENT;
    if (softDelete) {
      await this.themeRepository.softDelete(id);
    } else {
      await this.themeRepository.delete(id);
    }
  }
}
