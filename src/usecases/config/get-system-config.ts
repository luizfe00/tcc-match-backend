import { UserSignIn } from '@/interfaces/user';
import { SystemConfigRepository } from '../ports/system-config-repository';
import { UseCase } from '../ports/use-case';
import { SystemConfig } from '@/models/system-config';
import { BadRequestError } from '../errors';

export class GetSystemConfig implements UseCase {
  constructor(private readonly systemConfigRepository: SystemConfigRepository) {}

  async perform(user: UserSignIn): Promise<SystemConfig> {
    if (user.role !== 'COORDINATOR') {
      throw new BadRequestError('User is not a coordinator');
    }
    const systemConfig = await this.systemConfigRepository.find();
    if (!systemConfig) {
      throw new Error('System config not found');
    }
    return systemConfig;
  }
}
