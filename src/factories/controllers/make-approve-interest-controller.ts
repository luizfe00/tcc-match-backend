import { ApproveInterestController } from '@/controllers/create-approve-interest-controller';
import { Controller } from '@/controllers/ports';
import { ApproveInterest } from '@/usecases/approve-interest';
import { makeThemeRepository } from '../repository/make-theme-repository';
import { makeUserRepository } from '../repository/make-user-repository';
import { makePaperRepository } from '../repository/make-paper-repository';
import { makeInterestRepository } from '../repository/make-interest-repository';

export const makeApproveInterestController = (): Controller => {
  const userRepository = makeUserRepository();
  const paperRepository = makePaperRepository();
  const themeRepository = makeThemeRepository();
  const interestRepository = makeInterestRepository();
  const useCase = new ApproveInterest(
    userRepository,
    themeRepository,
    paperRepository,
    interestRepository
  );
  return new ApproveInterestController(useCase);
};
