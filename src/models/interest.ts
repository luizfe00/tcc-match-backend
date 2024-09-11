import { Theme } from './theme';
import { User } from './user';

export interface Interest {
  id: string;
  text: string;
  themeId: string;
  ownerId: string;
  approved: boolean;
  theme?: Theme;
  owner?: User;
}

export interface CreateInterestPayload {
  id?: string;
  text: string;
  themeId: string;
  ownerId?: string;
}
