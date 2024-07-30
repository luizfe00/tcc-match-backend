import { PTCC } from '@/models/ptcc';
import { PTCCRepository } from './ports/ptcc-repository';
import { UseCase } from './ports/use-case';
import { BadRequestError, ExistingEntityError, NotFoundError } from './errors';
import { ThemeRepository } from './ports/theme-repository';
import { ProfessorRepository } from './ports/professor-repository';
import { StudentRepository } from './ports/student-repository';
import { decode } from 'jsonwebtoken';
import { User } from '@/interfaces/user';
import { SystemRoles } from '@/constants/Roles';

export class ApproveInterest implements UseCase {
  constructor(
    private readonly ptccRepository: PTCCRepository,
    private readonly themeRepository: ThemeRepository,
    private readonly professorRepository: ProfessorRepository,
    private readonly studentRepository: StudentRepository
  ) {}

  async perform(ptcc: PTCC, token: string): Promise<PTCC> {
    const user = decode(token) as User;
    const theme = await this.themeRepository.findById(ptcc.themeId);
    if (!theme) {
      throw new NotFoundError('Theme', ptcc.themeId);
    }
    const searchTerm = user.role === SystemRoles.STUDENT ? 'studentId' : 'professorId';
    const themeBelongsToUser = theme[searchTerm] === user.id;
    if (!themeBelongsToUser) {
      throw new BadRequestError('User not allowed to approve interest');
    }
    const ptccFound = this.ptccRepository.findByThemeId(ptcc.themeId);
    if (ptccFound) {
      throw new ExistingEntityError('PTCC', 'themeId', ptcc.themeId);
    }
    const professor = this.professorRepository.findById(ptcc.professorId);
    if (!professor) {
      throw new NotFoundError('Professor', ptcc.professorId);
    }
    const student = this.studentRepository.findById(ptcc.studentId);
    if (!student) {
      throw new NotFoundError('Student', ptcc.studentId);
    }
    return await this.ptccRepository.add(ptcc);
  }
}
