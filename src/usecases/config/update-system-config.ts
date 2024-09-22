import { SystemConfig } from '@/models/system-config';
import { SystemConfigRepository } from '../ports/system-config-repository';
import { UseCase } from '../ports/use-case';
import { UserSignIn } from '@/interfaces/user';
import { UserRepository } from '../ports/user-repository';
import { BadRequestError } from '../errors';

export class UpdateSystemConfig implements UseCase {
  constructor(private readonly systemConfigRepository: SystemConfigRepository) {}

  async perform(data: SystemConfig, user: UserSignIn): Promise<void> {
    if (user.role !== 'COORDINATOR') {
      throw new BadRequestError('User is not a coordinator');
    }
    const systemConfig = await this.systemConfigRepository.find();
    if (!systemConfig) {
      throw new Error('System config not found');
    }
    await this.systemConfigRepository.update(data);
  }
}
