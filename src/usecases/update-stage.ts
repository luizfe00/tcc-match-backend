import { UpdateStagePayload } from '@/models/stage';
import { StageRepostiory } from './ports/stage-repository';
import { UseCase } from './ports/use-case';
import { decode } from 'jsonwebtoken';
import { UserSignIn } from '@/interfaces/user';
import { BadRequestError, NotFoundError } from './errors';

export class UpdateStage implements UseCase {
  constructor(private readonly stageRepository: StageRepostiory) {}

  async perform(stage?: UpdateStagePayload, token?: string): Promise<any> {
    const user = decode(token) as UserSignIn;
    const stageFound = await this.stageRepository.findById(stage.id);
    if (!stageFound) {
      throw new NotFoundError('Stage', stage.id);
    }

    const UserBelongsToPaper =
      stageFound.paper?.studentId === user.id || stageFound.paper?.professorId === user.id;
    if (!UserBelongsToPaper) {
      throw new BadRequestError('User is not part of this paper');
    }

    await this.stageRepository.update(stage);
  }
}
