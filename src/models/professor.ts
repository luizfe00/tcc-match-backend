import { Role } from '@prisma/client';

export interface Professor {
  id?: string;
  name: string;
  email: string;
  enrollment: string;
  classes: string;
  vacancies: number;
  role: Role;
}
