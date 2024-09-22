import { EurecaService } from '@/external/EurecaService';
import { UseCase } from '../ports/use-case';
import { UserRepository } from '../ports/user-repository';
import { UserSignIn } from '@/interfaces/user';
import { BadRequestError, NotFoundError } from '../errors';
import { Role } from '@prisma/client';

export class GetSubjects implements UseCase {
  constructor(
    private readonly eurecaService: EurecaService,
    private readonly userRepository: UserRepository
  ) {}

  async perform(academicUnitCode: string, user?: UserSignIn): Promise<any> {
    const userEntity = await this.userRepository.getUserById(user.id);
    if (!userEntity) throw new NotFoundError('User', user.id);

    if (userEntity.role !== Role.COORDINATOR)
      throw new BadRequestError('User not allowed to access this resource');

    const teachers = await this.eurecaService.getSubjects(academicUnitCode, user.eurecaToken);
    return teachers;
  }
}
