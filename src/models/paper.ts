import { PaperType } from '@prisma/client';
import { User } from './user';
import { Theme } from './theme';
import { Approval } from './approval';

export interface Paper {
  id?: string;
  documentUrl?: string;
  type: PaperType;
  studentId?: string;
  professorId?: string;
  orientee?: User;
  advisor?: User;
  theme?: Theme;
  approvals?: Approval[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface PaperPayload {
  documentUrl?: string;
  approved: boolean;
  studentId: string;
  themeId: string;
  professorId: string;
  interestId: string;
}

export interface EditPaperPayload {
  id?: string;
  documentUrl?: string;
}
