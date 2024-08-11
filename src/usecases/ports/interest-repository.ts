import { InterestBI } from '@/interfaces/BI';
import { UserSignIn } from '@/interfaces/user';
import { CreateInterestPayload, Interest } from '@/models/interest';

export interface InterestRepository {
  add(interest: CreateInterestPayload): Promise<Interest>;
  approve(interestId: string): Promise<void>;
  findById(id: string): Promise<Interest>;
  findAllByUserId(id: string): Promise<Interest[]>;
  findAllByThemeId(id: string): Promise<Interest[]>;
  findByThemeIdAndUser(themeId: string, user: UserSignIn): Promise<Interest>;
  delete(id: string): Promise<void>;
  getBiData(): Promise<InterestBI>;
}
