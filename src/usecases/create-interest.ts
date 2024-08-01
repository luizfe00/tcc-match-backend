import { decode } from 'jsonwebtoken';

import { CreateInterestPayload, Interest } from '@/models/interest';
import { InterestRepository } from './ports/interest-repository';
import { UseCase } from './ports/use-case';
import { BadRequestError, ExistingEntityError } from './errors';
import { UserSignIn } from '@/interfaces/user';
import { Role } from '@prisma/client';

export class CreateInterest implements UseCase {
  constructor(private readonly interestRepository: InterestRepository) {}

  async perform(interest: CreateInterestPayload, token: string): Promise<Interest> {
    const user = decode(token) as UserSignIn;
    const interestFound = await this.interestRepository.findByThemeIdAndUser(
      interest.themeId,
      user
    );
    if (interestFound) throw new ExistingEntityError('Interest', 'themeId', interest.themeId);

    const allowMultiple = user.role !== Role.STUDENT;
    if (!allowMultiple) {
      const userInterest = await this.interestRepository.findAllByUserId(user.id);
      if (userInterest.length)
        throw new BadRequestError('User already has an interest in another Theme');
    }
    interest.ownerId = user.id;
    const createdInterest = await this.interestRepository.add(interest);
    return createdInterest;
  }
}
