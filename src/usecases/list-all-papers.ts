import { UserSignIn } from '@/interfaces/user';
import { PaperRepository } from './ports/paper-repository';
import { UseCase } from './ports/use-case';
import { Paper } from '@/models/paper';
import { Role } from '@prisma/client';
import { BadRequestError } from './errors';

export class ListAllPapers implements UseCase {
  constructor(private readonly paperRepository: PaperRepository) {}

  async perform(user: UserSignIn): Promise<Paper[]> {
    if (user.role !== Role.COORDINATOR) {
      throw new BadRequestError('User is not a coordinator');
    }

    const papers = await this.paperRepository.findAll();
    return papers;
  }
}
