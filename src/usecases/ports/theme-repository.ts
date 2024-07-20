import { SystemRole } from '@/constants/Roles';
import { Theme } from '@/models/theme';

export interface ThemeRepository {
  add(theme: Theme, role: SystemRole): Promise<Theme>;
  list(): Promise<Theme[]>;
  edit(id: string, theme: Partial<Theme>): Promise<void>;
  softDelete(id: string): Promise<void>;
  delete(id: string): Promise<void>;
  findBylabel(label: string): Promise<Theme[]>;
  findById(id: string): Promise<Theme | undefined>;
  findByUser(userId: string, role: SystemRole, label: string): Promise<Theme | undefined>;
  findAllByUser(userId: string, role: SystemRole): Promise<Theme[]>;
}
