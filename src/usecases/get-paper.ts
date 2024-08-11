import { decode } from 'jsonwebtoken';
import { PaperRepository } from './ports/paper-repository';
import { UseCase } from './ports/use-case';
import { UserSignIn } from '@/interfaces/user';
import { Paper } from '@/models/paper';
import { BadRequestError, NotFoundError } from './errors';

export class GetPaper implements UseCase {
  constructor(private readonly paperRepository: PaperRepository) {}

  async perform(id?: string, token?: string): Promise<Paper> {
    const user = decode(token) as UserSignIn;

    const paper = await this.paperRepository.findById(id);

    if (!paper) {
      throw new NotFoundError('Paper', id);
    }

    const userAllowed =
      user.role === 'COORDINATOR' || paper.professorId === user.id || paper.studentId === user.id;
    if (!userAllowed) {
      throw new BadRequestError('User is not part of paper.');
    }

    return paper;
  }
}
