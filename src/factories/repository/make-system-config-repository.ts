import { PrismaSystemConfigRepository } from '@/repository/prisma-system-config-repository';
import { SystemConfigRepository } from '@/usecases/ports/system-config-repository';

export const makeSystemConfigRepository = (): SystemConfigRepository => {
  return new PrismaSystemConfigRepository();
};
