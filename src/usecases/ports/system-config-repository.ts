import { SystemConfig } from '@/models/system-config';

export interface SystemConfigRepository {
  update(data: SystemConfig): Promise<void>;
  find(): Promise<SystemConfig | null>;
}
