import { Student } from '@/models/student';
import { StudentRepository } from './ports/student-repository';
import { UseCase } from './ports/use-case';

export class CreateStudent implements UseCase {
  constructor(private readonly studentRepository: StudentRepository) {}

  async perform(student: Student): Promise<Student> {
    const existingStudent = await this.studentRepository.findByEnrollment(student.enrollment);
    if (existingStudent) return existingStudent;

    return await this.studentRepository.add(student);
  }
}
