import { ApproveInterestController } from '@/controllers/create-approve-interest-controller';
import { Controller } from '@/controllers/ports';
import { makePTCCRepository } from '../repository/make-ptcc-repository';
import { ApproveInterest } from '@/usecases/approve-interest';
import { makeThemeRepository } from '../repository/make-theme-repository';
import { makeProfessorRepository } from '../repository/make-professor-repository';
import { makeStudentRepository } from '../repository/make-student-repository';

export const makeApproveInterestController = (): Controller => {
  const ptccRepository = makePTCCRepository();
  const themeRepository = makeThemeRepository();
  const professorRepository = makeProfessorRepository();
  const studentRepository = makeStudentRepository();
  const useCase = new ApproveInterest(
    ptccRepository,
    themeRepository,
    professorRepository,
    studentRepository
  );
  return new ApproveInterestController(useCase);
};
