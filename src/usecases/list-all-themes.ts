import { UseCase } from './ports/use-case';
import { ThemeRepository } from './ports/theme-repository';
import { Theme } from '@/models/theme';
import { UserSignIn } from '@/interfaces/user';
import { Role } from '@prisma/client';
import { BadRequestError } from './errors';

export class ListAllThemes implements UseCase {
  constructor(private readonly themeRepository: ThemeRepository) {}

  async perform(user: UserSignIn): Promise<Theme[]> {
    if (user.role !== Role.COORDINATOR) {
      throw new BadRequestError('User is not a coordinator');
    }
    return this.themeRepository.findAll();
  }
}
