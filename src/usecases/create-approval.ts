import { Approval } from '@/models/approval';
import { ApprovalRepository } from './ports/approval-repository';
import { UseCase } from './ports/use-case';
import { PaperRepository } from './ports/paper-repository';
import { decode } from 'jsonwebtoken';
import { UserSignIn } from '@/interfaces/user';
import { BadRequestError, NotFoundError, UnauthorizedError } from './errors';

export class CreateApproval implements UseCase {
  constructor(
    private readonly approvalRepository: ApprovalRepository,
    private readonly paperRepository: PaperRepository
  ) {}

  async perform(approval?: Approval, token?: string): Promise<Approval> {
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

    return await this.approvalRepository.add(approval);
  }
}
