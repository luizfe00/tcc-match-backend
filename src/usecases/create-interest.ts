import { Interest } from '@/models/interest';
import { InterestRepository } from './ports/interest-repository';
import { UseCase } from './ports/use-case';
import { User } from '@/interfaces/user';
import { SystemRoles } from '@/constants/Roles';
import { BadRequestError, ExistingEntityError } from './errors';
import { decode } from 'jsonwebtoken';

export class CreateInterest implements UseCase {
  constructor(private readonly interestRepository: InterestRepository) {}

  async perform(interest: Interest, token: string): Promise<Interest> {
    const user = decode(token) as User;
    const interestFound = await this.interestRepository.findByThemeIdAndUser(
      interest.themeId,
      user
    );
    if (interestFound) throw new ExistingEntityError('Interest', 'themeId', interest.themeId);

    const allowMultiple = user.role !== SystemRoles.STUDENT;
    if (!allowMultiple) {
      const userInterest = await this.interestRepository.findAllByUserId(user.id);
      if (userInterest.length)
        throw new BadRequestError('User already has an interest in another Theme');
    }

    if (allowMultiple) {
      interest.professorId = user.id;
    } else {
      interest.studentId = user.id;
    }

    const createdInterest = await this.interestRepository.add(interest);
    return createdInterest;
  }
}
