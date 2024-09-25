import { Role } from '@prisma/client';
import jwt from 'jsonwebtoken';

import { UseCase } from './ports/use-case';
import { BadRequestError } from './errors';
import { CreateUser, User } from '@/models/user';
import { UserSignIn } from '@/interfaces/user';
import { UserRepository } from './ports/user-repository';
import { EurecaService } from '@/external/EurecaService';

type TokenizedResponse = { token: string } & UserSignIn;
type SignInResponse = Promise<TokenizedResponse>;

interface EurecaProfile {
  attributes: {
    email: string;
    code: string;
    type: string;
  };
  name: string;
  id?: string;
}

export class SignIn implements UseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eurecaService: EurecaService,
    private readonly jwtSecret: string
  ) {}

  async perform({ username, password }: { username: string; password: string }): SignInResponse {
    const token = await this.authenticateWithEureka(username, password);
    const profile = await this.eurecaService.profile(token);

    const userData = this.createUserData(profile);
    const user = await this.findOrCreateUser(userData);
    return this.generateSignInResponse(user, token);
  }

  private async authenticateWithEureka(username: string, password: string): Promise<string> {
    const { token } = await this.eurecaService.tokens(username, password);
    if (!token) throw new BadRequestError('Failed credentials');
    return token;
  }

  private createUserData(profile: EurecaProfile): CreateUser {
    return {
      // email: profile.attributes.email,
      email: profile.name.replace(/ /g,'')+"@ccc.ufcg.edu.br",
      enrollment: profile.id,
      name: profile.name,
      role: this.getUserRole(profile),
    };
  }

  private getUserRole(profile: EurecaProfile): Role {
    if (profile.attributes.type === 'Aluno') return Role.STUDENT;
    if (profile.attributes.type === 'Professor') return Role.TEACHER;
    if (profile.attributes.type === 'Curso') return Role.COORDINATOR;
    throw new BadRequestError('Invalid user type');
  }

  private async findOrCreateUser(userData: CreateUser): Promise<User> {
    const foundUser = await this.userRepository.getUserByEnrollment(userData.enrollment);
    if (foundUser) return foundUser;
    return await this.userRepository.add(userData);
  }

  private generateSignInResponse(user: User, eurecaToken: string): TokenizedResponse {
    const singnInPayload: UserSignIn = {
      ...user,
      eurecaToken,
    };
    const signInToken = jwt.sign(singnInPayload, this.jwtSecret);
    return { ...user, token: signInToken };
  }
}
