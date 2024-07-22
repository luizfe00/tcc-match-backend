import { Theme } from '@/models/theme';
import { ThemeRepository } from './ports/theme-repository';
import { UseCase } from './ports/use-case';

export class ListAllStudentThemes implements UseCase {
  constructor(private readonly themeRepository: ThemeRepository) {}

  async perform(): Promise<Theme[]> {
    return await this.themeRepository.listAllStudents();
  }
}
