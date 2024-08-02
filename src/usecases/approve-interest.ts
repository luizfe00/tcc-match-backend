import { UseCase } from './ports/use-case';
import { BadRequestError, ExistingEntityError, NotFoundError } from './errors';
import { ThemeRepository } from './ports/theme-repository';
import { decode } from 'jsonwebtoken';
import { Paper, PaperPayload } from '@/models/paper';
import { UserSignIn } from '@/interfaces/user';
import { PaperRepository } from './ports/paper-repository';
import { UserRepository } from './ports/user-repository';

export class ApproveInterest implements UseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly themeRepository: ThemeRepository,
    private readonly paperRepository: PaperRepository
  ) {}

  async perform(ptcc: PaperPayload, token: string): Promise<Paper> {
    const user = decode(token) as UserSignIn;
    const theme = await this.themeRepository.findById(ptcc.themeId);
    if (!theme) {
      throw new NotFoundError('Theme', ptcc.themeId);
    }
    const themeBelongsToUser = theme.ownerId === user.id;
    if (!themeBelongsToUser) {
      throw new BadRequestError('User not allowed to approve interest');
    }
    const ptccFound = this.paperRepository.findByThemeId(ptcc.themeId);
    if (ptccFound) {
      throw new ExistingEntityError('PTCC', 'themeId', ptcc.themeId);
    }
    const professor = this.userRepository.getUserById(ptcc.professorId);
    if (!professor) {
      throw new NotFoundError('Professor', ptcc.professorId);
    }
    const student = this.userRepository.getUserById(ptcc.studentId);
    if (!student) {
      throw new NotFoundError('Student', ptcc.studentId);
    }
    return await this.paperRepository.add(ptcc);
  }
}
