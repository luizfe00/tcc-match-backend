import { CreateUser, User } from '@/models/user';

export interface UserRepository {
  add(user: CreateUser): Promise<User>;
  update(user: User): Promise<void>;
  listStudents(): Promise<User[]>;
  listProfessors(): Promise<User[]>;
  getUserById(id: string): Promise<User>;
  getUserByEnrollment(enrollment: string): Promise<User>;
  delete(id: string): Promise<void>;
}
