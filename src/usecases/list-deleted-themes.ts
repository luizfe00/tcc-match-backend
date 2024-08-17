import { decode } from 'jsonwebtoken';
import { ThemeRepository } from './ports/theme-repository';
import { UseCase } from './ports/use-case';
import { UserSignIn } from '@/interfaces/user';
import { Theme } from '@/models/theme';

export class ListDeletedThemes implements UseCase {
  constructor(private readonly themeRepository: ThemeRepository) {}

  async perform(token?: string): Promise<Theme[]> {
    const user = decode(token) as UserSignIn;

    return await this.themeRepository.listDeletedByUserId(user.id);
  }
}
