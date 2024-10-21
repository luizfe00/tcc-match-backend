import { UserSignIn } from '@/interfaces/user';
import { CreateInterestPayload, Interest } from '@/models/interest';
import { Paper, PaperPayload } from '@/models/paper';
import { User } from '@/models/user';

export interface InterestRepository {
  add(interest: CreateInterestPayload): Promise<Interest>;
  approve(ptcc: PaperPayload, user?: User): Promise<Paper>;
  findById(id: string): Promise<Interest>;
  findAllByUserId(id: string): Promise<Interest[]>;
  findAllByThemeId(id: string): Promise<Interest[]>;
  findByThemeIdAndUser(themeId: string, user: UserSignIn): Promise<Interest>;
  delete(id: string): Promise<void>;
  deleteAllByUserId(id: string): Promise<void>;
  deleteAllByThemeId(id: string): Promise<void>;
}
