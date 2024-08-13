import { EditPaperPayload } from '@/models/paper';
import { PaperRepository } from './ports/paper-repository';
import { UseCase } from './ports/use-case';
import { decode } from 'jsonwebtoken';
import { UserSignIn } from '@/interfaces/user';
import { BadRequestError, NotFoundError } from './errors';

export class UpdatePaper implements UseCase {
  constructor(private readonly paperRepository: PaperRepository) {}

  async perform(paper?: EditPaperPayload, token?: string): Promise<void> {
    const user = decode(token) as UserSignIn;

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
