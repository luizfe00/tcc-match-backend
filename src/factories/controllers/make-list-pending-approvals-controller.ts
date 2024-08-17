import { Controller } from '@/controllers/ports';
import { makeApprovalRepository } from '../repository/make-approval-repository';
import { ListPendingApprovals } from '@/usecases/list-pending-approvals';
import { ListPendingApprovalsController } from '@/controllers/list-pending-approvals-controller';

export const makeListPendingApprovalsController = (): Controller => {
  const approvalRepository = makeApprovalRepository();
  const useCase = new ListPendingApprovals(approvalRepository);
  return new ListPendingApprovalsController(useCase);
};
