import { ThemeBI } from '@/interfaces/BI';
import { Theme, ThemePayload } from '@/models/theme';
import { Role } from '@prisma/client';

export interface ThemeRepository {
  add(theme: ThemePayload): Promise<Theme>;
  edit(id: string, theme: Partial<Theme>): Promise<void>;
  softDelete(id: string): Promise<void>;
  delete(id: string): Promise<void>;

  findBylabel(label: string): Promise<Theme[]>;
  findById(id: string): Promise<Theme | undefined>;
  findByUser(userId: string, label: string): Promise<Theme | undefined>;
  findAllByUser(userId: string): Promise<Theme[]>;

  list(): Promise<Theme[]>;
  listAllStudents(): Promise<Theme[]>;
  listAllProfessors(): Promise<Theme[]>;
  listDeletedByUserId(id: string): Promise<Theme[]>;

  getThemeCount(): Promise<ThemeBI>;
}
