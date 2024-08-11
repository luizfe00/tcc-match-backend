import { Role } from '@prisma/client';
import jwt from 'jsonwebtoken';

import { UseCase } from './ports/use-case';
import { EurekaService } from '@/external/EurekaService';
import { BadRequestError } from './errors';
import { CreateUser } from '@/models/user';
import { UserSignIn } from '@/interfaces/user';
import { UserRepository } from './ports/user-repository';

type TokenizedResponse = { token: string } & UserSignIn;
type SignInResponse = Promise<TokenizedResponse>;

export class SignIn implements UseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async perform({ username, password }: { username: string; password: string }): SignInResponse {
    const eurekaService = new EurekaService();
    const { token } = await eurekaService.tokens(username, password);
    if (!token) throw new BadRequestError('Failed credentials');
    const profile = await eurekaService.profile(token);
    let role: Role = Role.TEACHER;
    if (profile.attributes.type === 'Aluno') {
      role = Role.STUDENT;
    }

    const userData: CreateUser = {
      email: profile.attributes.email,
      enrollment: profile.attributes.code,
      name: profile.name,
      role,
    };

    // const foundUser = await this.userRepository.getUserByEnrollment(userData.enrollment);
    const foundUser = await this.userRepository.getUserByEnrollment('00000002');
    if (foundUser) {
      const signInToken = jwt.sign(foundUser, 'secret');
      return { ...foundUser, token: signInToken };
    }

    const createdUser = await this.userRepository.add(userData);
    const tokenPayload: UserSignIn = {
      ...createdUser,
    };
    const signInToken = jwt.sign(tokenPayload, 'secret');
    return { ...createdUser, token: signInToken };
  }
}
