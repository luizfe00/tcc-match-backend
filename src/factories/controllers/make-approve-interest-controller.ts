import { ApproveInterestController } from '@/controllers/create-approve-interest-controller';
import { Controller } from '@/controllers/ports';
import { ApproveInterest } from '@/usecases/approve-interest';
import { makeThemeRepository } from '../repository/make-theme-repository';
import { makeUserRepository } from '../repository/make-user-repository';
import { makePaperRepository } from '../repository/make-paper-repository';

export const makeApproveInterestController = (): Controller => {
  const userRepository = makeUserRepository();
  const paperRepository = makePaperRepository();
  const themeRepository = makeThemeRepository();
  const useCase = new ApproveInterest(userRepository, themeRepository, paperRepository);
  return new ApproveInterestController(useCase);
};
