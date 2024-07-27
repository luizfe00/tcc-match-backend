import { Role } from '@prisma/client';

export interface Professor {
  id?: string;
  name: string;
  email: string;
  enrollment: string;
  vacancies: number;
  role: Role;
}
