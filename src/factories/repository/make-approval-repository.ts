import { PrismaApprovalRepository } from '@/repository/prisma-approval-repository';
import { ApprovalRepository } from '@/usecases/ports/approval-repository';

export const makeApprovalRepository = (): ApprovalRepository => {
  return new PrismaApprovalRepository();
};
