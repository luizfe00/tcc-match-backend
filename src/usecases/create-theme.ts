import { Theme } from '@/models/theme';
import { ThemeRepository } from './ports/theme-repository';
import { UseCase } from './ports/use-case';

export class CreateTheme implements UseCase {
  constructor(private readonly themRepository: ThemeRepository) {}

  async perform(theme: Theme, token?: string): Promise<any> {
    // Get user from token, check if it already has a theme like this one, if it does than throw error, if not, create
  }
}
