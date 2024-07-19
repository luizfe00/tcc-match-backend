import { Student } from '@/models/student';
import { UseCase } from './ports/use-case';
import { Professor } from '@/models/professor';
import { EurekaService } from '@/external/EurekaService';
import { BadRequestError } from './errors';
import { StudentRepository } from './ports/student-repository';
import { ProfessorRepository } from './ports/professor-repository';
import { CreateStudent } from './create-student';
import { CreateProfessor } from './create-professor';
import { Role } from '@prisma/client';

type TokenizedResponse = ({ token: string } & Student) | ({ token: string } & Professor);
type SignInResponse = Promise<TokenizedResponse>;

export class SignIn implements UseCase {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly professorRepository: ProfessorRepository
  ) {}

  async perform({ username, password }: { username: string; password: string }): SignInResponse {
    const eurekaService = new EurekaService();
    const { token } = await eurekaService.tokens(username, password);
    if (!token) throw new BadRequestError('Failed credentials');
    const profile = await eurekaService.profile(token);
    if (profile.attributes.type === 'Aluno') {
      const createStudent = new CreateStudent(this.studentRepository);
      const student: Student = {
        email: profile.attributes.email,
        enrollment: profile.id,
        name: profile.name,
      };
      const createdStudent = await createStudent.perform(student);
      return { ...createdStudent, token };
    } else {
      const createProfessor = new CreateProfessor(this.professorRepository);
      const professor: Professor = {
        classes: '',
        email: profile.attributes.email,
        enrollment: profile.id,
        name: profile.name,
        role: profile.attributes.type === 'Coordenador' ? Role.COORDINATOR : Role.TEACHER,
        vacancies: 0,
      };
      const createdProfessor = await createProfessor.perform(professor);
      return { ...createdProfessor, token };
    }
  }
}
