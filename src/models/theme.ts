import { Category } from './category';
import { Interest } from './interest';
import { Paper } from './paper';
import { User } from './user';

export interface Theme {
  id?: string;
  label: string;
  summary: string;
  ownerId: string;
  startDate: Date;
  duration: number;
  paper?: Partial<Paper>;
  interests?: Interest[];
  categories?: Category[];
  owner?: Partial<User>;
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
}
