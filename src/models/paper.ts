import { PaperType } from '@prisma/client';
import { User } from './user';
import { Theme } from './theme';

export interface Paper {
  id?: string;
  documentUrl?: string;
  approved: boolean;
  type: PaperType;
  orientee?: User;
  advisor?: User;
  theme?: Theme;
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
