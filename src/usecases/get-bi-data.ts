import { DashboardBI } from '@/interfaces/BI';
import { InterestRepository } from './ports/interest-repository';
import { PaperRepository } from './ports/paper-repository';
import { StageRepostiory } from './ports/stage-repository';
import { ThemeRepository } from './ports/theme-repository';
import { UseCase } from './ports/use-case';
import { decode } from 'jsonwebtoken';
import { UserSignIn } from '@/interfaces/user';
import { BadRequestError } from './errors';

export class GetBIData implements UseCase {
  constructor(
    private readonly paperRepository: PaperRepository,
    private readonly themeRepository: ThemeRepository,
    private readonly interestRepository: InterestRepository,
    private readonly stageRepository: StageRepostiory
  ) {}

  async perform(token?: string): Promise<DashboardBI> {
    const user = decode(token) as UserSignIn;

    if (user.role !== 'COORDINATOR') {
      throw new BadRequestError('User cannot access this info.');
    }

    const paperBIData = await this.paperRepository.getPaperData();
    const themeBIData = await this.themeRepository.getThemeCount();
    const interestBIData = await this.interestRepository.getBiData();
    const stageBIData = await this.stageRepository.getBIData();

    return {
      ...paperBIData,
      ...themeBIData,
      ...interestBIData,
      ...stageBIData,
    };
  }
}
