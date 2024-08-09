import { Paper } from './paper';

export interface Stage {
  id: string;
  label: string;
  viewed: boolean;
  feedback?: string;
  paperId?: string;
  paper?: Paper;
  createdAt: Date;
  updatedAt: Date;
}

export interface StagePayload {
  id?: string;
  label: string;
  viewed?: boolean;
  feedback?: string;
  paperId?: string;
}

export interface UpdateStagePayload {
  id: string;
  label?: string;
  viewed?: boolean;
  feedback?: string;
}
