import { ThemeRepository } from './ports/theme-repository';
import { UseCase } from './ports/use-case';

export class ListProfessorThemes implements UseCase {
  constructor(private readonly themeRepository: ThemeRepository) {}

  async perform(): Promise<any> {
    return this.themeRepository.listAllProfessors();
  }
}
