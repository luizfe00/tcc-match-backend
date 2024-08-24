import { ApprovalRepository } from './ports/approval-repository';
import { UseCase } from './ports/use-case';
import { UserSignIn } from '@/interfaces/user';
import { BadRequestError } from './errors';

export class ListPendingApprovals implements UseCase {
  constructor(private readonly approvalRepository: ApprovalRepository) {}

  async perform(user: UserSignIn): Promise<any> {
    if (user.role !== 'COORDINATOR')
      throw new BadRequestError('User cannot access pending approvals');

    return await this.approvalRepository.listPending();
  }
}
