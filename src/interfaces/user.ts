import { SystemRole } from '@/constants/Roles';

export interface User {
  id: string;
  name: string;
  email: string;
  enrollment: string;
  role?: SystemRole;
}
