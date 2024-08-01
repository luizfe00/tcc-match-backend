import { Interest } from './interest';
import { User } from './user';

export interface Theme {
  id?: string;
  label: string;
  summary: string;
  duration: number;
  ownerId: string;
  paper?: any;
  interests?: Interest[];
  owner?: User;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface ThemePayload {
  label: string;
  summary: string;
  duration: number;
  ownerId: string;
}
