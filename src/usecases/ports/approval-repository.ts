import { Approval } from '@/models/approval';

export interface ApprovalRepository {
  add(approval: Approval): Promise<Approval>;
  getById(id: string): Promise<Approval>;
  list(): Promise<Approval[]>;
  listByPaperId(paperId: string): Promise<Approval[]>;
  listPending(): Promise<Approval[]>;
  update(approval: Approval): Promise<void>;
}
