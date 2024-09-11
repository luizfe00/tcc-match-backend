import { Role } from '@prisma/client';
import jwt from 'jsonwebtoken';

import { UseCase } from './ports/use-case';
import { EurekaService } from '@/external/EurekaService';
import { BadRequestError } from './errors';
import { CreateUser, User } from '@/models/user';
import { UserSignIn } from '@/interfaces/user';
import { UserRepository } from './ports/user-repository';

type TokenizedResponse = { token: string } & UserSignIn;
type SignInResponse = Promise<TokenizedResponse>;

export class SignIn implements UseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eurekaService: EurekaService,
    private readonly jwtSecret: string
  ) {}

  async perform({ username, password }: { username: string; password: string }): SignInResponse {
    const token = await this.authenticateWithEureka(username, password);
    const profile = await this.eurekaService.profile(token);
    const userData = this.createUserData(profile);
    const user = await this.findOrCreateUser(userData);
    return this.generateSignInResponse(user);
  }

  private async authenticateWithEureka(username: string, password: string): Promise<string> {
    const { token } = await this.eurekaService.tokens(username, password);
    if (!token) throw new BadRequestError('Failed credentials');
    return token;
  }

  private createUserData(profile: any): CreateUser {
    return {
      email: profile.attributes.email,
      enrollment: profile.attributes.code,
      name: profile.name,
      role: profile.attributes.type === 'Aluno' ? Role.STUDENT : Role.TEACHER,
    };
  }

  private async findOrCreateUser(userData: CreateUser): Promise<User> {
    const foundUser = await this.userRepository.getUserByEnrollment(userData.enrollment);
    if (foundUser) return foundUser;
    return await this.userRepository.add(userData);
  }

  private generateSignInResponse(user: User): TokenizedResponse {
    const signInToken = jwt.sign(user, this.jwtSecret);
    return { ...user, token: signInToken };
  }
}
