import { EditPaperPayload } from '@/models/paper';
import { PaperRepository } from './ports/paper-repository';
import { UseCase } from './ports/use-case';
import { UserSignIn } from '@/interfaces/user';
import { BadRequestError, NotFoundError } from './errors';

export class UpdatePaper implements UseCase {
  constructor(private readonly paperRepository: PaperRepository) {}

  async perform(paper: EditPaperPayload, user: UserSignIn): Promise<void> {
    const paperFound = await this.paperRepository.findById(paper.id);
    if (!paperFound) {
      throw new NotFoundError('Paper', paper.id);
    }

    const UserBelongsToPaper =
      paperFound?.studentId === user.id || paperFound?.professorId === user.id;
    if (!UserBelongsToPaper) {
      throw new BadRequestError('User is not part of this paper');
    }

    await this.paperRepository.update(paper);
  }
}
