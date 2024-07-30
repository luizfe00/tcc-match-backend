import { User } from '@/interfaces/user';
import { Interest } from '@/models/interest';

export interface InterestRepository {
  add(interest: Interest): Promise<Interest>;
  findById(id: string): Promise<Interest>;
  findAllByUserId(id: string): Promise<Interest[]>;
  findAllByThemeId(id: string): Promise<Interest[]>;
  findByThemeIdAndUser(themeId: string, user: User): Promise<Interest>;
  delete(id: string): Promise<void>;
}
