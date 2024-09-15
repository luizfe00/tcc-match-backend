import { PaperDueReminder } from '@/usecases/paper-due-reminder';
import { makePaperRepository } from '../repository/make-paper-repository';

export const makeSchedulerJob = () => {
  const paperRepository = makePaperRepository();
  const paperDueReminder = new PaperDueReminder(paperRepository);
  return paperDueReminder;
};
