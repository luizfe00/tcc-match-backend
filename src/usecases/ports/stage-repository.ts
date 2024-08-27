import { StageBI } from '@/interfaces/BI';
import { Stage, StagePayload, UpdateStagePayload } from '@/models/stage';

export interface StageRepostiory {
  add(stage: StagePayload): Promise<Stage>;
  listByPaper(paperId: string): Promise<Stage[]>;
  listPending(userId: string): Promise<Stage[]>;
  update(stage: UpdateStagePayload): Promise<void>;
  findById(id: string): Promise<Stage>;
  delete(id: string): Promise<void>;
}
