export interface PTCC {
  id?: string;
  documentUrl: string;
  approved?: boolean;
  studentId: string;
  professorId: string;
  themeId: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
