import { UserSignIn } from '@/interfaces/user';

export interface UseCase {
  perform(request?: any, user?: UserSignIn): Promise<any>;
}
