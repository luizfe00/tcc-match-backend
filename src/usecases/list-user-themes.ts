import { decode } from 'jsonwebtoken';
import { ThemeRepository } from './ports/theme-repository';
import { UseCase } from './ports/use-case';
import { UserSignIn } from '@/interfaces/user';

export class ListUserThemes implements UseCase {
  constructor(private readonly themeRepository: ThemeRepository) {}

  async perform(token: string): Promise<any> {
    const user = decode(token) as UserSignIn;
    return await this.themeRepository.findAllByUser(user.id);
  }
}
