import { PaperPerMonthQuery } from '@/interfaces/BI';
import { Paper, PaperPayload } from '@/models/paper';

export interface PaperRepository {
  add(paper: PaperPayload): Promise<Paper>;
  update(paper: Partial<Paper>): Promise<void>;
  listByUser(userId: string): Promise<Paper[]>;
  delete(id: string): Promise<void>;
  findByThemeId(id: string): Promise<Paper>;
  findById(id: string): Promise<Paper>;
}
