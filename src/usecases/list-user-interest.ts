import { InterestRepository } from './ports/interest-repository';
import { UseCase } from './ports/use-case';
import { Interest } from '@/models/interest';
import { UserSignIn } from '@/interfaces/user';

export class ListUserInterest implements UseCase {
  constructor(private readonly interestRepository: InterestRepository) {}

  async perform(user: UserSignIn): Promise<Interest[]> {
    return await this.interestRepository.findAllByUserId(user.id);
  }
}
