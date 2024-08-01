import { Role } from '@prisma/client';

export interface UserSignIn {
  id: string;
  name: string;
  email: string;
  enrollment: string;
  role: Role;
}
