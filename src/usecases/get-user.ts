import { UserSignIn } from '@/interfaces/user';
import { UseCase } from './ports/use-case';
import { decode } from 'jsonwebtoken';

export class GetUser implements UseCase {
  async perform(token: string): Promise<UserSignIn> {
    console.log(decode(token));
    return decode(token) as UserSignIn;
  }
}
