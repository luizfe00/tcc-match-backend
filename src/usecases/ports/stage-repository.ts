import { Stage, StagePayload } from '@/models/stage';

export interface StageRepostiory {
  add(stage: StagePayload): Promise<Stage>;
  listByPaper(paperId: string): Promise<Stage[]>;
}
