import { Student } from '@/models/student';
import { StudentRepository } from './ports/student-repository';
import { UseCase } from './ports/use-case';
import { ExistingEntityError } from './errors';

export class CreateStudent implements UseCase {
  constructor(private readonly studentRepository: StudentRepository) {}

  async perform(student: Student): Promise<Student> {
    const existingStudent = await this.studentRepository.findByEnrollment(student.enrollment);
    if (existingStudent)
      throw new ExistingEntityError('Student', 'enrollment number', student.enrollment);

    return await this.studentRepository.add(student);
  }
}
