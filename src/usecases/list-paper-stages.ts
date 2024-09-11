import { Stage } from '@/models/stage';
import { StageRepostiory } from './ports/stage-repository';
import { UseCase } from './ports/use-case';
import { UserSignIn } from '@/interfaces/user';
import { BadRequestError } from './errors';
import { PaperRepository } from './ports/paper-repository';

export class ListPaperStages implements UseCase {
  constructor(
    private readonly paperRepository: PaperRepository,
    private readonly stageRepository: StageRepostiory
  ) {}

  async perform(paperId: string, user?: UserSignIn): Promise<Stage[]> {
    const papers = await this.paperRepository.listByUser(user.id);

    const userBelongsToPaper =
      user.role === 'COORDINATOR' ||
      papers.some((paper) => paper.orientee?.id === user.id || paper?.advisor.id === user.id);
    if (!userBelongsToPaper) throw new BadRequestError('User does not belong to paper.');

    return await this.stageRepository.listByPaper(paperId);
  }
}
