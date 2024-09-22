import { SystemConfig } from '@/models/system-config';
import { SystemConfigRepository } from '@/usecases/ports/system-config-repository';
import prismaClient from './prisma-client';

export class PrismaSystemConfigRepository implements SystemConfigRepository {
  async update(data: SystemConfig): Promise<void> {
    const updateData: Partial<SystemConfig> = {};

    if (data.activeProfessors !== null) updateData.activeProfessors = data.activeProfessors;
    if (data.preRequisites !== null) updateData.preRequisites = data.preRequisites;
    if (data.minCredits !== null) updateData.minCredits = data.minCredits;
    if (data.minPeriods !== null) updateData.minPeriods = data.minPeriods;
    if (data.reminderTemplate !== null) updateData.reminderTemplate = data.reminderTemplate;
    if (data.reminderDaysBefore !== null) updateData.reminderDaysBefore = data.reminderDaysBefore;

    await prismaClient.systemConfiguration.update({
      where: {
        id: 1,
      },
      data: updateData,
    });
  }

  async find(): Promise<SystemConfig | null> {
    const systemConfig = await prismaClient.systemConfiguration.findUnique({
      where: {
        id: 1,
      },
    });
    return systemConfig;
  }
}
