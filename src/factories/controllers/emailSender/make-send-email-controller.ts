import { SendEmailController } from '@/controllers/emailSender/send-email-controller';
import { Controller } from '@/controllers/ports';
import { SendEmail } from '@/usecases/emailSender/send-email';

export const makeSendEmailController = (): Controller => {
  const useCase = new SendEmail();
  return new SendEmailController(useCase);
};
