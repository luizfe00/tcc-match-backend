import { Approval } from '@/models/approval';
import { ApprovalRepository } from './ports/approval-repository';
import { UseCase } from './ports/use-case';
import { PaperRepository } from './ports/paper-repository';
import { UserSignIn } from '@/interfaces/user';
import { BadRequestError, ExistingEntityError, NotFoundError } from './errors';

export class CreateApproval implements UseCase {
  constructor(
    private readonly approvalRepository: ApprovalRepository,
    private readonly paperRepository: PaperRepository
  ) {}

  async perform(approval: Approval, user: UserSignIn): Promise<Approval> {
    const paper = await this.paperRepository.findById(approval?.paperId);
    if (!paper) {
      throw new NotFoundError('Paper', approval.paperId);
    }

    const userAllowed =
      user.role === 'COORDINATOR' || paper.professorId === user.id || paper.studentId === user.id;
    if (!userAllowed) {
      throw new BadRequestError('Action not authorized for user');
    }

    const approvalsFound = await this.approvalRepository.listByPaperId(approval.paperId);
    const existingApproval = approvalsFound.find(
      (currApproval) => approval.type === currApproval.type && currApproval.approval !== false
    );

    if (existingApproval) throw new ExistingEntityError('Approval', 'id', existingApproval.id);

    const approvalPayload = {
      ...approval,
      type: paper.type,
    };

    return await this.approvalRepository.add(approvalPayload);
  }
}
