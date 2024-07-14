import { Professor } from '@/models/professor';

export interface ProfessorRepository {
  add(professor: Professor): Promise<Professor>;
  findByEmail(email: string): Promise<Professor | undefined>;
  list(): Promise<Professor[]>;
  findById(id: string): Promise<Professor | undefined>;
  findByEnrollment(enrollment: string): Promise<Professor | undefined>;
}
