import { PTCC } from '@/models/ptcc';

export interface PTCCRepository {
  add(ptcc: PTCC): Promise<PTCC>;
  update(ptcc: PTCC): Promise<void>;
  findById(id: string): Promise<PTCC>;
  findAllByProfessorId(id: string): Promise<PTCC[]>;
  findByThemeId(id: string): Promise<PTCC>;
  delete(id: string): Promise<void>;
  softDelete(id: string): Promise<void>;
}
