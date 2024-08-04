import { Paper } from '@/models/paper';
import { PaperRepository } from './ports/paper-repository';
import { UseCase } from './ports/use-case';
import { decode } from 'jsonwebtoken';
import { UserSignIn } from '@/interfaces/user';

export class ListUserPapers implements UseCase {
  constructor(private readonly paperRepository: PaperRepository) {}

  async perform(token?: string): Promise<Paper[]> {
    const user = decode(token) as UserSignIn;

    return await this.paperRepository.listByUser(user.id);
  }
}
