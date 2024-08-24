import { Paper } from '@/models/paper';
import { PaperRepository } from './ports/paper-repository';
import { UseCase } from './ports/use-case';
import { UserSignIn } from '@/interfaces/user';

export class ListUserPapers implements UseCase {
  constructor(private readonly paperRepository: PaperRepository) {}

  async perform(user: UserSignIn): Promise<Paper[]> {
    return await this.paperRepository.listByUser(user.id);
  }
}
