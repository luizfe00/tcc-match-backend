import { Role } from '@prisma/client';
import { Theme } from './theme';
import { Interest } from './interest';
import { Paper } from './paper';
import { Category } from './category';

export interface User {
  id: string;
  name: string;
  email: string;
  enrollment: string;
  role: Role;
  vacancies?: number;
  themes?: Theme[];
  interests?: Interest[];
  categories?: Category[];
  orienteePaper?: Paper;
}

export interface Student extends User {
  orienteePaper?: Paper;
}

export interface Professor extends User {
  papers?: Paper[];
}

export interface CreateUser extends Omit<User, 'id' | 'themes' | 'interests'> {}
