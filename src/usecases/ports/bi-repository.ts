import { DashboardBI } from '@/interfaces/BI';
import { UserSignIn } from '@/interfaces/user';

export interface BIRepository {
  getDashboardData(startDate: Date, endDate: Date, user: UserSignIn): Promise<DashboardBI>;
}
