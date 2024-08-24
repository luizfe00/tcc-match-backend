import { UseCase } from './ports/use-case';
import { BadRequestError, ExistingEntityError, NotFoundError } from './errors';
import { ThemeRepository } from './ports/theme-repository';
import { Paper, PaperPayload } from '@/models/paper';
import { UserSignIn } from '@/interfaces/user';
import { PaperRepository } from './ports/paper-repository';
import { UserRepository } from './ports/user-repository';
import { InterestRepository } from './ports/interest-repository';

export class ApproveInterest implements UseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly themeRepository: ThemeRepository,
    private readonly paperRepository: PaperRepository,
    private readonly interestRepository: InterestRepository
  ) {}

  async perform(ptcc: PaperPayload, user: UserSignIn): Promise<Paper> {
    const theme = await this.themeRepository.findById(ptcc.themeId);
    if (!theme) {
      throw new NotFoundError('Theme', ptcc.themeId);
    }
    const themeBelongsToUser = theme.ownerId === user.id;
    if (!themeBelongsToUser) {
      throw new BadRequestError('User not allowed to approve interest');
    }
    const paperFound = await this.paperRepository.findByThemeId(ptcc.themeId);
    if (paperFound) {
      throw new ExistingEntityError('Paper', 'themeId', ptcc.themeId);
    }
    const professor = await this.userRepository.getUserById(ptcc.professorId);
    if (!professor) {
      throw new NotFoundError('Professor', ptcc.professorId);
    }
    const student = await this.userRepository.getUserById(ptcc.studentId);
    if (!student) {
      throw new NotFoundError('Student', ptcc.studentId);
    }

    await this.interestRepository.approve(ptcc.interestId);
    await this.themeRepository.softDelete(ptcc.themeId);
    return await this.paperRepository.add(ptcc);
  }
}
