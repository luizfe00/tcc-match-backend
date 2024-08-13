import { Paper } from '@/models/paper';
import { Role } from '@prisma/client';

export interface UserSignIn {
  id: string;
  name: string;
  email: string;
  enrollment: string;
  orienteePaper?: Paper;
  role: Role;
}
