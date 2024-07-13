import { Student } from '@/models/student';

export interface StudentRepository {
  add(student: Student): Promise<Student>;
  findByEmail(email: string): Promise<Student | undefined>;
  list(): Promise<Student[]>;
  findById(id: string): Promise<Student | undefined>;
  findByEnrollment(enrollment: string): Promise<Student | undefined>;
}
