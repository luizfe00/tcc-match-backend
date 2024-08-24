import { Stage } from '@/models/stage';
import { StageRepostiory } from './ports/stage-repository';
import { UseCase } from './ports/use-case';
import { UserSignIn } from '@/interfaces/user';

export class ListPendingFeedback implements UseCase {
  constructor(private readonly stageRepository: StageRepostiory) {}

  async perform(user: UserSignIn): Promise<Stage[]> {
    const pendingStages = await this.stageRepository.listPending(user.id);
    return pendingStages;
  }
}
