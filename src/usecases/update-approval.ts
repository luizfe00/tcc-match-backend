import { Approval } from '@/models/approval';
import { ApprovalRepository } from './ports/approval-repository';
import { PaperRepository } from './ports/paper-repository';
import { UseCase } from './ports/use-case';
import { UserSignIn } from '@/interfaces/user';
import { decode } from 'jsonwebtoken';
import { BadRequestError, NotFoundError } from './errors';

export class UpdateApproval implements UseCase {
  constructor(
    private readonly approvalRepository: ApprovalRepository,
    private readonly paperRepository: PaperRepository
  ) {}

  async perform(approval?: Approval, token?: string): Promise<void> {
    const user = decode(token) as UserSignIn;

    const paper = await this.paperRepository.findById(approval?.paperId);
    if (!paper) {
      throw new NotFoundError('Paper', approval.paperId);
    }

    const userAllowed =
      user.role === 'COORDINATOR' || paper.professorId === user.id || paper.studentId === user.id;
    if (!userAllowed) {
      throw new BadRequestError('Action not authorized for user');
    }

    await this.approvalRepository.update(approval);
  }
}
