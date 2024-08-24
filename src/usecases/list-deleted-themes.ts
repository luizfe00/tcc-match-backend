import { ThemeRepository } from './ports/theme-repository';
import { UseCase } from './ports/use-case';
import { UserSignIn } from '@/interfaces/user';
import { Theme } from '@/models/theme';

export class ListDeletedThemes implements UseCase {
  constructor(private readonly themeRepository: ThemeRepository) {}

  async perform(user: UserSignIn): Promise<Theme[]> {
    return await this.themeRepository.listDeletedByUserId(user.id);
  }
}
