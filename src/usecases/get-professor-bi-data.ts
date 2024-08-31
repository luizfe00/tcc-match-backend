import { UserSignIn } from '@/interfaces/user';
import { BIRepository } from './ports/bi-repository';
import { UseCase } from './ports/use-case';
import { ProfessorDashboardBI, ProfessorDashboardBIQuery } from '@/interfaces/BI';
import { isValid, subYears } from 'date-fns';
import { BadRequestError } from './errors';

export class GetProfessorBIData implements UseCase {
  constructor(private readonly biRepository: BIRepository) {}

  async perform(data: ProfessorDashboardBIQuery, user?: UserSignIn): Promise<ProfessorDashboardBI> {
    if (user?.role !== 'COORDINATOR') {
      throw new BadRequestError('User is not a coordinator');
    }

    const startDate = isValid(new Date(data.startDate))
      ? new Date(data.startDate)
      : subYears(new Date(), 1);
    const endDate = isValid(new Date(data.endDate)) ? new Date(data.endDate) : new Date();
    const professor = await this.biRepository.getProfessorDashboardData(
      data.professorId,
      startDate,
      endDate
    );
    return professor;
  }
}
