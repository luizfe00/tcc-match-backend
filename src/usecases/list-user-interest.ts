import { decode } from 'jsonwebtoken';
import { InterestRepository } from './ports/interest-repository';
import { UseCase } from './ports/use-case';
import { User } from '@/interfaces/user';
import { Interest } from '@/models/interest';

export class ListUserInterest implements UseCase {
  constructor(private readonly interestRepository: InterestRepository) {}

  async perform(token?: string): Promise<Interest[]> {
    const user = decode(token) as User;
    return await this.interestRepository.findAllByUserId(user.id);
  }
}
