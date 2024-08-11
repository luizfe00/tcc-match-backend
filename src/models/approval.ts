import { PaperType } from '@prisma/client';
import { Paper } from './paper';

export interface Approval {
  id?: string;
  createdAt?: Date;
  response?: string;
  approval?: boolean;
  paperId?: string;
  paper?: Paper;
  type?: PaperType;
}
