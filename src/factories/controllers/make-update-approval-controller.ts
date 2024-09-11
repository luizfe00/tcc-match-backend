import { Controller } from '@/controllers/ports';
import { makeApprovalRepository } from '../repository/make-approval-repository';
import { makePaperRepository } from '../repository/make-paper-repository';
import { UpdateApproval } from '@/usecases/update-approval';
import { UpdateApprovalController } from '@/controllers/update-approval-controller';

export const makeUpdateApprovalController = (): Controller => {
  const approvalRepository = makeApprovalRepository();
  const paperRepository = makePaperRepository();
  const useCase = new UpdateApproval(approvalRepository, paperRepository);
  return new UpdateApprovalController(useCase);
};
