import { Controller } from '@/controllers/ports';
import { makeApprovalRepository } from '../repository/make-approval-repository';
import { makePaperRepository } from '../repository/make-paper-repository';
import { CreateApproval } from '@/usecases/create-approval';
import { CreateApprovalController } from '@/controllers/create-approval-controller';

export const makeCreateApprovalController = (): Controller => {
  const approvalRepository = makeApprovalRepository();
  const paperRepository = makePaperRepository();
  const useCase = new CreateApproval(approvalRepository, paperRepository);
  return new CreateApprovalController(useCase);
};
