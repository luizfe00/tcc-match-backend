import { Stage } from '@/models/stage';
import { StageRepostiory } from './ports/stage-repository';
import { UseCase } from './ports/use-case';
import { decode } from 'jsonwebtoken';
import { UserSignIn } from '@/interfaces/user';

export class ListPendingFeedback implements UseCase {
  constructor(private readonly stageRepository: StageRepostiory) {}

  async perform(token?: string): Promise<Stage[]> {
    const user = decode(token) as UserSignIn;
    const pendingStages = await this.stageRepository.listPending(user.id);
    return pendingStages;
  }
}
