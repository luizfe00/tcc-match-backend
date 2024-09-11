import { Approval } from '@/models/approval';
import { ApprovalRepository } from './ports/approval-repository';
import { PaperRepository } from './ports/paper-repository';
import { UseCase } from './ports/use-case';
import { UserSignIn } from '@/interfaces/user';
import { BadRequestError, NotFoundError } from './errors';
import { Paper } from '@/models/paper';

export class UpdateApproval implements UseCase {
  constructor(
    private readonly approvalRepository: ApprovalRepository,
    private readonly paperRepository: PaperRepository
  ) {}

  async perform(approval: Approval, user: UserSignIn): Promise<void> {
    const paper = await this.getPaper(approval.paperId);
    this.validateUserPermission(user, paper);
    await this.approvalRepository.update(approval);
    await this.updatePaperStatus(approval, paper);
  }

  private async getPaper(paperId: string): Promise<Paper> {
    const paper = await this.paperRepository.findById(paperId);
    if (!paper) {
      throw new NotFoundError('Paper', paperId);
    }
    return paper;
  }

  private validateUserPermission(user: UserSignIn, paper: Paper): void {
    const userAllowed =
      user.role === 'COORDINATOR' || paper.professorId === user.id || paper.studentId === user.id;
    if (!userAllowed) {
      throw new BadRequestError('Action not authorized for user');
    }
  }

  private async updatePaperStatus(approval: Approval, paper: Paper): Promise<void> {
    let updatedPaper: Partial<Paper> = { ...paper };

    if (approval.approval) {
      if (paper.type === 'PTCC') {
        updatedPaper.type = 'TCC';
        updatedPaper.status = 'APPROVED';
      } else if (paper.type === 'TCC') {
        updatedPaper.status = 'COMPLETED';
      }
    } else if (approval.approval === false) {
      updatedPaper.status = 'REJECTED';
    }

    if (updatedPaper.status !== paper.status || updatedPaper.type !== paper.type) {
      await this.paperRepository.update(updatedPaper);
    }
  }
}
