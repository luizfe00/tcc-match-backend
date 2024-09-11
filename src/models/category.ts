import { Theme } from './theme';
import { User } from './user';

export interface Category {
  id?: string;
  name: string;
  description: string;
  users?: User[];
  themes?: Theme[];
}
