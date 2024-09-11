import { ThemeRepository } from './ports/theme-repository';
import { UseCase } from './ports/use-case';
import { UserSignIn } from '@/interfaces/user';

export class ListUserThemes implements UseCase {
  constructor(private readonly themeRepository: ThemeRepository) {}

  async perform(user: UserSignIn): Promise<any> {
    return await this.themeRepository.findAllByUser(user.id);
  }
}
