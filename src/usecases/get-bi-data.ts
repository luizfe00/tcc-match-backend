import { DashboardBI, DashboardBIQuery } from '@/interfaces/BI';
import { UseCase } from './ports/use-case';
import { UserSignIn } from '@/interfaces/user';
import { BadRequestError } from './errors';
import { BIRepository } from './ports/bi-repository';
import { subMonths } from 'date-fns';

export class GetBIData implements UseCase {
  constructor(private readonly biRepository: BIRepository) {}

  async perform(payload: DashboardBIQuery, user: UserSignIn): Promise<DashboardBI> {
    if (user.role !== 'COORDINATOR') {
      throw new BadRequestError('User cannot access this info.');
    }

    const startDate = payload.startDate ? new Date(payload.startDate) : subMonths(new Date(), 6);
    const endDate = payload.endDate ? new Date(payload.endDate) : new Date();

    return await this.biRepository.getDashboardData(startDate, endDate, user);
  }
}
