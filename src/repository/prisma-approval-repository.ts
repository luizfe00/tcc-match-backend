import { Approval } from '@/models/approval';
import { ApprovalRepository } from '@/usecases/ports/approval-repository';
import prismaClient from './prisma-client';

export class PrismaApprovalRepository implements ApprovalRepository {
  async add(approval: Approval): Promise<Approval> {
    return await prismaClient.approval.create({
      data: {
        paper: {
          connect: {
            id: approval.paperId,
          },
        },
        type: approval.type,
      },
    });
  }

  async getById(id: string): Promise<Approval> {
    return await prismaClient.approval.findUnique({
      where: {
        id,
      },
    });
  }

  async list(): Promise<Approval[]> {
    return await prismaClient.approval.findMany();
  }

  async listByPaperId(paperId: string): Promise<Approval[]> {
    return await prismaClient.approval.findMany({
      where: {
        paperId,
      },
    });
  }

  async update(approval: Approval): Promise<void> {
    await prismaClient.approval.update({
      where: {
        id: approval.id,
      },
      data: {
        approval: approval?.approval,
        response: approval?.response,
      },
    });
  }
}
