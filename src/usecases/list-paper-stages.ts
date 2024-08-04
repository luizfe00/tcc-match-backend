import { Stage } from '@/models/stage';
import { StageRepostiory } from './ports/stage-repository';
import { UseCase } from './ports/use-case';
import { decode } from 'jsonwebtoken';
import { UserSignIn } from '@/interfaces/user';
import { BadRequestError } from './errors';
import { PaperRepository } from './ports/paper-repository';

export class ListPaperStages implements UseCase {
  constructor(
    private readonly paperRepository: PaperRepository,
    private readonly stageRepository: StageRepostiory
  ) {}

  async perform(paperId: string, token?: string): Promise<Stage[]> {
    const user = decode(token) as UserSignIn;

    const papers = await this.paperRepository.listByUser(user.id);

    const userBelongsToPaper = papers.some(
      (paper) => paper.orientee?.id === user.id || paper?.advisor.id === user.id
    );
    if (!userBelongsToPaper) throw new BadRequestError('User does not belong to paper.');

    return await this.stageRepository.listByPaper(paperId);
  }
}
