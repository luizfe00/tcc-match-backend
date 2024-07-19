import { Professor } from '@/models/professor';
import { UseCase } from './ports/use-case';
import { ProfessorRepository } from './ports/professor-repository';
import { ExistingEntityError } from './errors';

export class CreateProfessor implements UseCase {
  constructor(private readonly professorRepository: ProfessorRepository) {}

  async perform(professor: Professor): Promise<Professor> {
    const existingProfessor = await this.professorRepository.findByEnrollment(professor.enrollment);
    if (existingProfessor)
      throw new ExistingEntityError('Student', 'enrollment number', professor.enrollment);

    return await this.professorRepository.add(professor);
  }
}
