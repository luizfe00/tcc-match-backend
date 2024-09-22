import { UseCase } from '../ports/use-case';
import { UserSignIn } from '@/interfaces/user';
import { GetTeacherResponse } from '@/interfaces/eureka-responses';
import { UserRepository } from '../ports/user-repository';
import { BadRequestError, NotFoundError } from '../errors';
import { Role } from '@prisma/client';
import { EurecaService } from '@/external/EurecaService';

export class GetTeachers implements UseCase {
  constructor(
    private readonly eurecaService: EurecaService,
    private readonly userRepository: UserRepository
  ) {}

  async perform(academicUnitCode: string, user: UserSignIn): Promise<GetTeacherResponse[]> {
    const userEntity = await this.userRepository.getUserById(user.id);
    if (!userEntity) throw new NotFoundError('User', user.id);

    if (userEntity.role !== Role.COORDINATOR)
      throw new BadRequestError('User not allowed to access this resource');

    const teachers = await this.eurecaService.getTeachers(academicUnitCode, user.eurecaToken);
    return teachers;
  }
}
