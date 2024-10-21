import { PaperStatus, PaperType } from '@prisma/client';
import { User } from './user';
import { Theme } from './theme';
import { Approval } from './approval';

export interface Paper {
  id?: string;
  ptccDocumentUrl?: string;
  tccDocumentUrl?: string;
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
  approved: boolean;
  studentId: string;
  themeId: string;
  professorId: string;
  interestId: string;
  ptccDocumentUrl?: string;
  tccDocumentUrl?: string;
}

export interface EditPaperPayload {
  id?: string;
  ptccDocumentUrl?: string;
  tccDocumentUrl?: string;
}
