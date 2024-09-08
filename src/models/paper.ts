import { PaperStatus, PaperType } from '@prisma/client';
import { User } from './user';
import { Theme } from './theme';
import { Approval } from './approval';

export interface Paper {
  id?: string;
  documentUrl?: string;
  type: PaperType;
  status: PaperStatus;
  studentId?: string;
  professorId?: string;
  orientee?: Partial<User>;
  advisor?: Partial<User>;
  theme?: Partial<Theme>;
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
