import { StatusCodes } from '@/constants/SatusCode';
import { Controller, HttpRequest, HttpResponse } from '@/controllers/ports';
import { SendEmail } from '@/usecases/emailSender/send-email';

export class SendEmailController implements Controller {
  constructor(private readonly useCase: SendEmail) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { to, subject, text } = HttpRequest.body;
      await this.useCase.perform({ to, subject, text });
      return {
        body: undefined,
        statusCode: StatusCodes.OK,
      };
    } catch (error) {
      return {
        body: {
          message: error.message,
        },
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
