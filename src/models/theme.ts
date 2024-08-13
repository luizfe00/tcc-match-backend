import { Interest } from './interest';
import { Paper } from './paper';
import { User } from './user';

export interface Theme {
  id?: string;
  label: string;
  summary: string;
  ownerId: string;
  startDate: Date;
  endDate: Date;
  paper?: Paper;
  interests?: Interest[];
  owner?: User;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ThemePayload {
  label: string;
  summary: string;
  duration: number;
  ownerId: string;
  startDate: Date;
  endDate: Date;
}
